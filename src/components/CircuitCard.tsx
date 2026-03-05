import { useState } from 'react';
import type { Circuit } from '../data/circuits';
import { mapsUrls } from '../data/circuits';

interface CircuitCardProps {
  circuit: Circuit;
}

const TYPE_STYLES: Record<Circuit['type'], string> = {
  permanent: 'bg-sky-950/50 text-sky-400 border-sky-700/30',
  street: 'bg-red-950/50 text-red-400 border-red-700/30',
  temporary: 'bg-amber-950/50 text-amber-400 border-amber-700/30',
};

const TYPE_LABELS: Record<Circuit['type'], string> = {
  permanent: 'Permanent',
  street: 'Street Circuit',
  temporary: 'Temporary',
};

const ExternalIcon = () => (
  <svg className="w-3 h-3 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
  </svg>
);

export default function CircuitCard({ circuit }: CircuitCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [photoLoaded, setPhotoLoaded] = useState(false);
  const [photoFailed, setPhotoFailed] = useState(false);

  const isHistoric = circuit.historicOnly;

  // Surface up to 2 key links at the top
  const officialLink = circuit.references.find(r =>
    !r.url.includes('wikipedia') && !r.url.includes('formula1.com/en/results')
  ) ?? circuit.references[0];
  const f1Link = circuit.references.find(r =>
    r.url.includes('formula1.com/en/racing')
  );
  const mapsUrl = mapsUrls[circuit.id];

  return (
    <article
      className={`relative bg-[#0d1526] border rounded-xl overflow-hidden transition-all duration-300 group ${
        isHistoric
          ? 'border-amber-900/40 hover:border-amber-600/50 hover:shadow-[0_0_40px_-8px_rgba(217,119,6,0.15)]'
          : 'border-[#1a2540] hover:border-f1red/40 hover:shadow-[0_0_40px_-8px_rgba(225,6,0,0.15)]'
      }`}
    >
      {/* Top accent line */}
      <div className={`h-px w-full ${isHistoric ? 'bg-gradient-to-r from-amber-500/50 via-amber-500/15 to-transparent' : 'bg-gradient-to-r from-f1red/60 via-f1red/15 to-transparent'}`} />

      {/* Historic banner */}
      {isHistoric && (
        <div className="bg-amber-950/30 border-b border-amber-900/30 px-5 py-2 flex items-center gap-2">
          <span className="text-amber-500 text-xs">◆</span>
          <span className="text-amber-400/80 text-xs font-semibold uppercase tracking-[0.15em]">
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
          {!photoLoaded && (
            <div className="absolute inset-0 bg-[#0a1220] animate-pulse" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d1526] via-[#0d1526]/25 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-transparent" />
          {circuit.featurePhotoCaption && photoLoaded && (
            <div className="absolute bottom-3 left-4 right-4">
              <span className="inline-flex items-center gap-1.5 text-white/70 text-xs font-medium bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded-md border border-white/10">
                <svg className="w-3 h-3 text-white/35 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                  <span className="text-f1red/60 text-xs font-mono font-medium tracking-wider">
                    R{String(circuit.calendarRound).padStart(2, '0')}
                  </span>
                )}
                <span className={`text-xs px-2 py-0.5 rounded border font-medium tracking-wide ${TYPE_STYLES[circuit.type]}`}>
                  {TYPE_LABELS[circuit.type]}
                </span>
              </div>
              <h2 className="text-white font-bold text-lg leading-tight">
                {circuit.name}
              </h2>
              <p className="text-[#3a5a7a] text-sm mt-0.5">{circuit.city}, {circuit.country}</p>
            </div>
          </div>

          {/* Circuit length */}
          <div className="flex-shrink-0 text-right">
            <span className="text-f1red font-black text-2xl leading-none tabular-nums">{circuit.lengthKm}</span>
            <span className="text-[#2a4060] text-[10px] block mt-0.5 font-mono uppercase tracking-wider">km/lap</span>
          </div>
        </div>

        {/* Always-visible links */}
        {circuit.references.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {officialLink && (
              <a
                href={officialLink.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold
                  bg-f1red/10 border border-f1red/20 text-f1red/80
                  hover:bg-f1red/20 hover:border-f1red/40 hover:text-white transition-all duration-150"
              >
                {officialLink.label}
                <ExternalIcon />
              </a>
            )}
            {f1Link && f1Link.url !== officialLink?.url && (
              <a
                href={f1Link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold
                  bg-[#0a1220] border border-[#1a2f50] text-[#4a7aa0]
                  hover:bg-[#0f1a2e] hover:border-[#2a4570] hover:text-[#7ab0d0] transition-all duration-150"
              >
                {f1Link.label}
                <ExternalIcon />
              </a>
            )}
            {mapsUrl && (
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold
                  bg-[#0a1e14] border border-[#1a3d28] text-[#3a8a58]
                  hover:bg-[#0d2a1c] hover:border-[#2a6040] hover:text-[#5ab878] transition-all duration-150"
              >
                Aerial View
                <svg className="w-3 h-3 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </a>
            )}
          </div>
        )}

        {/* Stats grid */}
        <div className="grid grid-cols-4 gap-2">
          <Stat label="Turns" value={String(circuit.turns)} />
          <Stat label="Built" value={String(circuit.builtYear)} />
          <Stat label="First F1" value={String(circuit.firstF1Race)} />
          <Stat label="Alt." value={`${circuit.altitudeM}m`} />
        </div>
      </div>

      {/* Lap record */}
      <div className="px-5 py-3 border-t border-[#132035] bg-[#0a1220]/60">
        <div className="flex items-center gap-3">
          <svg className="w-4 h-4 text-f1red/40 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <span className="text-[#2a4060] text-[10px] uppercase tracking-[0.15em] font-medium block">Lap Record</span>
            <p className="text-gray-200 text-sm mt-0.5">
              <span className="text-f1red font-bold font-mono text-base">{circuit.lapRecord}</span>
              <span className="text-[#3a5a7a] text-xs ml-2">{circuit.lapRecordHolder} · {circuit.lapRecordYear}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Designer / Contractor */}
      <div className="px-5 py-3 border-t border-[#132035]">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <span className="text-[#2a4060] text-[10px] uppercase tracking-[0.15em] font-medium block">Designer</span>
            <p className="text-[#5a7a9a] text-sm mt-0.5 leading-snug">{circuit.designer}</p>
          </div>
          <div>
            <span className="text-[#2a4060] text-[10px] uppercase tracking-[0.15em] font-medium block">Built by</span>
            <p className="text-[#5a7a9a] text-sm mt-0.5 leading-snug">{circuit.contractor}</p>
          </div>
        </div>
      </div>

      {/* Expand / Collapse button */}
      <button
        onClick={() => setExpanded(!expanded)}
        className={`w-full flex items-center justify-between px-5 py-3 border-t transition-all duration-150 ${
          expanded
            ? 'border-[#132035] text-[#7aaccc] bg-[#0a1220]/40'
            : 'border-[#132035] text-[#2a4060] hover:text-[#5a8aaa] hover:bg-[#0a1220]/40'
        }`}
      >
        <span className="text-xs font-semibold uppercase tracking-[0.15em]">
          {expanded ? 'Show Less' : 'History & Iconic Details'}
        </span>
        <svg
          className={`w-4 h-4 transition-transform duration-300 ${expanded ? 'rotate-180 text-f1red/70' : ''}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Expanded content */}
      {expanded && (
        <div className="border-t border-[#132035] animate-in fade-in">
          {/* History */}
          <div className="px-5 py-5">
            <SectionHeader label="History" />
            <p className="text-[#5a7a9a] text-sm leading-relaxed mt-3">{circuit.history}</p>
          </div>

          {/* Iconic features */}
          <div className="px-5 pb-5 border-t border-[#0f1e30] pt-5">
            <SectionHeader label="Iconic Features" />
            <ul className="mt-3 space-y-3">
              {circuit.iconicFeatures.map((feature, i) => (
                <li key={i} className="flex gap-3 group/item">
                  <span className="text-f1red/50 font-mono text-[10px] font-bold mt-1 flex-shrink-0 group-hover/item:text-f1red/80 transition-colors">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-[#5a7a9a] text-sm leading-snug group-hover/item:text-[#8aaac8] transition-colors">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Direction + Capacity */}
          <div className="px-5 pb-5 border-t border-[#0f1e30] pt-4 grid grid-cols-2 gap-2">
            <div className="bg-[#0a1220] border border-[#132035] rounded-lg p-3">
              <span className="text-[#2a4060] text-[10px] uppercase tracking-[0.15em] font-medium block">Direction</span>
              <p className="text-[#8aaac8] text-sm font-semibold mt-1 capitalize">{circuit.direction}</p>
            </div>
            <div className="bg-[#0a1220] border border-[#132035] rounded-lg p-3">
              <span className="text-[#2a4060] text-[10px] uppercase tracking-[0.15em] font-medium block">Capacity</span>
              <p className="text-[#8aaac8] text-sm font-semibold mt-1">
                {circuit.capacity.toLocaleString()}
              </p>
            </div>
          </div>

          {/* References — additional links not shown at top */}
          {circuit.references.length > 2 && (
            <div className="px-5 pb-5 border-t border-[#0f1e30] pt-4">
              <SectionHeader label="More Links" />
              <div className="flex flex-wrap gap-2 mt-3">
                {circuit.references
                  .filter(r => r.url !== officialLink?.url && r.url !== f1Link?.url)
                  .map((ref) => (
                    <a
                      key={ref.url}
                      href={ref.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium
                        bg-[#0a1220] border border-[#1a2f50] text-[#4a6a88]
                        hover:bg-[#0f1e30] hover:border-[#2a4070] hover:text-[#7aaac8] transition-all duration-150"
                    >
                      {ref.label}
                      <ExternalIcon />
                    </a>
                  ))}
              </div>
            </div>
          )}
        </div>
      )}
    </article>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-[#0a1220] border border-[#132035] rounded-lg px-2 py-2.5 text-center">
      <span className="text-[#2a4060] text-[9px] block uppercase tracking-[0.15em] font-medium">{label}</span>
      <span className="text-[#c8dcea] font-bold text-sm mt-0.5 block tabular-nums">{value}</span>
    </div>
  );
}

function SectionHeader({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <div className="w-0.5 h-4 bg-f1red/70 rounded-full flex-shrink-0" />
      <h3 className="text-[10px] uppercase tracking-[0.2em] text-[#3a5a7a] font-semibold">{label}</h3>
    </div>
  );
}
