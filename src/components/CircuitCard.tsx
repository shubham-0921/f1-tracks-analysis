import { useState } from 'react';
import type { Circuit } from '../data/circuits';

interface CircuitCardProps {
  circuit: Circuit;
}

const TYPE_STYLES: Record<Circuit['type'], string> = {
  permanent: 'bg-blue-950/60 text-blue-300 border-blue-700/40',
  street: 'bg-red-950/60 text-red-300 border-red-700/40',
  temporary: 'bg-amber-950/60 text-amber-300 border-amber-700/40',
};

const TYPE_LABELS: Record<Circuit['type'], string> = {
  permanent: 'Permanent',
  street: 'Street Circuit',
  temporary: 'Temporary',
};

export default function CircuitCard({ circuit }: CircuitCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [photoLoaded, setPhotoLoaded] = useState(false);
  const [photoFailed, setPhotoFailed] = useState(false);

  const isHistoric = circuit.historicOnly;

  return (
    <article
      className={`relative bg-[#111] border rounded-xl overflow-hidden transition-all duration-300 group ${
        isHistoric
          ? 'border-amber-900/40 hover:border-amber-600/50 hover:shadow-[0_0_40px_-8px_rgba(217,119,6,0.2)]'
          : 'border-[#222] hover:border-f1red/40 hover:shadow-[0_0_40px_-8px_rgba(225,6,0,0.2)]'
      }`}
    >
      {/* Top accent line */}
      <div className={`h-px w-full ${isHistoric ? 'bg-gradient-to-r from-amber-500/60 via-amber-500/20 to-transparent' : 'bg-gradient-to-r from-f1red/70 via-f1red/20 to-transparent'}`} />

      {/* Historic banner */}
      {isHistoric && (
        <div className="bg-amber-950/40 border-b border-amber-900/40 px-5 py-2 flex items-center gap-2">
          <span className="text-amber-500 text-xs">◆</span>
          <span className="text-amber-400/90 text-xs font-semibold uppercase tracking-[0.15em]">
            Historic Circuit — Not on 2026 Calendar
          </span>
        </div>
      )}

      {/* Feature photo hero */}
      {circuit.featurePhotoUrl && !photoFailed && (
        <div className="relative w-full overflow-hidden" style={{ aspectRatio: '16/7' }}>
          <img
            src={circuit.featurePhotoUrl}
            alt={circuit.featurePhotoCaption ?? `${circuit.name} iconic feature`}
            className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-[1.02] ${photoLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setPhotoLoaded(true)}
            onError={() => setPhotoFailed(true)}
          />
          {/* Skeleton while loading */}
          {!photoLoaded && (
            <div className="absolute inset-0 bg-[#1a1a1a] animate-pulse" />
          )}
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-[#111]/30 to-transparent" />
          {/* Top vignette */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent" />
          {/* Caption badge */}
          {circuit.featurePhotoCaption && photoLoaded && (
            <div className="absolute bottom-3 left-4 right-4">
              <span className="inline-flex items-center gap-1.5 text-white/75 text-xs font-medium bg-black/55 backdrop-blur-sm px-2.5 py-1 rounded-md border border-white/10">
                <svg className="w-3 h-3 text-white/40 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {circuit.featurePhotoCaption}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Card header */}
      <div className="p-5 pb-4">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3 min-w-0">
            <span className="text-3xl flex-shrink-0 leading-none">{circuit.flag}</span>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                {!isHistoric && (
                  <span className="text-f1red/70 text-xs font-mono font-medium tracking-wider">
                    R{String(circuit.calendarRound).padStart(2, '0')}
                  </span>
                )}
                <span className={`text-xs px-2 py-0.5 rounded border font-medium tracking-wide ${TYPE_STYLES[circuit.type]}`}>
                  {TYPE_LABELS[circuit.type]}
                </span>
              </div>
              <h2 className="text-white font-bold text-lg leading-tight group-hover:text-gray-100 transition-colors">
                {circuit.name}
              </h2>
              <p className="text-gray-500 text-sm mt-0.5">{circuit.city}, {circuit.country}</p>
            </div>
          </div>

          {/* Circuit layout + length */}
          <div className="flex-shrink-0 flex flex-col items-end gap-2">
            {circuit.imageUrl && (
              <div className="w-20 h-14 rounded-lg overflow-hidden bg-black/60 border border-white/[0.08] flex items-center justify-center p-1.5">
                <img
                  src={circuit.imageUrl}
                  alt={`${circuit.name} layout`}
                  className="w-full h-full object-contain opacity-60 group-hover:opacity-90 transition-opacity duration-300"
                  style={{ filter: 'invert(1) sepia(1) saturate(3) hue-rotate(320deg) brightness(0.8)' }}
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
              </div>
            )}
            <div className="text-right">
              <span className="text-f1red font-black text-2xl leading-none tabular-nums">{circuit.lengthKm}</span>
              <span className="text-gray-600 text-[10px] block mt-0.5 font-mono uppercase tracking-wider">km/lap</span>
            </div>
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-4 gap-2 mt-4">
          <Stat label="Turns" value={String(circuit.turns)} />
          <Stat label="Built" value={String(circuit.builtYear)} />
          <Stat label="First F1" value={String(circuit.firstF1Race)} />
          <Stat label="Alt." value={`${circuit.altitudeM}m`} />
        </div>
      </div>

      {/* Lap record */}
      <div className="px-5 py-3 border-t border-[#1e1e1e] bg-black/30">
        <div className="flex items-center gap-3">
          <svg className="w-4 h-4 text-f1red/50 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <span className="text-gray-600 text-[10px] uppercase tracking-[0.15em] font-medium block">Lap Record</span>
            <p className="text-gray-200 text-sm mt-0.5">
              <span className="text-f1red font-bold font-mono text-base">{circuit.lapRecord}</span>
              <span className="text-gray-500 text-xs ml-2">{circuit.lapRecordHolder} · {circuit.lapRecordYear}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Designer / Contractor */}
      <div className="px-5 py-3 border-t border-[#1e1e1e]">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <span className="text-gray-600 text-[10px] uppercase tracking-[0.15em] font-medium block">Designer</span>
            <p className="text-gray-400 text-sm mt-0.5 leading-snug">{circuit.designer}</p>
          </div>
          <div>
            <span className="text-gray-600 text-[10px] uppercase tracking-[0.15em] font-medium block">Built by</span>
            <p className="text-gray-400 text-sm mt-0.5 leading-snug">{circuit.contractor}</p>
          </div>
        </div>
      </div>

      {/* Expand / Collapse button */}
      <button
        onClick={() => setExpanded(!expanded)}
        className={`w-full flex items-center justify-between px-5 py-3 border-t transition-all duration-150 ${
          expanded
            ? 'border-[#1e1e1e] text-white bg-white/[0.03]'
            : 'border-[#1e1e1e] text-gray-500 hover:text-white hover:bg-white/[0.03]'
        }`}
      >
        <span className="text-xs font-semibold uppercase tracking-[0.15em]">
          {expanded ? 'Show Less' : 'History & Iconic Details'}
        </span>
        <svg
          className={`w-4 h-4 transition-transform duration-300 ${expanded ? 'rotate-180 text-f1red' : ''}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Expanded content */}
      {expanded && (
        <div className="border-t border-[#1e1e1e] animate-in fade-in">
          {/* History */}
          <div className="px-5 py-5">
            <SectionHeader label="History" />
            <p className="text-gray-400 text-sm leading-relaxed mt-3">{circuit.history}</p>
          </div>

          {/* Iconic features */}
          <div className="px-5 pb-5 border-t border-[#1a1a1a] pt-5">
            <SectionHeader label="Iconic Features" />
            <ul className="mt-3 space-y-3">
              {circuit.iconicFeatures.map((feature, i) => (
                <li key={i} className="flex gap-3 group/item">
                  <span className="text-f1red font-mono text-[10px] font-bold mt-1 flex-shrink-0 opacity-60 group-hover/item:opacity-100 transition-opacity">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-gray-400 text-sm leading-snug group-hover/item:text-gray-300 transition-colors">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Direction + Capacity */}
          <div className="px-5 pb-5 border-t border-[#1a1a1a] pt-4 grid grid-cols-2 gap-2">
            <div className="bg-white/[0.03] border border-white/[0.06] rounded-lg p-3">
              <span className="text-gray-600 text-[10px] uppercase tracking-[0.15em] font-medium block">Direction</span>
              <p className="text-gray-300 text-sm font-semibold mt-1 capitalize">{circuit.direction}</p>
            </div>
            <div className="bg-white/[0.03] border border-white/[0.06] rounded-lg p-3">
              <span className="text-gray-600 text-[10px] uppercase tracking-[0.15em] font-medium block">Capacity</span>
              <p className="text-gray-300 text-sm font-semibold mt-1">
                {circuit.capacity.toLocaleString()}
              </p>
            </div>
          </div>

          {/* References */}
          <div className="px-5 pb-5 border-t border-[#1a1a1a] pt-4">
            <SectionHeader label="Read More" />
            <div className="flex flex-wrap gap-2 mt-3">
              {circuit.references.map((ref) => (
                <a
                  key={ref.url}
                  href={ref.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium
                    bg-white/[0.04] border border-white/[0.08] text-gray-400
                    hover:bg-f1red/15 hover:border-f1red/30 hover:text-white transition-all duration-150"
                >
                  {ref.label}
                  <svg className="w-3 h-3 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
    <div className="bg-white/[0.03] border border-white/[0.05] rounded-lg px-2 py-2.5 text-center">
      <span className="text-gray-600 text-[9px] block uppercase tracking-[0.15em] font-medium">{label}</span>
      <span className="text-gray-200 font-bold text-sm mt-0.5 block tabular-nums">{value}</span>
    </div>
  );
}

function SectionHeader({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <div className="w-0.5 h-4 bg-f1red rounded-full flex-shrink-0" />
      <h3 className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-semibold">{label}</h3>
    </div>
  );
}
