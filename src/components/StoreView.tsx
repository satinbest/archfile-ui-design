import React, { useState, useMemo } from 'react';
import { ArchAsset, AssetCategory } from '../types';
import { CATEGORIES_DATA, SOFTWARE_LIST } from '../data/mockAssets';

interface StoreViewProps {
  assets: ArchAsset[];
  onSelectAsset: (assetId: string) => void;
  onAddToCart: (asset: ArchAsset) => void;
  cartAssetIds: string[];
  initialCategory?: string;
  initialSoftware?: string;
}

export const StoreView: React.FC<StoreViewProps> = ({
  assets,
  onSelectAsset,
  onAddToCart,
  cartAssetIds,
  initialCategory,
  initialSoftware,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'all');
  const [selectedSoftware, setSelectedSoftware] = useState<string>(initialSoftware || 'all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'newest' | 'price-asc' | 'price-desc' | 'rating'>('newest');
  const [addedTempIds, setAddedTempIds] = useState<Record<string, boolean>>({});

  const handleAdd = (e: React.MouseEvent, asset: ArchAsset) => {
    e.stopPropagation();
    onAddToCart(asset);
    setAddedTempIds((prev) => ({ ...prev, [asset.id]: true }));
    setTimeout(() => {
      setAddedTempIds((prev) => ({ ...prev, [asset.id]: false }));
    }, 1800);
  };

  const filteredAssets = useMemo(() => {
    return assets
      .filter((asset) => {
        if (selectedCategory !== 'all' && asset.category !== selectedCategory) return false;
        if (selectedSoftware !== 'all') {
          const matchPrimary = asset.primarySoftware.toLowerCase() === selectedSoftware.toLowerCase();
          const matchSupported = asset.supportedSoftware.some(
            (s) => s.toLowerCase() === selectedSoftware.toLowerCase()
          );
          if (!matchPrimary && !matchSupported) return false;
        }
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase();
          const matchTitle = asset.title.toLowerCase().includes(query);
          const matchDesc = asset.shortDescription.toLowerCase().includes(query);
          const matchSoftware = asset.supportedSoftware.some((s) => s.toLowerCase().includes(query));
          const matchStudio = asset.architectStudio?.toLowerCase().includes(query) || false;
          if (!matchTitle && !matchDesc && !matchSoftware && !matchStudio) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0; // default order
      });
  }, [assets, selectedCategory, selectedSoftware, searchQuery, sortBy]);

  return (
    <div className="w-full px-6 sm:px-8 md:px-16 py-8 md:py-12 max-w-7xl mx-auto text-right">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b border-[#e9e2d5] gap-4">
        <div>
          <span className="font-label-md text-xs sm:text-sm text-[#99411c] font-semibold">
            آرشیو دارایی‌های دیجیتال معماری
          </span>
          <h1 className="font-headline-lg text-2xl sm:text-3xl md:text-4xl font-bold text-[#1f1b17] mt-1">
            فروشگاه و کاتالوگ مدل‌های سه‌بعدی
          </h1>
          <p className="font-body-md text-xs sm:text-sm text-[#625e54] mt-1 font-light">
            مدل‌های کالیبره شده با مقیاس ۱:۱، تکسچرهای بدون درز PBR و سازگاری کامل با نرم‌افزارهای استاندارد
          </p>
        </div>

        {/* Counter */}
        <div className="bg-[#f6ece5] px-4 py-2 rounded-full text-xs font-medium text-[#56423c] self-start md:self-auto">
          {filteredAssets.length} دارایی معمارانه یافت شد
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-col gap-5 mb-8 bg-[#fcf2eb] p-5 sm:p-6 rounded-[24px] border border-[#e9e2d5]">
        {/* Search Input & Sort */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="جستجو بر اساس نام پروژه، متریال، نرم‌افزار یا طراح..."
              className="w-full pr-10 pl-4 py-2.5 rounded-full bg-white border border-[#dcc1b7] focus:outline-none focus:border-[#99411c] text-xs sm:text-sm text-[#1f1b17] placeholder:text-[#625e54]/60"
            />
            <span className="material-symbols-outlined absolute right-3 top-2.5 text-[#625e54] text-[20px]">
              search
            </span>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute left-3 top-2.5 text-[#625e54] hover:text-[#1f1b17] text-xs cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
            <span className="font-label-md text-xs text-[#625e54] whitespace-nowrap">مرتب‌سازی:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-white border border-[#dcc1b7] rounded-full px-4 py-2 text-xs text-[#1f1b17] focus:outline-none focus:border-[#99411c] cursor-pointer"
            >
              <option value="newest">جدیدترین پروژه‌ها</option>
              <option value="rating">بالاترین امتیاز</option>
              <option value="price-asc">ارزان‌ترین</option>
              <option value="price-desc">گران‌ترین</option>
            </select>
          </div>
        </div>

        {/* Categories Chips */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 pt-2 border-t border-[#e9e2d5]">
          <span className="font-label-md text-xs text-[#625e54] min-w-20 font-medium">دسته‌بندی:</span>
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3.5 py-1.5 rounded-full text-xs transition-colors cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-[#99411c] text-white font-semibold'
                  : 'bg-white text-[#625e54] hover:bg-[#ebe1da] border border-[#dcc1b7]/60'
              }`}
            >
              همه ({assets.length})
            </button>
            {CATEGORIES_DATA.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs transition-colors cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#99411c] text-white font-semibold'
                    : 'bg-white text-[#625e54] hover:bg-[#ebe1da] border border-[#dcc1b7]/60'
                }`}
              >
                {cat.title}
              </button>
            ))}
          </div>
        </div>

        {/* Software Chips */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
          <span className="font-label-md text-xs text-[#625e54] min-w-20 font-medium">نرم‌افزار:</span>
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setSelectedSoftware('all')}
              className={`px-3 py-1 rounded-full text-xs transition-colors cursor-pointer ${
                selectedSoftware === 'all'
                  ? 'bg-[#00666f] text-white font-semibold'
                  : 'bg-white text-[#625e54] hover:bg-[#ebe1da] border border-[#dcc1b7]/60'
              }`}
            >
              همه نرم‌افزارها
            </button>
            {SOFTWARE_LIST.map((sw) => (
              <button
                key={sw}
                onClick={() => setSelectedSoftware(sw)}
                className={`px-3 py-1 rounded-full text-xs transition-colors cursor-pointer ${
                  selectedSoftware === sw
                    ? 'bg-[#00666f] text-white font-semibold'
                    : 'bg-white text-[#625e54] hover:bg-[#ebe1da] border border-[#dcc1b7]/60'
                }`}
              >
                {sw}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid of Results */}
      {filteredAssets.length === 0 ? (
        <div className="py-20 text-center flex flex-col items-center justify-center bg-[#f6ece5] rounded-[24px] border border-[#dcc1b7]/50">
          <span className="material-symbols-outlined text-5xl text-[#99411c] mb-3">folder_off</span>
          <h3 className="font-headline-sm text-lg font-bold text-[#1f1b17]">
            فایلی با معیارهای انتخابی پیدا نشد
          </h3>
          <p className="font-body-sm text-xs text-[#625e54] mt-1 max-w-md">
            می‌توانید فیلترهای نرم‌افزار یا دسته‌بندی را تغییر دهید یا واژه جستجوی دیگری را امتحان کنید.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSelectedSoftware('all');
              setSearchQuery('');
            }}
            className="mt-4 px-6 py-2 rounded-full bg-[#99411c] text-white text-xs hover:bg-[#b85932] cursor-pointer"
          >
            پاک کردن تمام فیلترها
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAssets.map((asset) => {
            const isJustAdded = addedTempIds[asset.id];
            const isInCart = cartAssetIds.includes(asset.id);

            return (
              <div
                key={asset.id}
                onClick={() => onSelectAsset(asset.id)}
                className="group bg-white rounded-[24px] p-3.5 shadow-md hover:shadow-xl transition-all duration-300 border border-[#e9e2d5] flex flex-col justify-between cursor-pointer text-right"
              >
                {/* Media Container */}
                <div className="relative w-full h-56 rounded-[18px] overflow-hidden bg-[#f6ece5] mb-3">
                  <img
                    src={asset.imageUrl}
                    alt={asset.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-white/95 backdrop-blur-sm text-[#1f1b17] font-label-sm text-[11px] font-semibold shadow-sm border border-[#e9e2d5]">
                    {asset.formatBadge}
                  </span>

                  <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm text-white text-[10px]">
                    {asset.fileSize}
                  </div>
                </div>

                {/* Details */}
                <div className="px-1 flex flex-col flex-grow justify-between">
                  <div>
                    <span className="font-label-sm text-[11px] text-[#99411c] font-medium">
                      {asset.categoryLabel}
                    </span>
                    <h3 className="font-headline-sm text-base sm:text-[17px] font-bold text-[#1f1b17] group-hover:text-[#99411c] transition-colors leading-snug mt-0.5">
                      {asset.title}
                    </h3>
                    <p className="font-body-sm text-xs text-[#625e54] mt-1.5 line-clamp-2 leading-relaxed font-light">
                      {asset.shortDescription}
                    </p>

                    {/* Supported software badges */}
                    <div className="flex flex-wrap gap-1 mt-2.5">
                      {asset.supportedSoftware.slice(0, 3).map((sw) => (
                        <span
                          key={sw}
                          className="px-2 py-0.5 rounded-md bg-[#f6ece5] text-[#56423c] text-[10px]"
                        >
                          {sw}
                        </span>
                      ))}
                      {asset.supportedSoftware.length > 3 && (
                        <span className="text-[10px] text-[#625e54] self-center">
                          +{asset.supportedSoftware.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Price and Cart Action */}
                  <div className="pt-3.5 mt-3 flex items-center justify-between border-t border-[#f1e6e0]">
                    <div className="flex flex-col text-right">
                      <span className="font-label-sm text-[11px] text-[#625e54]">قیمت فایل:</span>
                      <span className="font-headline-sm text-sm sm:text-[16px] font-bold text-[#1f1b17]">
                        {asset.priceFormatted}
                      </span>
                    </div>

                    <button
                      onClick={(e) => handleAdd(e, asset)}
                      aria-label="افزودن به سبد خرید"
                      className={`w-10 h-10 rounded-full flex items-center justify-center shadow-sm transition-all duration-300 cursor-pointer ${
                        isJustAdded
                          ? 'bg-[#00666f] text-white scale-110'
                          : isInCart
                          ? 'bg-[#e9e2d5] text-[#99411c] hover:bg-[#dcc1b7]'
                          : 'bg-[#99411c] text-white hover:bg-[#b85932] active:scale-95'
                      }`}
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[20px]">
                        {isJustAdded ? 'check' : isInCart ? 'done_all' : 'add'}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
