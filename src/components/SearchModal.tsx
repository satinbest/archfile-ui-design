import React, { useState, useEffect, useRef } from 'react';
import { ArchAsset } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  assets: ArchAsset[];
  onSelectAsset: (assetId: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  assets,
  onSelectAsset,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const results = query.trim()
    ? assets.filter(
        (a) =>
          a.title.toLowerCase().includes(query.toLowerCase()) ||
          a.categoryLabel.toLowerCase().includes(query.toLowerCase()) ||
          a.shortDescription.toLowerCase().includes(query.toLowerCase()) ||
          a.supportedSoftware.some((s) => s.toLowerCase().includes(query.toLowerCase())) ||
          (a.architectStudio && a.architectStudio.toLowerCase().includes(query.toLowerCase()))
      )
    : assets.slice(0, 4);

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/50 backdrop-blur-xs animate-fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-[#fff8f5] rounded-[24px] shadow-2xl border border-[#e9e2d5] overflow-hidden text-right"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-[#e9e2d5] flex items-center gap-3">
          <span className="material-symbols-outlined text-[#99411c] text-2xl">search</span>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="جستجوی مدل (مثلاً: ویلا، پنت‌هاوس، رویت، تراورتن، کرونا)..."
            className="flex-grow bg-transparent text-sm sm:text-base text-[#1f1b17] placeholder:text-[#625e54]/60 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-[#625e54] hover:text-[#1f1b17] text-sm px-2 cursor-pointer"
            >
              ✕
            </button>
          )}
          <kbd className="hidden sm:inline-block px-2 py-1 bg-[#f6ece5] text-[10px] text-[#625e54] rounded-md font-mono border border-[#dcc1b7]/60">
            ESC
          </kbd>
        </div>

        {/* Results Container */}
        <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-5 space-y-2">
          <div className="flex items-center justify-between text-xs text-[#625e54] mb-3 px-1">
            <span>{query ? `نتایج جستجو (${results.length})` : 'پیشنهادات برگزیده تحریریه'}</span>
            <span className="text-[11px]">با زدن روی هر آیتم، مشخصات آن نمایش داده می‌شود</span>
          </div>

          {results.length === 0 ? (
            <div className="py-12 text-center text-xs text-[#625e54]">
              موردی منطبق با &quot;{query}&quot; یافت نشد. عبارت دیگری را جستجو کنید.
            </div>
          ) : (
            results.map((asset) => (
              <div
                key={asset.id}
                onClick={() => {
                  onSelectAsset(asset.id);
                  onClose();
                }}
                className="group flex items-center gap-3.5 p-2.5 rounded-2xl hover:bg-[#f6ece5] transition-all cursor-pointer border border-transparent hover:border-[#e9e2d5]"
              >
                <div className="w-14 h-14 rounded-xl overflow-hidden bg-[#e9e2d5] shrink-0">
                  <img src={asset.imageUrl} alt={asset.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-grow min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-[#99411c] font-semibold">{asset.formatBadge}</span>
                    <span className="text-[10px] text-[#625e54]">• {asset.categoryLabel}</span>
                  </div>
                  <h4 className="font-headline-sm text-sm font-bold text-[#1f1b17] group-hover:text-[#99411c] transition-colors truncate">
                    {asset.title}
                  </h4>
                  <p className="text-xs text-[#625e54] truncate font-light">{asset.shortDescription}</p>
                </div>
                <div className="text-left shrink-0">
                  <span className="text-xs font-bold text-[#1f1b17] block">
                    {asset.priceFormatted}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="p-3 bg-[#fcf2eb] border-t border-[#e9e2d5] flex items-center justify-between text-[11px] text-[#625e54] px-5">
          <div className="flex items-center gap-2">
            <span>دسته‌بندی‌های سریع:</span>
            {['رویت', 'کرونا', 'ویلا', 'تکسچر'].map((tag) => (
              <button
                key={tag}
                onClick={() => setQuery(tag)}
                className="hover:text-[#99411c] underline cursor-pointer"
              >
                {tag}
              </button>
            ))}
          </div>
          <button onClick={onClose} className="hover:text-[#1f1b17] cursor-pointer">
            بستن
          </button>
        </div>
      </div>
    </div>
  );
};
