"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, AlertTriangle, Heart, Thermometer, Activity, Phone, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import RiskBadgeGauge from '@/components/RiskBadgeGauge';
import LiveAdvisory from '@/components/LiveAdvisory';
import HealthTabs from '@/components/HealthTabs';
import SOSButton from '@/components/SOSButton';

export default function WorkerPage() {
  const [riskLevel, setRiskLevel] = useState<'safe' | 'warning' | 'critical'>('warning');

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 pb-24">
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
              <Shield className="w-6 h-6 text-blue-500" />
              <h1 className="text-xl font-bold">Worker Monitor</h1>
            </div>
            <div className="text-sm font-mono text-teal-400">
              ID: WRK-2847
            </div>
          </div>
        </div>
      </motion.header>

      <div className="container mx-auto px-6 py-8 max-w-5xl">
        {/* Risk Badge Gauge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <RiskBadgeGauge riskLevel={riskLevel} />
        </motion.div>

        {/* Live Advisory */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <LiveAdvisory riskLevel={riskLevel} />
        </motion.div>

        {/* Health Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <HealthTabs />
        </motion.div>

        {/* Debug Controls */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6"
        >
          <h3 className="text-lg font-semibold mb-4">Debug: Change Risk Level</h3>
          <div className="flex gap-3">
            <button
              onClick={() => setRiskLevel('safe')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                riskLevel === 'safe'
                  ? 'bg-green-500 text-white'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              Safe
            </button>
            <button
              onClick={() => setRiskLevel('warning')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                riskLevel === 'warning'
                  ? 'bg-amber-500 text-white'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              Warning
            </button>
            <button
              onClick={() => setRiskLevel('critical')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                riskLevel === 'critical'
                  ? 'bg-red-500 text-white'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              Critical
            </button>
          </div>
        </motion.div>
      </div>

      {/* Floating SOS Button */}
      <SOSButton />
    </div>
  );
}
