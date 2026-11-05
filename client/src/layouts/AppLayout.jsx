import React, { useState } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  Shield,
  LayoutDashboard,
  Layers,
  Ticket,
  PlayCircle,
  Wrench,
  BarChart3,
  Settings,
  Menu,
  X,
  Activity,
  LogOut,
  User,
} from 'lucide-react';
import { useHealth } from '../hooks/useHealth.jsx';
import { useAuth } from '../context/AuthContext.jsx';

const navItems = [
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { name: 'Projects', path: '/projects', icon: Layers },
  { name: 'Tickets', path: '/tickets', icon: Ticket },
  { name: 'Test Runs', path: '/runs', icon: PlayCircle },
  { name: 'Self-Healing', path: '/repairs', icon: Wrench },
  { name: 'Reports', path: '/reports', icon: BarChart3 },
  { name: 'Settings', path: '/settings', icon: Settings },
];

const getPageTitle = (pathname) => {
  if (pathname === '/dashboard' || pathname === '/') return 'Dashboard';
  if (pathname.startsWith('/projects')) return 'Projects & Targets';
  if (pathname.startsWith('/tickets')) return 'Jira Tickets';
  if (pathname.startsWith('/runs')) return 'Test Runs';
  if (pathname.startsWith('/repairs')) return 'Self-Healing Locators';
  if (pathname.startsWith('/reports')) return 'Reports & Analytics';
  if (pathname.startsWith('/settings')) return 'Settings';
  return 'SentinelQA';
};

export const AppLayout = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { data, loading: healthLoading, error: healthError, isHealthy } = useHealth();
  const { user, logout } = useAuth();

  const title = getPageTitle(location.pathname);

  const handleLogout = async () => {
    await logout();
    navigate('/login', { replace: true });
  };

  return (
    <div className="flex min-h-screen bg-zinc-950 text-zinc-100">
      {/* Mobile Drawer Backdrop */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar (Desktop + Mobile Drawer) */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-zinc-800/80 bg-zinc-950 transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="flex h-16 items-center justify-between border-b border-zinc-800/80 px-5">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 shadow-md shadow-emerald-950/40">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-bold tracking-tight text-white">
                  SentinelQA
                </span>
                <span className="rounded bg-emerald-500/10 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-400 border border-emerald-500/20">
                  v0.3
                </span>
              </div>
              <p className="text-[11px] text-zinc-400">Autonomous UI Testing</p>
            </div>
          </div>

          <button
            type="button"
            className="rounded-lg p-1 text-zinc-400 hover:bg-zinc-800 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 space-y-1 px-3 py-4 overflow-y-auto">
          <div className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
            Platform Navigation
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-sm'
                      : 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200 border border-transparent'
                  }`
                }
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Sidebar Footer with Logged In User & Logout */}
        <div className="border-t border-zinc-800/80 p-3">
          <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5 overflow-hidden">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 font-semibold text-xs border border-emerald-500/20">
                  {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <div className="overflow-hidden">
                  <p className="text-xs font-semibold text-zinc-200 truncate">{user?.name || 'Engineer'}</p>
                  <p className="text-[10px] text-zinc-400 truncate">{user?.email || 'Authenticated'}</p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleLogout}
                className="rounded-lg p-1.5 text-zinc-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                title="Sign out"
                aria-label="Sign out"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-zinc-800/80 bg-zinc-950/80 px-4 backdrop-blur-md sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="rounded-lg p-2 text-zinc-400 hover:bg-zinc-800 lg:hidden"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open sidebar"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div>
              <h1 className="text-lg font-semibold tracking-tight text-zinc-100 sm:text-xl">
                {title}
              </h1>
            </div>
          </div>

          {/* Top Bar Right */}
          <div className="flex items-center gap-3">
            {/* System Status Pill */}
            <div
              className={`flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium backdrop-blur-sm transition-colors ${
                healthLoading
                  ? 'border-zinc-700 bg-zinc-900 text-zinc-400'
                  : isHealthy
                  ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-400'
                  : 'border-rose-500/20 bg-rose-500/10 text-rose-400'
              }`}
              title={
                healthLoading
                  ? 'Checking SentinelQA status...'
                  : isHealthy
                  ? `API: Healthy | DB: ${data?.db}`
                  : `System Degraded: ${healthError || 'Database disconnected or API unreachable'}`
              }
            >
              <span className="relative flex h-2 w-2">
                {!healthLoading && isHealthy && (
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                )}
                {!healthLoading && !isHealthy && (
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-400 opacity-75"></span>
                )}
                <span
                  className={`relative inline-flex h-2 w-2 rounded-full ${
                    healthLoading
                      ? 'bg-zinc-500'
                      : isHealthy
                      ? 'bg-emerald-400'
                      : 'bg-rose-400'
                  }`}
                />
              </span>
              <span className="hidden sm:inline">System:</span>
              <span>
                {healthLoading
                  ? 'Checking...'
                  : isHealthy
                  ? 'Operational'
                  : 'Degraded'}
              </span>
            </div>

            {/* Quick Logout button on top bar */}
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-800 bg-zinc-900/60 px-2.5 py-1 text-xs font-medium text-zinc-300 hover:text-rose-400 hover:border-rose-500/20 transition-all"
              title="Sign out of SentinelQA"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </header>

        {/* Page Body */}
        <main className="flex-1 overflow-y-auto bg-zinc-950 p-4 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
