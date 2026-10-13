import React from 'react';
import { CATEGORIES_DATA } from '../data/mockAssets';
import { AssetCategory } from '../types';

interface CategoriesSectionProps {
  onSelectCategory: (categoryId: AssetCategory) => void;
  onViewAllClick: () => void;
}

export const CategoriesSection: React.FC<CategoriesSectionProps> = ({
  onSelectCategory,
  onViewAllClick,
}) => {
  return (
    <section className="w-full px-6 sm:px-8 md:px-16 py-10 md:py-16 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 text-right">
        <div className="flex flex-col">
          <span className="font-label-md text-xs sm:text-sm text-[#99411c] font-semibold mb-1">
            دسته‌بندی‌های آرشیو
          </span>
          <h2 className="font-headline-lg text-2xl sm:text-3xl font-bold text-[#1f1b17]">
            دسته‌بندی دارایی‌های معمارانه
          </h2>
        </div>

        <button
          onClick={onViewAllClick}
          className="font-label-lg text-sm text-[#625e54] hover:text-[#99411c] transition-colors flex items-center gap-1 self-start md:self-auto cursor-pointer group"
        >
          <span>مشاهده همه بخش‌ها</span>
          <span className="material-symbols-outlined text-[18px] transition-transform group-hover:-translate-x-1">
            chevron_left
          </span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {CATEGORIES_DATA.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className="group relative h-[380px] rounded-[24px] overflow-hidden shadow-sm bg-[#f6ece5] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-lg text-right cursor-pointer w-full block"
          >
            <img
              src={cat.imageUrl}
              alt={cat.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            {/* Measured Scrim for perfect contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1f1b17]/85 via-[#1f1b17]/30 to-transparent"></div>

            <div className="absolute bottom-0 right-0 left-0 p-5 sm:p-6 flex flex-col justify-end text-[#fff8f5]">
              <span className="font-label-sm text-xs opacity-80 mb-1 font-medium">
                {cat.countLabel}
              </span>
              <h3 className="font-headline-sm text-xl sm:text-[22px] font-bold text-white mb-1.5 leading-snug">
                {cat.title}
              </h3>
              <p className="font-body-sm text-xs sm:text-[13px] opacity-90 line-clamp-1 font-light leading-relaxed">
                {cat.description}
              </p>

              {/* Subtle hover explore tag */}
              <div className="mt-3 pt-3 border-t border-white/20 flex items-center justify-between text-xs text-white/80 opacity-0 group-hover:opacity-100 transition-opacity">
                <span>ورود به آرشیو {cat.title}</span>
                <span className="material-symbols-outlined text-sm">arrow_left_alt</span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
};
