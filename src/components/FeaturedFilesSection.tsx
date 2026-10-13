import React, { useState } from 'react';
import { ArchAsset } from '../types';

interface FeaturedFilesSectionProps {
  assets: ArchAsset[];
  onSelectAsset: (assetId: string) => void;
  onAddToCart: (asset: ArchAsset) => void;
  cartAssetIds: string[];
}

export const FeaturedFilesSection: React.FC<FeaturedFilesSectionProps> = ({
  assets,
  onSelectAsset,
  onAddToCart,
  cartAssetIds,
}) => {
  const [addedTempIds, setAddedTempIds] = useState<Record<string, boolean>>({});
  const [carouselIndex, setCarouselIndex] = useState(0);

  const handleAdd = (e: React.MouseEvent, asset: ArchAsset) => {
    e.stopPropagation();
    onAddToCart(asset);
    setAddedTempIds((prev) => ({ ...prev, [asset.id]: true }));
    setTimeout(() => {
      setAddedTempIds((prev) => ({ ...prev, [asset.id]: false }));
    }, 1800);
  };

  const handlePrev = () => {
    setCarouselIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCarouselIndex((prev) => (prev + 1 < assets.length - 3 ? prev + 1 : prev));
  };

  // We can display the featured slice or all 4
  const displayAssets = assets.slice(carouselIndex, carouselIndex + 4);

  return (
    <section className="w-full px-6 sm:px-8 md:px-16 py-10 md:py-16 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 text-right">
        <div className="flex flex-col">
          <span className="font-label-md text-xs sm:text-sm text-[#99411c] font-semibold mb-1">
            دستچین تحریریه آرک‌فایل
          </span>
          <h2 className="font-headline-lg text-2xl sm:text-3xl font-bold text-[#1f1b17]">
            فایل‌های برگزیده این فصل
          </h2>
          <p className="font-body-md text-xs sm:text-sm text-[#625e54] mt-1 font-light">
            پروژه‌های بازرسی‌شده بر مبنای صحت هندسی و آماده برای رندرینگ نهایی
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto">
          <button
            onClick={handlePrev}
            disabled={carouselIndex === 0}
            aria-label="قبلی"
            className="w-10 h-10 rounded-full bg-[#f6ece5] flex items-center justify-center text-[#56423c] hover:bg-[#e9e2d5] disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">east</span>
          </button>
          <button
            onClick={handleNext}
            disabled={carouselIndex + 4 >= assets.length}
            aria-label="بعدی"
            className="w-10 h-10 rounded-full bg-[#f6ece5] flex items-center justify-center text-[#56423c] hover:bg-[#e9e2d5] disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">west</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {displayAssets.map((asset) => {
          const isJustAdded = addedTempIds[asset.id];
          const isInCart = cartAssetIds.includes(asset.id);

          return (
            <div
              key={asset.id}
              onClick={() => onSelectAsset(asset.id)}
              className="group bg-white rounded-[24px] p-3 sm:p-3.5 shadow-md hover:shadow-xl transition-all duration-300 border border-[#e9e2d5]/70 flex flex-col justify-between cursor-pointer text-right"
            >
              {/* Media Thumbnail Container */}
              <div className="relative w-full h-52 sm:h-56 rounded-[18px] overflow-hidden bg-[#f6ece5] mb-3">
                <img
                  src={asset.imageUrl}
                  alt={asset.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-white/95 backdrop-blur-sm text-[#1f1b17] font-label-sm text-[11px] font-semibold shadow-sm border border-[#e9e2d5]/60">
                  {asset.formatBadge}
                </span>

                <div className="absolute top-3 left-3 w-7 h-7 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-xs font-bold text-[#625e54]">
                  ★ {asset.rating}
                </div>
              </div>

              {/* Information */}
              <div className="px-1 flex flex-col flex-grow justify-between">
                <div>
                  <h3 className="font-headline-sm text-base sm:text-[17px] font-bold text-[#1f1b17] group-hover:text-[#99411c] transition-colors leading-snug">
                    {asset.title}
                  </h3>
                  <p className="font-body-sm text-xs text-[#625e54] mt-1.5 line-clamp-2 leading-relaxed font-light">
                    {asset.shortDescription}
                  </p>
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
                    title={isInCart ? 'در سبد خرید وجود دارد' : 'افزودن به سبد خرید'}
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
    </section>
  );
};
