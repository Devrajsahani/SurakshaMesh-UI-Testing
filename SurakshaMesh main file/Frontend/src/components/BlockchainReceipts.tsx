"use client";

import { motion } from 'framer-motion';
import { Shield, Check, ExternalLink, Lock } from 'lucide-react';

interface BlockchainReceipt {
  id: string;
  timestamp: string;
  eventType: string;
  worker: string;
  hash: string;
  block: number;
  status: 'verified' | 'pending';
}

const receipts: BlockchainReceipt[] = [
  {
    id: 'TX-001',
    timestamp: '2024-01-15 14:32:18',
    eventType: 'Safety Alert Triggered',
    worker: 'WRK-3456 (Priya Sharma)',
    hash: '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385',
    block: 18432891,
    status: 'verified',
  },
  {
    id: 'TX-002',
    timestamp: '2024-01-15 14:28:45',
    eventType: 'PPE Violation Detected',
    worker: 'WRK-2847 (Rajesh Kumar)',
    hash: '0x9c5c8e3d8f7b6a5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f3a2b1c',
    block: 18432876,
    status: 'verified',
  },
  {
    id: 'TX-003',
    timestamp: '2024-01-15 14:25:12',
    eventType: 'Zone Entry Logged',
    worker: 'WRK-5621 (Vikram Reddy)',
    hash: '0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b',
    block: 18432854,
    status: 'verified',
  },
  {
    id: 'TX-004',
    timestamp: '2024-01-15 14:22:33',
    eventType: 'Health Metric Anomaly',
    worker: 'WRK-2847 (Rajesh Kumar)',
    hash: '0x3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c',
    block: 18432839,
    status: 'verified',
  },
  {
    id: 'TX-005',
    timestamp: '2024-01-15 14:18:56',
    eventType: 'Safety Checkpoint',
    worker: 'WRK-1923 (Amit Singh)',
    hash: '0x5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e',
    block: 18432821,
    status: 'verified',
  },
  {
    id: 'TX-006',
    timestamp: '2024-01-15 14:32:22',
    eventType: 'SOS Alert',
    worker: 'WRK-3456 (Priya Sharma)',
    hash: '0x7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f',
    block: 18432892,
    status: 'pending',
  },
];

export default function BlockchainReceipts() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Shield className="w-6 h-6 text-blue-500" />
          <h2 className="text-2xl font-bold">Blockchain Audit Trail</h2>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Lock className="w-5 h-5 text-emerald-400" />
          <span className="text-slate-400">Immutable Records</span>
        </div>
      </div>

      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl overflow-hidden">
        <div className="p-4 border-b border-slate-700 bg-slate-800/30">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-400">
              All safety events are cryptographically signed and stored on the blockchain
            </p>
            <div className="flex items-center gap-2 text-emerald-400">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-sm font-mono">Chain Active</span>
            </div>
          </div>
        </div>

        <div className="divide-y divide-slate-700">
          {receipts.map((receipt, index) => (
            <motion.div
              key={receipt.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-6 hover:bg-slate-700/30 transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-lg">{receipt.eventType}</h3>
                    {receipt.status === 'verified' ? (
                      <div className="flex items-center gap-1 px-2 py-1 bg-emerald-500/20 border border-emerald-500/50 rounded-full text-emerald-400 text-xs">
                        <Check className="w-3 h-3" />
                        <span>Verified</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 px-2 py-1 bg-amber-500/20 border border-amber-500/50 rounded-full text-amber-400 text-xs animate-pulse">
                        <div className="w-2 h-2 bg-amber-500 rounded-full" />
                        <span>Pending</span>
                      </div>
                    )}
                  </div>

                  <div className="grid md:grid-cols-2 gap-3 text-sm mb-3">
                    <div>
                      <p className="text-slate-400">Worker</p>
                      <p className="font-mono text-white">{receipt.worker}</p>
                    </div>
                    <div>
                      <p className="text-slate-400">Timestamp</p>
                      <p className="font-mono text-white">{receipt.timestamp}</p>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div>
                      <p className="text-slate-400 mb-1">Transaction Hash</p>
                      <div className="flex items-center gap-2 bg-slate-900/50 rounded-lg p-2 border border-slate-700">
                        <code className="flex-1 text-blue-400 text-xs break-all font-mono">
                          {receipt.hash}
                        </code>
                        <button className="text-blue-400 hover:text-blue-300 transition-colors flex-shrink-0">
                          <ExternalLink className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <p className="text-slate-400">Block:</p>
                      <p className="font-mono text-blue-400">#{receipt.block}</p>
                    </div>
                  </div>
                </div>

                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-500/20 border-2 border-blue-500 rounded-lg flex items-center justify-center">
                    <Shield className="w-6 h-6 text-blue-500" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
