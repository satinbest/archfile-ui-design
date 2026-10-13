import React from 'react';
import { CATEGORIES_DATA, ASSETS_DATA } from '../data/mockAssets';
import { AssetCategory } from '../types';

interface CategoriesViewProps {
  onSelectCategoryFilter: (categoryId: AssetCategory) => void;
  onSelectAsset: (assetId: string) => void;
}

export const CategoriesView: React.FC<CategoriesViewProps> = ({
  onSelectCategoryFilter,
  onSelectAsset,
}) => {
  return (
    <div className="w-full px-6 sm:px-8 md:px-16 py-8 md:py-12 max-w-7xl mx-auto text-right">
      <div className="max-w-3xl mb-12">
        <span className="font-label-md text-xs sm:text-sm text-[#99411c] font-semibold">
          آرشیو موضوعی و تخصصی
        </span>
        <h1 className="font-headline-lg text-2xl sm:text-3xl md:text-4xl font-bold text-[#1f1b17] mt-1">
          دسته‌بندی‌های دارایی‌های معمارانه
        </h1>
        <p className="font-body-md text-sm text-[#625e54] mt-2 font-light leading-relaxed">
          تمامی دارایی‌ها بر اساس مقیاس پروژه، نوع کاربرد و فرمت مدلسازی دسته‌بندی شده‌اند تا طراحان در کمترین زمان به باکیفیت‌ترین متریال‌ها دسترسی پیدا کنند.
        </p>
      </div>

      <div className="space-y-16">
        {CATEGORIES_DATA.map((cat) => {
          const categoryAssets = ASSETS_DATA.filter((a) => a.category === cat.id);

          return (
            <div
              key={cat.id}
              className="bg-[#fcf2eb] rounded-[32px] p-6 sm:p-8 md:p-10 border border-[#e9e2d5]"
            >
              {/* Category banner header */}
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-[#e9e2d5]">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden shrink-0 shadow-sm">
                    <img src={cat.imageUrl} alt={cat.title} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="font-headline-lg text-xl sm:text-2xl font-bold text-[#1f1b17]">
                        {cat.title}
                      </h2>
                      <span className="px-3 py-1 rounded-full bg-[#99411c]/10 text-[#99411c] text-xs font-semibold">
                        {cat.countLabel}
                      </span>
                    </div>
                    <p className="font-body-md text-xs sm:text-sm text-[#625e54] mt-1 font-light">
                      {cat.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full lg:w-auto justify-between lg:justify-end">
                  <div className="flex items-center gap-1.5 text-xs text-[#625e54]">
                    <span className="font-medium">پشتیبانی:</span>
                    {cat.softwareSupported.map((s) => (
                      <span key={s} className="px-2 py-0.5 rounded bg-white text-[11px] border border-[#dcc1b7]/60">
                        {s}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => onSelectCategoryFilter(cat.id)}
                    className="px-5 py-2 rounded-full bg-[#99411c] text-white text-xs sm:text-sm hover:bg-[#b85932] transition-colors cursor-pointer flex items-center gap-1.5 shrink-0"
                  >
                    <span>مشاهده همه</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_left_alt</span>
                  </button>
                </div>
              </div>

              {/* Sample assets preview in this category */}
              <div className="pt-6">
                <span className="font-label-md text-xs text-[#625e54] mb-4 block font-medium">
                  نمونه پروژه‌های برتر در این بخش:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {categoryAssets.slice(0, 3).map((asset) => (
                    <div
                      key={asset.id}
                      onClick={() => onSelectAsset(asset.id)}
                      className="group bg-white rounded-[20px] p-3 shadow-xs hover:shadow-md transition-all cursor-pointer border border-[#e9e2d5] flex items-center gap-3.5"
                    >
                      <div className="w-20 h-20 rounded-[14px] overflow-hidden shrink-0 bg-[#f6ece5]">
                        <img
                          src={asset.imageUrl}
                          alt={asset.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <div className="flex flex-col min-w-0 flex-grow">
                        <span className="text-[10px] text-[#99411c] font-semibold">{asset.formatBadge}</span>
                        <h4 className="font-headline-sm text-sm font-bold text-[#1f1b17] truncate group-hover:text-[#99411c] transition-colors">
                          {asset.title}
                        </h4>
                        <span className="text-xs text-[#625e54] font-medium mt-1">
                          {asset.priceFormatted}
                        </span>
                      </div>
                      <span className="material-symbols-outlined text-[#625e54] group-hover:text-[#99411c] transition-colors text-[18px]">
                        arrow_left_alt
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
