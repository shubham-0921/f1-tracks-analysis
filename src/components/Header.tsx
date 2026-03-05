export default function Header() {
  return (
    <header className="relative bg-f1dark border-b border-f1border">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-f1red/10 via-transparent to-transparent" />
        <div className="absolute top-0 left-0 w-1 h-full bg-f1red" />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 mt-1">
            <span className="text-4xl md:text-5xl">🏎️</span>
          </div>
          <div>
            <p className="text-f1red text-sm font-bold tracking-[0.3em] uppercase mb-1">
              2025 Season
            </p>
            <h1 className="text-3xl md:text-5xl font-black text-white leading-tight tracking-tight">
              Formula 1<br />
              <span className="text-f1red">Circuit Guide</span>
            </h1>
            <p className="mt-3 text-gray-400 text-base md:text-lg max-w-2xl">
              Every circuit on the 2025 F1 calendar — history, infrastructure, designers, and the stories
              behind the most iconic stretches of asphalt in motorsport.
            </p>
            <div className="flex flex-wrap gap-4 mt-5">
              <Stat value="24" label="Circuits" />
              <Stat value="17" label="Countries" />
              <Stat value="1920" label="Oldest built" />
              <Stat value="2023" label="Newest built" />
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
      <span className="text-f1red text-xl font-black">{value}</span>
      <span className="text-gray-500 text-xs uppercase tracking-wider">{label}</span>
    </div>
  );
}
