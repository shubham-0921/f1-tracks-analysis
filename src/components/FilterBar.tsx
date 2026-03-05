import type { Circuit } from '../data/circuits';

interface FilterBarProps {
  search: string;
  onSearch: (v: string) => void;
  typeFilter: string;
  onTypeFilter: (v: string) => void;
  regionFilter: string;
  onRegionFilter: (v: string) => void;
  sortBy: string;
  onSortBy: (v: string) => void;
  total: number;
  filtered: number;
}

const TYPES: { value: Circuit['type'] | ''; label: string }[] = [
  { value: '', label: 'All types' },
  { value: 'permanent', label: 'Permanent' },
  { value: 'street', label: 'Street' },
  { value: 'temporary', label: 'Temporary' },
];

const REGIONS = ['All regions', 'Europe', 'Middle East', 'Asia-Pacific', 'Americas', 'Oceania'];

const SORTS = [
  { value: 'round', label: 'Calendar order' },
  { value: 'name', label: 'Name A–Z' },
  { value: 'length', label: 'Length (longest)' },
  { value: 'built', label: 'Year built (oldest)' },
];

export default function FilterBar({
  search, onSearch,
  typeFilter, onTypeFilter,
  regionFilter, onRegionFilter,
  sortBy, onSortBy,
  total, filtered,
}: FilterBarProps) {
  return (
    <div className="sticky top-0 z-20 bg-[#080d18]/95 backdrop-blur-md border-b border-[#132035]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1 min-w-0">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search circuit, city, country…"
              value={search}
              onChange={(e) => onSearch(e.target.value)}
              className="w-full bg-[#0d1526] border border-[#1a2540] rounded-lg pl-10 pr-4 py-2 text-sm text-white
                placeholder-[#2a4060] focus:outline-none focus:border-f1red/40 focus:bg-[#0f1a2e] transition-all"
            />
          </div>

          {/* Filters row */}
          <div className="flex gap-2 flex-wrap sm:flex-nowrap">
            <Select value={typeFilter} onChange={onTypeFilter}>
              {TYPES.map((t) => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </Select>
            <Select value={regionFilter} onChange={onRegionFilter}>
              {REGIONS.map((r) => (
                <option key={r} value={r === 'All regions' ? '' : r}>{r}</option>
              ))}
            </Select>
            <Select value={sortBy} onChange={onSortBy}>
              {SORTS.map((s) => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </Select>
          </div>
        </div>

        {/* Results count */}
        <p className="text-[11px] text-[#2a4060] mt-2 font-mono">
          SHOWING{' '}
          <span className="text-[#5a8aaa] font-bold">{filtered}</span>
          {' '}OF {total} CIRCUITS
        </p>
      </div>
    </div>
  );
}

function Select({ value, onChange, children }: {
  value: string;
  onChange: (v: string) => void;
  children: React.ReactNode;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="bg-[#0d1526] border border-[#1a2540] rounded-lg px-3 py-2 text-sm text-[#4a6a88]
        focus:outline-none focus:border-f1red/40 transition-colors cursor-pointer appearance-none
        pr-8 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMiIgaGVpZ2h0PSIxMiIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiMyYTQwNjAiIHN0cm9rZS13aWR0aD0iMiI+PHBhdGggZD0ibTYgOSA2IDYgNi02Ii8+PC9zdmc+')]
        bg-no-repeat bg-[right_0.5rem_center] hover:border-[#2a3a5a] hover:text-[#7aaac8]"
    >
      {children}
    </select>
  );
}
