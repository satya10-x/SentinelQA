import React from 'react';

export const StatCard = ({
  title,
  value = '—',
  icon: Icon,
  description,
  accentColor = 'emerald',
}) => {
  const accentClasses = {
    emerald: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    blue: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
    indigo: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
    purple: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
    amber: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    rose: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
  };

  const badgeClass = accentClasses[accentColor] || accentClasses.emerald;

  return (
    <div className="relative overflow-hidden rounded-xl border border-zinc-800/80 bg-zinc-900/60 p-5 shadow-sm backdrop-blur-sm transition-all hover:border-zinc-700/80">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-wider text-zinc-400">
          {title}
        </span>
        {Icon && (
          <div className={`flex h-9 w-9 items-center justify-center rounded-lg border ${badgeClass}`}>
            <Icon className="h-4 w-4" />
          </div>
        )}
      </div>

      <div className="mt-4 flex items-baseline gap-2">
        <span className="text-3xl font-semibold tracking-tight text-zinc-100">
          {value}
        </span>
      </div>

      {description && (
        <p className="mt-2 text-xs text-zinc-400 leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
};

export default StatCard;

