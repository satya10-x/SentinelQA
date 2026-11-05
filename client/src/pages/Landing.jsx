import React from 'react';
import { Link } from 'react-router-dom';
import {
  Shield,
  ArrowRight,
  Sparkles,
  Cpu,
  PlayCircle,
  FileSpreadsheet,
  CheckCircle2,
  Server,
  ExternalLink,
  Layers,
} from 'lucide-react';
import { useHealth } from '../hooks/useHealth.jsx';

export const Landing = () => {
  const { isHealthy, loading } = useHealth();

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col">
      {/* Top Navigation */}
      <header className="border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 shadow-md shadow-emerald-950/40">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight text-white">SentinelQA</span>
              <span className="ml-2 rounded bg-emerald-500/10 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-400 border border-emerald-500/20">
                Segment 3
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* System Status Pill */}
            <div
              className={`hidden sm:flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium ${
                loading
                  ? 'border-zinc-700 bg-zinc-900 text-zinc-400'
                  : isHealthy
                  ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-400'
                  : 'border-rose-500/20 bg-rose-500/10 text-rose-400'
              }`}
            >
              <span
                className={`h-2 w-2 rounded-full ${
                  loading ? 'bg-zinc-500' : isHealthy ? 'bg-emerald-400' : 'bg-rose-400'
                }`}
              ></span>
              <span>{loading ? 'Checking...' : isHealthy ? 'System Operational' : 'Degraded'}</span>
            </div>

            <Link
              to="/login"
              className="text-sm font-medium text-zinc-300 hover:text-white px-3 py-2 rounded-lg transition-colors"
            >
              Sign In
            </Link>

            <Link
              to="/signup"
              className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 transition-all"
            >
              Get Started
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="relative overflow-hidden py-20 sm:py-28">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(16,185,129,0.15),rgba(255,255,255,0))]"></div>

          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-1.5 text-xs font-medium text-emerald-400 mb-6">
              <Sparkles className="h-3.5 w-3.5" />
              Autonomous UI Quality Assurance & Self-Healing Engine
            </div>

            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight sm:leading-none">
              Resilient E2E Testing for Fast-Moving Web Apps
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed">
              SentinelQA continuously synthesizes Playwright test suites directly from Jira acceptance criteria, executes headless browser tests, and automatically heals broken locators when UI code changes.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/signup"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-emerald-950/50 hover:bg-emerald-500 transition-all"
              >
                Start Testing Free
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                to="/login"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900/60 px-6 py-3.5 text-base font-semibold text-zinc-200 hover:bg-zinc-800 hover:text-white transition-all backdrop-blur-sm"
              >
                Sign In to Dashboard
              </Link>
            </div>

            {/* Architecture Highlights Strip */}
            <div className="mt-16 pt-10 border-t border-zinc-800/60 grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
              <div className="rounded-xl border border-zinc-800/60 bg-zinc-900/40 p-4">
                <FileSpreadsheet className="h-5 w-5 text-emerald-400 mb-2" />
                <h4 className="text-sm font-semibold text-zinc-200">Jira Ingestion</h4>
                <p className="text-xs text-zinc-400 mt-1">Converts user story acceptance criteria into test specs</p>
              </div>

              <div className="rounded-xl border border-zinc-800/60 bg-zinc-900/40 p-4">
                <Cpu className="h-5 w-5 text-emerald-400 mb-2" />
                <h4 className="text-sm font-semibold text-zinc-200">Groq LLM Engine</h4>
                <p className="text-xs text-zinc-400 mt-1">Sub-second test code synthesis and selector recovery</p>
              </div>

              <div className="rounded-xl border border-zinc-800/60 bg-zinc-900/40 p-4">
                <PlayCircle className="h-5 w-5 text-emerald-400 mb-2" />
                <h4 className="text-sm font-semibold text-zinc-200">Playwright Runner</h4>
                <p className="text-xs text-zinc-400 mt-1">Headless browser executions with trace video capture</p>
              </div>

              <div className="rounded-xl border border-zinc-800/60 bg-zinc-900/40 p-4">
                <Sparkles className="h-5 w-5 text-emerald-400 mb-2" />
                <h4 className="text-sm font-semibold text-zinc-200">Self-Healing DOM</h4>
                <p className="text-xs text-zinc-400 mt-1">Repairs broken IDs, classes, and hierarchy changes</p>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Overview Section */}
        <section className="py-16 bg-zinc-900/30 border-t border-zinc-800/80">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-white">
                How SentinelQA Automates Testing
              </h2>
              <p className="mt-2 text-sm text-zinc-400">
                End-to-end intelligence that bridges product management, code generation, and test maintenance.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 flex flex-col justify-between">
                <div>
                  <div className="h-10 w-10 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-sm mb-4">
                    01
                  </div>
                  <h3 className="text-lg font-semibold text-zinc-100">1. Story Acceptance Parse</h3>
                  <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
                    Monitors Jira tickets for completed criteria, extracts test flows, and structures step-by-step verification actions.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-zinc-800/60 text-xs text-zinc-400 flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  Structured Scenario Generation
                </div>
              </div>

              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 flex flex-col justify-between">
                <div>
                  <div className="h-10 w-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm mb-4">
                    02
                  </div>
                  <h3 className="text-lg font-semibold text-zinc-100">2. Autonomous Synthesis</h3>
                  <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
                    Generates clean, idiomatic Playwright test scripts using high-performance Groq LLM inference without human intervention.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-zinc-800/60 text-xs text-zinc-400 flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  Fast Groq Model Execution
                </div>
              </div>

              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 flex flex-col justify-between">
                <div>
                  <div className="h-10 w-10 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-sm mb-4">
                    03
                  </div>
                  <h3 className="text-lg font-semibold text-zinc-100">3. Self-Healing & Reporting</h3>
                  <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
                    Detects when tests fail due to selector drift (renamed IDs, swapped positions), repairs locators on the fly, and logs true bugs.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-zinc-800/60 text-xs text-zinc-400 flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  Zero False-Alarm Flakiness
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800/80 bg-zinc-950 py-8 text-center text-xs text-zinc-400">
        <p>© 2026 SentinelQA — Autonomous Quality Assurance & Self-Healing Testing Engine.</p>
      </footer>
    </div>
  );
};

export default Landing;

