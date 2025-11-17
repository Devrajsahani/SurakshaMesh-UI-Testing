"use client";

import { motion } from 'framer-motion';
import { Camera, AlertTriangle, Eye } from 'lucide-react';

interface CCTVFeed {
  id: string;
  name: string;
  location: string;
  alert: string | null;
  image: string;
}

const cctvFeeds: CCTVFeed[] = [
  {
    id: 'CAM-01',
    name: 'Zone A - Entry',
    location: 'Main Gate',
    alert: null,
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&h=400&fit=crop',
  },
  {
    id: 'CAM-02',
    name: 'Zone B - Assembly',
    location: 'Floor 3',
    alert: 'No Helmet Detected',
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&h=400&fit=crop',
  },
  {
    id: 'CAM-03',
    name: 'Zone C - Storage',
    location: 'Warehouse',
    alert: null,
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop',
  },
  {
    id: 'CAM-04',
    name: 'Zone D - Heavy Machinery',
    location: 'Floor 4',
    alert: 'Restricted Zone Entry',
    image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600&h=400&fit=crop',
  },
];

export default function CCTVGrid() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Camera className="w-6 h-6 text-blue-500" />
          <h2 className="text-2xl font-bold">CCTV Surveillance</h2>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Eye className="w-5 h-5 text-teal-400" />
          <span className="text-slate-400">YOLO v8 Detection Active</span>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {cctvFeeds.map((feed, index) => (
          <motion.div
            key={feed.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="relative group"
          >
            <motion.div
              className={`relative bg-slate-800/50 backdrop-blur-sm border-2 rounded-2xl overflow-hidden ${
                feed.alert ? 'border-red-500' : 'border-slate-700'
              }`}
              animate={{
                borderColor: feed.alert ? ['#ef4444', '#dc2626', '#ef4444'] : '#334155',
              }}
              transition={{
                duration: 2,
                repeat: feed.alert ? Infinity : 0,
                ease: 'easeInOut',
              }}
            >
              {/* Alert pulse effect */}
              {feed.alert && (
                <motion.div
                  className="absolute inset-0 border-4 border-red-500 rounded-2xl pointer-events-none z-10"
                  animate={{
                    opacity: [0, 0.5, 0],
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeOut',
                  }}
                />
              )}

              {/* Camera feed */}
              <div className="relative aspect-video">
                <img
                  src={feed.image}
                  alt={feed.name}
                  className="w-full h-full object-cover"
                />
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />

                {/* Live indicator */}
                <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/70 backdrop-blur-sm px-3 py-1.5 rounded-lg">
                  <motion.div
                    className="w-2 h-2 bg-red-500 rounded-full"
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  <span className="text-white text-sm font-semibold">LIVE</span>
                </div>

                {/* Alert badge */}
                {feed.alert && (
                  <motion.div
                    className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-lg"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                  >
                    <AlertTriangle className="w-5 h-5 animate-pulse" />
                    <span className="font-semibold">{feed.alert}</span>
                  </motion.div>
                )}

                {/* Camera info */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-black/70 backdrop-blur-sm rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white font-semibold">{feed.name}</p>
                        <p className="text-slate-300 text-sm font-mono">{feed.id} • {feed.location}</p>
                      </div>
                      <Camera className="w-5 h-5 text-blue-500" />
                    </div>
                  </div>
                </div>

                {/* AI detection overlay */}
                <div className="absolute inset-0 pointer-events-none">
                  {feed.alert && (
                    <>
                      <motion.div
                        className="absolute w-32 h-32 border-2 border-red-500"
                        style={{ top: '30%', left: '40%' }}
                        animate={{
                          opacity: [0.8, 0.5, 0.8],
                        }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                        }}
                      >
                        <div className="absolute -top-6 left-0 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                          VIOLATION
                        </div>
                      </motion.div>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
