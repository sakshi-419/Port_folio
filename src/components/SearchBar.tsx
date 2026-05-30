import { Search, X } from 'lucide-react';

interface SearchBarProps {
  id?: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}

export default function SearchBar({ id, value, onChange, placeholder = "Search here..." }: SearchBarProps) {
  return (
    <div id={id} className="relative max-w-md mx-auto mb-8">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-text-muted">
        <Search size={18} className="text-[#FF85C2]" />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-11 pr-10 py-3 bg-white border border-pink-border rounded-full focus:outline-none focus:ring-2 focus:ring-primary-pink focus:border-transparent text-sm text-text-dark placeholder-text-muted shadow-sm transition-all"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute inset-y-0 right-0 pr-4 flex items-center text-text-muted hover:text-primary-pink transition-colors"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}
