"use client";

import { useEffect, useState } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';

interface Node {
  id: string;
  label: string;
  position: { top: string; left: string };
}

const nodes: Node[] = [
  { id: 'workerA', label: 'Worker A (SOS)', position: { top: '70%', left: '15%' } },
  { id: 'workerB', label: 'Worker B', position: { top: '40%', left: '45%' } },
  { id: 'workerC', label: 'Worker C', position: { top: '20%', left: '75%' } },
  { id: 'gateway', label: 'Gateway', position: { top: '10%', left: '90%' } },
];

export default function LoRaMeshAnimation() {
  const [showPopup, setShowPopup] = useState(false);
  const [line1Visible, setLine1Visible] = useState(false);
  const [line2Visible, setLine2Visible] = useState(false);
  const [line3Visible, setLine3Visible] = useState(false);
  
  const line1Controls = useAnimation();
  const line2Controls = useAnimation();
  const line3Controls = useAnimation();

  // Calculate path coordinates - nodes are positioned as percentages of the 800x500 container
  // Account for padding (p-8 = 32px on each side, so inner area is 736x436)
  const getNodeCenter = (node: Node) => {
    const containerWidth = 800;
    const containerHeight = 500;
    const padding = 32; // p-8 = 32px
    
    const innerWidth = containerWidth - (padding * 2); // 736px
    const innerHeight = containerHeight - (padding * 2); // 436px
    
    const x = padding + (parseFloat(node.position.left) / 100) * innerWidth;
    const y = padding + (parseFloat(node.position.top) / 100) * innerHeight;
    
    return { x, y };
  };

  const node1Center = getNodeCenter(nodes[0]);
  const node2Center = getNodeCenter(nodes[1]);
  const node3Center = getNodeCenter(nodes[2]);
  const node4Center = getNodeCenter(nodes[3]);

  // Calculate path lengths
  const getPathLength = (fromX: number, fromY: number, toX: number, toY: number) => {
    return Math.sqrt(Math.pow(toX - fromX, 2) + Math.pow(toY - fromY, 2));
  };

  const path1Length = getPathLength(node1Center.x, node1Center.y, node2Center.x, node2Center.y);
  const path2Length = getPathLength(node2Center.x, node2Center.y, node3Center.x, node3Center.y);
  const path3Length = getPathLength(node3Center.x, node3Center.y, node4Center.x, node4Center.y);

  useEffect(() => {
    let isCancelled = false;

    const runAnimation = async () => {
      while (!isCancelled) {
        // Reset all states
        setLine1Visible(false);
        setLine2Visible(false);
        setLine3Visible(false);
        setShowPopup(false);

        // Reset animations - set strokeDashoffset to full length (hidden)
        await Promise.all([
          line1Controls.set({ strokeDashoffset: path1Length, opacity: 0 }),
          line2Controls.set({ strokeDashoffset: path2Length, opacity: 0 }),
          line3Controls.set({ strokeDashoffset: path3Length, opacity: 0 }),
        ]);

        if (isCancelled) break;

        // Wait 1 second before starting
        await new Promise((resolve) => setTimeout(resolve, 1000));

        if (isCancelled) break;

        // Step 1: Animate line from Node 1 to Node 2
        setLine1Visible(true);
        await line1Controls.start({
          strokeDashoffset: 0,
          opacity: 1,
          transition: { duration: 1.0, ease: 'easeInOut' },
        });

        if (isCancelled) break;

        // Step 2: Animate line from Node 2 to Node 3
        setLine2Visible(true);
        await line2Controls.start({
          strokeDashoffset: 0,
          opacity: 1,
          transition: { duration: 1.0, ease: 'easeInOut' },
        });

        if (isCancelled) break;

        // Step 3: Animate line from Node 3 to Node 4 (Gateway)
        setLine3Visible(true);
        await line3Controls.start({
          strokeDashoffset: 0,
          opacity: 1,
          transition: { duration: 1.0, ease: 'easeInOut' },
        });

        if (isCancelled) break;

        // Show popup
        setShowPopup(true);

        // Wait 2.5 seconds for popup
        await new Promise((resolve) => setTimeout(resolve, 2500));

        if (isCancelled) break;

        // Fade out popup
        setShowPopup(false);

        // Fade out lines
        await Promise.all([
          line1Controls.start({
            opacity: 0,
            transition: { duration: 0.5 },
          }),
          line2Controls.start({
            opacity: 0,
            transition: { duration: 0.5 },
          }),
          line3Controls.start({
            opacity: 0,
            transition: { duration: 0.5 },
          }),
        ]);

        if (isCancelled) break;

        // Wait 1 second before restarting
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    };

    runAnimation();

    // Cleanup function
    return () => {
      isCancelled = true;
    };
  }, [line1Controls, line2Controls, line3Controls, path1Length, path2Length, path3Length]);

  return (
    <div 
      className="relative bg-gray-900 border border-gray-700 rounded-lg p-8"
      style={{ width: '800px', height: '500px' }}
    >
      {/* Horizontal Line (Top to Bottom) - Visual Grid Divider */}
      <div className="absolute top-0 bottom-0 left-1/2 w-px bg-gray-700 opacity-50 z-0 transform -translate-x-1/2"></div>
      
      {/* Vertical Line (Left to Right) - Visual Grid Divider */}
      <div className="absolute left-0 right-0 top-1/2 h-px bg-gray-700 opacity-50 z-0 transform -translate-y-1/2"></div>

      {/* SVG container for animated lines - covers entire map */}
      <svg
        className="absolute top-0 left-0 w-full h-full pointer-events-none z-10"
        style={{ width: '100%', height: '100%' }}
      >
        {/* Line 1: Node 1 (Worker A) to Node 2 (Worker B) */}
        {line1Visible && (
          <motion.path
            d={`M ${node1Center.x} ${node1Center.y} L ${node2Center.x} ${node2Center.y}`}
            stroke="#22d3ee"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={path1Length}
            style={{
              filter: 'drop-shadow(0 0 6px #22d3ee)',
            }}
            initial={{ strokeDashoffset: path1Length, opacity: 0 }}
            animate={line1Controls}
          />
        )}

        {/* Line 2: Node 2 (Worker B) to Node 3 (Worker C) */}
        {line2Visible && (
          <motion.path
            d={`M ${node2Center.x} ${node2Center.y} L ${node3Center.x} ${node3Center.y}`}
            stroke="#22d3ee"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={path2Length}
            style={{
              filter: 'drop-shadow(0 0 6px #22d3ee)',
            }}
            initial={{ strokeDashoffset: path2Length, opacity: 0 }}
            animate={line2Controls}
          />
        )}

        {/* Line 3: Node 3 (Worker C) to Node 4 (Gateway) */}
        {line3Visible && (
          <motion.path
            d={`M ${node3Center.x} ${node3Center.y} L ${node4Center.x} ${node4Center.y}`}
            stroke="#22d3ee"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={path3Length}
            style={{
              filter: 'drop-shadow(0 0 6px #22d3ee)',
            }}
            initial={{ strokeDashoffset: path3Length, opacity: 0 }}
            animate={line3Controls}
          />
        )}
      </svg>

      {/* Node 1: Worker A (SOS) */}
      <div
        className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20"
        style={{
          top: nodes[0].position.top,
          left: nodes[0].position.left,
        }}
      >
        <div
          className="w-12 h-12 rounded-full bg-cyan-800 flex items-center justify-center text-gray-200 text-xs font-bold shadow-lg"
          style={{
            boxShadow: '0 0 20px rgba(34, 211, 238, 0.8), 0 0 40px rgba(34, 211, 238, 0.5), 0 0 60px rgba(34, 211, 238, 0.3)',
          }}
        >
          <div className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse" />
        </div>
        <div className="mt-2 text-center">
          <span className="text-xs font-mono text-cyan-400 whitespace-nowrap">{nodes[0].label}</span>
        </div>
      </div>

      {/* Node 2: Worker B (Relay 1) */}
      <div
        className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20"
        style={{
          top: nodes[1].position.top,
          left: nodes[1].position.left,
        }}
      >
        <div
          className="w-12 h-12 rounded-full bg-cyan-800 flex items-center justify-center text-gray-200 text-xs font-bold shadow-lg"
          style={{
            boxShadow: '0 0 20px rgba(34, 211, 238, 0.8), 0 0 40px rgba(34, 211, 238, 0.5), 0 0 60px rgba(34, 211, 238, 0.3)',
          }}
        >
          <div className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse" />
        </div>
        <div className="mt-2 text-center">
          <span className="text-xs font-mono text-cyan-400 whitespace-nowrap">{nodes[1].label}</span>
        </div>
      </div>

      {/* Node 3: Worker C (Relay 2) */}
      <div
        className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20"
        style={{
          top: nodes[2].position.top,
          left: nodes[2].position.left,
        }}
      >
        <div
          className="w-12 h-12 rounded-full bg-cyan-800 flex items-center justify-center text-gray-200 text-xs font-bold shadow-lg"
          style={{
            boxShadow: '0 0 20px rgba(34, 211, 238, 0.8), 0 0 40px rgba(34, 211, 238, 0.5), 0 0 60px rgba(34, 211, 238, 0.3)',
          }}
        >
          <div className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse" />
        </div>
        <div className="mt-2 text-center">
          <span className="text-xs font-mono text-cyan-400 whitespace-nowrap">{nodes[2].label}</span>
        </div>
      </div>

      {/* Node 4: Gateway (Destination) */}
      <div
        className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20"
        style={{
          top: nodes[3].position.top,
          left: nodes[3].position.left,
        }}
      >
        <div
          className="w-12 h-12 rounded-full bg-cyan-800 flex items-center justify-center text-gray-200 text-xs font-bold shadow-lg"
          style={{
            boxShadow: '0 0 20px rgba(34, 211, 238, 0.8), 0 0 40px rgba(34, 211, 238, 0.5), 0 0 60px rgba(34, 211, 238, 0.3)',
          }}
        >
          <div className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse" />
        </div>
        <div className="mt-2 text-center">
          <span className="text-xs font-mono text-cyan-400 whitespace-nowrap">{nodes[3].label}</span>
        </div>
      </div>

      {/* Popup */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            <div className="bg-green-500 text-white p-4 rounded-lg shadow-2xl border-2 border-green-400">
              <p className="text-lg font-bold font-mono">SOS DELIVERED</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
