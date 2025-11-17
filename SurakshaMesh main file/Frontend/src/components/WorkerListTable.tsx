"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, MapPin, Heart, AlertCircle, Shield, TrendingUp } from 'lucide-react';
import { fetchFromApi } from '@/lib/api';

// This interface should match the data structure from your backend's Worker model
interface Worker {
  _id: string;
  name: string;
  role: string;
  // These fields are not in the base worker model from the API, so we make them optional
  // or derive them. For now, we'll use mock data for them.
  location?: string;
  heartRate?: number;
  status?: 'safe' | 'warning' | 'critical';
  lastUpdate?: string;
}

interface WorkersApiResponse {
  count: number;
  workers: Worker[];
}

const statusConfig = {
  safe: {
    bg: 'bg-green-500/10',
    border: 'border-green-500/50',
    text: 'text-green-400',
    dot: 'bg-green-500',
    label: 'SAFE',
  },
  warning: {
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/50',
    text: 'text-amber-400',
    dot: 'bg-amber-500',
    label: 'WARNING',
  },
  critical: {
    bg: 'bg-red-500/10',
    border: 'border-red-500/50',
    text: 'text-red-400',
    dot: 'bg-red-500',
    label: 'CRITICAL',
  },
};

export default function WorkerListTable() {
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getWorkers = async () => {
      try {
        setLoading(true);
        const data = await fetchFromApi<WorkersApiResponse>('/dashboard/workers');
        // NOTE: The API only returns _id, name, role. We add placeholder data for the UI.
        // In a real app, this data would come from another API call or a WebSocket.
        const workersWithMockStatus = data.workers.map(w => ({
          ...w,
          location: 'Zone-A',
          heartRate: 70 + Math.floor(Math.random() * 20),
          status: (['safe', 'warning', 'critical'] as const)[Math.floor(Math.random() * 3)],
          lastUpdate: `${Math.floor(Math.random() * 5) + 1}m ago`,
        }));
        setWorkers(workersWithMockStatus);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch workers');
      } finally {
        setLoading(false);
      }
    };
    getWorkers();
  }, []);

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl overflow-hidden">
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <User className="w-6 h-6 text-blue-500" />
            <h2 className="text-2xl font-bold">Live Worker Status</h2>
          </div>
          <div className="flex items-center gap-2 text-sm font-mono text-teal-400">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            {loading ? '...' : workers.length} Active
          </div>
        </div>
      </div>

      {loading && <div className="p-6 text-center text-slate-400">Loading worker data...</div>}
      {error && (
        <div className="p-6 text-center text-red-400 bg-red-500/10">
          <AlertCircle className="inline-block mr-2" />
          Could not load data: {error}
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-700 bg-slate-800/30">
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-400">Worker</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-400">Location</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-400">Heart Rate</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-400">Status</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-400">Last Update</th>
            </tr>
          </thead>
          <tbody>
            {workers.map((worker, index) => {
              const config = statusConfig[worker.status || 'safe'];
              return (
                <motion.tr
                  key={worker._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="font-semibold text-white">
                      {worker.name} <span className="text-sm font-mono text-slate-400 ml-2">{worker.role}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-blue-500" />
                      <span className="text-sm">{worker.location}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Heart className={`w-4 h-4 ${config.text}`} />
                      <span className="font-mono font-semibold">{worker.heartRate || 'N/A'} BPM</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${config.bg} border ${config.border} w-28 justify-center`}>
                      <div className={`w-2 h-2 rounded-full ${config.dot} ${worker.status === 'critical' ? 'animate-pulse' : ''}`} />
                      <span className={`text-sm font-semibold ${config.text}`}>{config.label}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-400 font-mono">{worker.lastUpdate}</td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
