export default function Header() {
  return (
    <header className="relative bg-[#080d18] border-b border-[#132035] overflow-hidden">
      {/* Background grid pattern */}
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: 'linear-gradient(#1a3a6a 1px, transparent 1px), linear-gradient(90deg, #1a3a6a 1px, transparent 1px)',
        backgroundSize: '40px 40px',
      }} />
      {/* Blue gradient wash */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0d2040]/60 via-transparent to-transparent" />
      {/* Red accent */}
      <div className="absolute inset-0 bg-gradient-to-r from-f1red/5 via-transparent to-transparent" />
      {/* Left accent bar */}
      <div className="absolute top-0 left-0 w-0.5 h-full bg-gradient-to-b from-f1red via-f1red/30 to-transparent" />
      {/* Bottom glow line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-[#1a3a6a]/60 via-[#1a3a6a]/20 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex items-start gap-5">
          <div className="flex-shrink-0 mt-1 hidden sm:block">
            <div className="w-12 h-12 rounded-lg bg-f1red/10 border border-f1red/20 flex items-center justify-center">
              <span className="text-2xl">🏎️</span>
            </div>
          </div>
          <div>
            <p className="text-f1red/80 text-xs font-bold tracking-[0.4em] uppercase mb-2 font-mono">
              2026 Season · Circuit Guide
            </p>
            <h1 className="text-3xl md:text-5xl font-black text-white leading-tight tracking-tight">
              Formula 1{' '}
              <span className="text-f1red">Circuits</span>
            </h1>
            <p className="mt-3 text-[#3a5a7a] text-sm md:text-base max-w-2xl leading-relaxed">
              Every circuit on the 2026 F1 calendar — history, infrastructure, designers, and the stories
              behind the most iconic stretches of asphalt in motorsport.
            </p>
            <div className="flex flex-wrap gap-5 mt-6">
              <Stat value="24" label="Circuits" />
              <div className="w-px bg-[#132035] self-stretch" />
              <Stat value="18" label="Countries" />
              <div className="w-px bg-[#132035] self-stretch" />
              <Stat value="1920" label="Oldest built" />
              <div className="w-px bg-[#132035] self-stretch" />
              <Stat value="2026" label="Newest built" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col">
      <span className="text-f1red text-xl font-black leading-none tabular-nums">{value}</span>
      <span className="text-[#2a4060] text-[10px] uppercase tracking-[0.2em] font-medium mt-1">{label}</span>
    </div>
  );
}
