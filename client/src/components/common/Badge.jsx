import React from 'react';

const SEVERITY_CONFIG = {
  critical: { label: 'Critical', bg: 'bg-rose-500/15', text: 'text-rose-400', border: 'border-rose-500/30', dot: 'bg-rose-400' },
  high: { label: 'High', bg: 'bg-amber-500/15', text: 'text-amber-400', border: 'border-amber-500/30', dot: 'bg-amber-400' },
  medium: { label: 'Medium', bg: 'bg-yellow-500/15', text: 'text-yellow-400', border: 'border-yellow-500/30', dot: 'bg-yellow-400' },
  low: { label: 'Low', bg: 'bg-blue-500/15', text: 'text-blue-400', border: 'border-blue-500/30', dot: 'bg-blue-400' },
};

const PRIORITY_CONFIG = {
  high: { label: 'High', bg: 'bg-orange-500/15', text: 'text-orange-400', border: 'border-orange-500/30' },
  medium: { label: 'Medium', bg: 'bg-blue-500/15', text: 'text-blue-400', border: 'border-blue-500/30' },
  low: { label: 'Low', bg: 'bg-zinc-500/15', text: 'text-zinc-400', border: 'border-zinc-500/30' },
};

const STATUS_CONFIG = {
  open: { label: 'Open', bg: 'bg-emerald-500/15', text: 'text-emerald-400', border: 'border-emerald-500/30', dot: 'bg-emerald-400' },
  in_progress: { label: 'In Progress', bg: 'bg-sky-500/15', text: 'text-sky-400', border: 'border-sky-500/30', dot: 'bg-sky-400 animate-pulse' },
  resolved: { label: 'Resolved', bg: 'bg-purple-500/15', text: 'text-purple-400', border: 'border-purple-500/30', dot: 'bg-purple-400' },
  closed: { label: 'Closed', bg: 'bg-zinc-500/15', text: 'text-zinc-400', border: 'border-zinc-500/30', dot: 'bg-zinc-400' },
};

const PROJECT_STATUS_CONFIG = {
  active: { label: 'Active', bg: 'bg-emerald-500/15', text: 'text-emerald-400', border: 'border-emerald-500/30' },
  archived: { label: 'Archived', bg: 'bg-zinc-500/15', text: 'text-zinc-400', border: 'border-zinc-500/30' },
};

const PARSING_STATUS_CONFIG = {
  complete: { label: 'Fully Parsed', bg: 'bg-emerald-500/15', text: 'text-emerald-400', border: 'border-emerald-500/30' },
  parsed: { label: 'Parsed', bg: 'bg-emerald-500/15', text: 'text-emerald-400', border: 'border-emerald-500/30' },
  partial: { label: 'Partially Parsed', bg: 'bg-amber-500/15', text: 'text-amber-400', border: 'border-amber-500/30' },
  unrecognized: { label: 'Unstructured', bg: 'bg-zinc-500/15', text: 'text-zinc-400', border: 'border-zinc-500/30' },
  empty: { label: 'No Criteria', bg: 'bg-zinc-500/15', text: 'text-zinc-400', border: 'border-zinc-500/30' },
};

export const Badge = ({ type = 'status', value, size = 'sm', className = '' }) => {
  let config;
  const val = String(value || '').toLowerCase();

  switch (type) {
    case 'severity':
      config = SEVERITY_CONFIG[val] || SEVERITY_CONFIG.medium;
      break;
    case 'priority':
      config = PRIORITY_CONFIG[val] || PRIORITY_CONFIG.medium;
      break;
    case 'projectStatus':
      config = PROJECT_STATUS_CONFIG[val] || PROJECT_STATUS_CONFIG.active;
      break;
    case 'parsingStatus':
      config = PARSING_STATUS_CONFIG[val] || PARSING_STATUS_CONFIG.unrecognized;
      break;
    case 'status':
    default:
      config = STATUS_CONFIG[val] || STATUS_CONFIG.open;
      break;
  }

  const sizeClasses = size === 'xs'
    ? 'text-[10px] px-1.5 py-0.5'
    : 'text-xs px-2.5 py-0.5';

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-medium border ${config.bg} ${config.text} ${config.border} ${sizeClasses} ${className}`}
    >
      {config.dot && (
        <span className={`h-1.5 w-1.5 rounded-full ${config.dot}`} />
      )}
      <span>{config.label}</span>
    </span>
  );
};

export default Badge;

