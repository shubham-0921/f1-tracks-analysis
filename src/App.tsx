import { useMemo, useState } from 'react';
import Header from './components/Header';
import FilterBar from './components/FilterBar';
import CircuitCard from './components/CircuitCard';
import { circuits, continents } from './data/circuits';

type SortKey = 'round' | 'name' | 'length' | 'built';

function getRegionForCircuit(id: string): string {
  for (const [region, ids] of Object.entries(continents)) {
    if (ids.includes(id)) return region;
  }
  return '';
}

export default function App() {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [regionFilter, setRegionFilter] = useState('');
  const [sortBy, setSortBy] = useState<SortKey>('round');

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    let result = circuits.filter((c) => {
      const matchSearch =
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.city.toLowerCase().includes(q) ||
        c.country.toLowerCase().includes(q) ||
        c.shortName.toLowerCase().includes(q) ||
        c.designer.toLowerCase().includes(q);

      const matchType = !typeFilter || c.type === typeFilter;

      const region = getRegionForCircuit(c.id);
      const matchRegion = !regionFilter || region === regionFilter;

      return matchSearch && matchType && matchRegion;
    });

    result = [...result].sort((a, b) => {
      switch (sortBy) {
        case 'name': return a.name.localeCompare(b.name);
        case 'length': return b.lengthKm - a.lengthKm;
        case 'built': return a.builtYear - b.builtYear;
        default: return a.calendarRound - b.calendarRound;
      }
    });

    return result;
  }, [search, typeFilter, regionFilter, sortBy]);

  return (
    <div className="min-h-screen bg-f1dark text-white">
      <Header />
      <FilterBar
        search={search}
        onSearch={setSearch}
        typeFilter={typeFilter}
        onTypeFilter={setTypeFilter}
        regionFilter={regionFilter}
        onRegionFilter={setRegionFilter}
        sortBy={sortBy}
        onSortBy={(v) => setSortBy(v as SortKey)}
        total={circuits.length}
        filtered={filtered.length}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-5xl mb-4">🏁</p>
            <p className="text-gray-400 text-lg">No circuits match your search.</p>
            <button
              onClick={() => { setSearch(''); setTypeFilter(''); setRegionFilter(''); }}
              className="mt-4 text-f1red hover:underline text-sm"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {filtered.map((circuit) => (
              <CircuitCard key={circuit.id} circuit={circuit} />
            ))}
          </div>
        )}
      </main>

      <footer className="border-t border-f1border mt-16 py-8 text-center text-gray-600 text-sm">
        <p>
          F1 Circuit Guide · 2025 Season ·{' '}
          <a
            href="https://www.formula1.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-f1red transition-colors"
          >
            formula1.com
          </a>
        </p>
        <p className="mt-1 text-gray-700 text-xs">
          All data compiled from official circuit websites, Formula 1, and Wikipedia.
        </p>
      </footer>
    </div>
  );
}
