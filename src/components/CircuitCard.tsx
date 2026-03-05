import { useState } from 'react';
import type { Circuit } from '../data/circuits';

interface CircuitCardProps {
  circuit: Circuit;
}

const TYPE_STYLES: Record<Circuit['type'], string> = {
  permanent: 'bg-blue-900/50 text-blue-300 border-blue-700/50',
  street: 'bg-f1red/20 text-red-300 border-red-700/50',
  temporary: 'bg-amber-900/50 text-amber-300 border-amber-700/50',
};

const TYPE_LABELS: Record<Circuit['type'], string> = {
  permanent: 'Permanent',
  street: 'Street Circuit',
  temporary: 'Temporary',
};

export default function CircuitCard({ circuit }: CircuitCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <article
      className={`bg-f1card border rounded-xl overflow-hidden transition-all duration-200 hover:shadow-lg group ${
        circuit.historicOnly
          ? 'border-amber-900/50 hover:border-amber-600/50 hover:shadow-amber-900/10'
          : 'border-f1border hover:border-f1red/40 hover:shadow-f1red/5'
      }`}
    >
      {/* Historic banner */}
      {circuit.historicOnly && (
        <div className="bg-amber-950/60 border-b border-amber-900/50 px-5 py-2 flex items-center gap-2">
          <span className="text-amber-400 text-xs">◆</span>
          <span className="text-amber-400 text-xs font-semibold uppercase tracking-wider">
            Historic Circuit — Not on 2025 Calendar
          </span>
        </div>
      )}

      {/* Card header */}
      <div className="p-5 pb-4">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3 min-w-0">
            <span className="text-3xl flex-shrink-0">{circuit.flag}</span>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                {!circuit.historicOnly && (
                  <span className="text-gray-500 text-xs font-medium">
                    Round {circuit.calendarRound}
                  </span>
                )}
                <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${TYPE_STYLES[circuit.type]}`}>
                  {TYPE_LABELS[circuit.type]}
                </span>
              </div>
              <h2 className="text-white font-bold text-lg leading-tight mt-0.5 group-hover:text-gray-100">
                {circuit.name}
              </h2>
              <p className="text-gray-400 text-sm">{circuit.city}, {circuit.country}</p>
            </div>
          </div>
          {/* Length badge */}
          <div className="flex-shrink-0 text-right">
            <span className="text-f1red font-black text-2xl">{circuit.lengthKm}</span>
            <span className="text-gray-500 text-xs block">km/lap</span>
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
          <Stat label="Turns" value={String(circuit.turns)} />
          <Stat label="Built" value={String(circuit.builtYear)} />
          <Stat label="First F1" value={String(circuit.firstF1Race)} />
          <Stat label="Altitude" value={`${circuit.altitudeM}m`} />
        </div>
      </div>

      {/* Designer / Contractor */}
      <div className="px-5 py-3 border-t border-f1border bg-black/20">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
          <div>
            <span className="text-gray-500 text-xs uppercase tracking-wider">Designer</span>
            <p className="text-gray-300 mt-0.5 leading-snug">{circuit.designer}</p>
          </div>
          <div>
            <span className="text-gray-500 text-xs uppercase tracking-wider">Built by</span>
            <p className="text-gray-300 mt-0.5 leading-snug">{circuit.contractor}</p>
          </div>
        </div>
      </div>

      {/* Lap record */}
      <div className="px-5 py-3 border-t border-f1border">
        <span className="text-gray-500 text-xs uppercase tracking-wider">Lap Record</span>
        <p className="text-gray-200 text-sm mt-0.5">
          <span className="text-f1red font-bold font-mono">{circuit.lapRecord}</span>
          {' — '}{circuit.lapRecordHolder} ({circuit.lapRecordYear})
        </p>
      </div>

      {/* Expand / Collapse */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between px-5 py-3 border-t border-f1border
          text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
      >
        <span className="font-medium">{expanded ? 'Show less' : 'History & iconic details'}</span>
        <svg
          className={`w-4 h-4 transition-transform ${expanded ? 'rotate-180' : ''}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Expanded content */}
      {expanded && (
        <div className="border-t border-f1border animate-in fade-in">
          {/* History */}
          <div className="px-5 py-4">
            <h3 className="text-xs uppercase tracking-wider text-gray-500 mb-2">History</h3>
            <p className="text-gray-300 text-sm leading-relaxed">{circuit.history}</p>
          </div>

          {/* Iconic features */}
          <div className="px-5 pb-4">
            <h3 className="text-xs uppercase tracking-wider text-gray-500 mb-3">Iconic Features</h3>
            <ul className="space-y-2">
              {circuit.iconicFeatures.map((feature, i) => (
                <li key={i} className="flex gap-3 text-sm text-gray-300">
                  <span className="text-f1red mt-0.5 flex-shrink-0">▸</span>
                  <span className="leading-snug">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Additional stats */}
          <div className="px-5 pb-4 grid grid-cols-2 gap-3">
            <div className="bg-black/30 rounded-lg p-3">
              <span className="text-gray-500 text-xs uppercase tracking-wider">Direction</span>
              <p className="text-gray-200 text-sm font-medium mt-0.5 capitalize">{circuit.direction}</p>
            </div>
            <div className="bg-black/30 rounded-lg p-3">
              <span className="text-gray-500 text-xs uppercase tracking-wider">Capacity</span>
              <p className="text-gray-200 text-sm font-medium mt-0.5">
                {circuit.capacity.toLocaleString()} seats
              </p>
            </div>
          </div>

          {/* References */}
          <div className="px-5 pb-5 border-t border-f1border pt-4">
            <h3 className="text-xs uppercase tracking-wider text-gray-500 mb-3">Read More</h3>
            <div className="flex flex-wrap gap-2">
              {circuit.references.map((ref) => (
                <a
                  key={ref.url}
                  href={ref.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium
                    bg-white/5 border border-white/10 text-gray-300
                    hover:bg-f1red/20 hover:border-f1red/40 hover:text-white transition-all"
                >
                  {ref.label}
                  <svg className="w-3 h-3 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </article>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-black/30 rounded-lg px-3 py-2 text-center">
      <span className="text-gray-500 text-xs block uppercase tracking-wider">{label}</span>
      <span className="text-gray-200 font-bold text-sm mt-0.5 block">{value}</span>
    </div>
  );
}
