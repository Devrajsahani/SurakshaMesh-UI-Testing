"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, ArrowLeft, Users, Camera, Map, FileText, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import WorkerListTable from '@/components/WorkerListTable';
import CCTVGrid from '@/components/CCTVGrid';
import HeatMap3D from '@/components/HeatMap3D';
import BlockchainReceipts from '@/components/BlockchainReceipts';
import AnomalyFeed from '@/components/AnomalyFeed';

type TabType = 'overview' | 'cctv' | 'heatmap' | 'blockchain' | 'anomalies';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  const tabs = [
    { id: 'overview' as TabType, label: 'Overview', icon: Users },
    { id: 'cctv' as TabType, label: 'CCTV', icon: Camera },
    { id: 'heatmap' as TabType, label: '3D Heatmap', icon: Map },
    { id: 'blockchain' as TabType, label: 'Blockchain', icon: FileText },
    { id: 'anomalies' as TabType, label: 'Anomalies', icon: AlertTriangle },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      {/* Header */}
      <motion.header
        className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700 sticky top-0 z-40"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </Link>
            <div className="flex items-center gap-3">
              <Shield className="w-6 h-6 text-teal-400" />
              <h1 className="text-xl font-bold">Supervisor Dashboard</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm font-mono text-teal-400">
                LIVE
              </div>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            </div>
          </div>
        </div>
      </motion.header>

      {/* Tab Navigation */}
      <div className="container mx-auto px-6 py-4">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30'
                    : 'bg-slate-800/50 text-slate-400 hover:bg-slate-700/50 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="container mx-auto px-6 pb-12">
        {activeTab === 'overview' && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid lg:grid-cols-3 gap-6"
          >
            <div className="lg:col-span-2">
              <WorkerListTable />
            </div>
            <div>
              <AnomalyFeed />
            </div>
          </motion.div>
        )}

        {activeTab === 'cctv' && (
          <motion.div
            key="cctv"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <CCTVGrid />
          </motion.div>
        )}

        {activeTab === 'heatmap' && (
          <motion.div
            key="heatmap"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <HeatMap3D />
          </motion.div>
        )}

        {activeTab === 'blockchain' && (
          <motion.div
            key="blockchain"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <BlockchainReceipts />
          </motion.div>
        )}

        {activeTab === 'anomalies' && (
          <motion.div
            key="anomalies"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <AnomalyFeed fullView />
          </motion.div>
        )}
      </div>
    </div>
  );
}
