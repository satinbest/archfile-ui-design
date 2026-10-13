import React, { useState, useEffect } from 'react';
import { ArchAsset } from '../types';

interface AssetDetailModalProps {
  asset: ArchAsset | null;
  onClose: () => void;
  onAddToCart: (asset: ArchAsset) => void;
  onInstantBuy: (asset: ArchAsset) => void;
  isInCart: boolean;
  isPurchased: boolean;
}

export const AssetDetailModal: React.FC<AssetDetailModalProps> = ({
  asset,
  onClose,
  onAddToCart,
  onInstantBuy,
  isInCart,
  isPurchased,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [justAdded, setJustAdded] = useState(false);

  useEffect(() => {
    setActiveImageIndex(0);
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [asset, onClose]);

  if (!asset) return null;

  const currentImage = asset.galleryImages[activeImageIndex] || asset.imageUrl;

  const handleAdd = () => {
    onAddToCart(asset);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#1f1b17]/60 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-[#fff8f5] rounded-[28px] shadow-2xl border border-[#e9e2d5] text-right"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="بستن"
          className="absolute top-4 left-4 z-10 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-[#1f1b17] hover:bg-[#e9e2d5] transition-colors cursor-pointer shadow-xs"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        {/* Gallery Section */}
        <div className="relative w-full h-72 sm:h-96 bg-[#f6ece5] overflow-hidden rounded-t-[28px]">
          <img
            src={currentImage}
            alt={asset.title}
            className="w-full h-full object-cover transition-opacity duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none"></div>

          {/* Badges on top right */}
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <span className="px-3.5 py-1 rounded-full bg-white/95 backdrop-blur-sm text-[#1f1b17] font-label-sm text-xs font-semibold shadow-sm">
              {asset.formatBadge}
            </span>
            <span className="px-3 py-1 rounded-full bg-[#99411c] text-white font-label-sm text-xs font-semibold shadow-sm">
              {asset.categoryLabel}
            </span>
          </div>

          {/* Gallery Thumbnails */}
          {asset.galleryImages.length > 1 && (
            <div className="absolute bottom-4 right-4 left-4 flex items-center gap-2 overflow-x-auto pb-1">
              {asset.galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-14 h-14 rounded-xl overflow-hidden border-2 shrink-0 transition-all cursor-pointer ${
                    activeImageIndex === idx
                      ? 'border-[#99411c] scale-105 shadow-md'
                      : 'border-white/80 opacity-75 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Header & Meta */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-[#e9e2d5] pb-6">
            <div>
              <div className="flex items-center gap-2 text-xs text-[#625e54] mb-1.5">
                <span>{asset.architectStudio || 'آرشیو استودیو آرک‌فایل'}</span>
                <span>•</span>
                <span>{asset.location || 'ایران'}</span>
                <span>•</span>
                <span>نسخه {asset.year}</span>
              </div>
              <h2 className="font-headline-lg text-2xl sm:text-3xl font-bold text-[#1f1b17] leading-snug">
                {asset.title}
              </h2>
            </div>

            <div className="flex flex-col sm:items-end shrink-0">
              <span className="font-label-sm text-xs text-[#625e54]">قیمت پروژه کامل:</span>
              <span className="font-headline-md text-2xl font-bold text-[#99411c]">
                {asset.priceFormatted}
              </span>
            </div>
          </div>

          {/* Technical Specs Strip */}
          <div>
            <h3 className="font-headline-sm text-sm font-bold text-[#1f1b17] mb-3 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[18px] text-[#99411c]">tune</span>
              <span>مشخصات فنی و استانداردهای فایل</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-[#fcf2eb] p-3.5 rounded-2xl border border-[#e9e2d5]/60 text-right">
                <span className="text-[11px] text-[#625e54] block">حجم بسته:</span>
                <span className="font-bold text-sm text-[#1f1b17] font-mono">{asset.fileSize}</span>
              </div>
              <div className="bg-[#fcf2eb] p-3.5 rounded-2xl border border-[#e9e2d5]/60 text-right">
                <span className="text-[11px] text-[#625e54] block">تعداد پولیگان:</span>
                <span className="font-bold text-sm text-[#1f1b17]">{asset.polygonCount}</span>
              </div>
              <div className="bg-[#fcf2eb] p-3.5 rounded-2xl border border-[#e9e2d5]/60 text-right">
                <span className="text-[11px] text-[#625e54] block">تعداد رئوس:</span>
                <span className="font-bold text-sm text-[#1f1b17]">{asset.verticesCount}</span>
              </div>
              <div className="bg-[#fcf2eb] p-3.5 rounded-2xl border border-[#e9e2d5]/60 text-right">
                <span className="text-[11px] text-[#625e54] block">امتیاز کیفیت:</span>
                <span className="font-bold text-sm text-[#1f1b17]">★ {asset.rating} از ۵</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="font-headline-sm text-sm font-bold text-[#1f1b17] mb-2">
              توضیحات و تشریح معماری
            </h3>
            <p className="font-body-md text-xs sm:text-sm text-[#625e54] leading-relaxed font-light">
              {asset.fullDescription}
            </p>
          </div>

          {/* Software and Textures */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="bg-[#f6ece5] p-4 rounded-2xl border border-[#e9e2d5]">
              <span className="text-xs font-bold text-[#1f1b17] block mb-2">
                نرم‌افزارهای سازگار:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {asset.supportedSoftware.map((s) => (
                  <span
                    key={s}
                    className="px-2.5 py-1 rounded-lg bg-white text-xs text-[#56423c] font-medium border border-[#dcc1b7]/60"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-[#f6ece5] p-4 rounded-2xl border border-[#e9e2d5]">
              <span className="text-xs font-bold text-[#1f1b17] block mb-2">
                مپ‌های تکسچر همراه فایل:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {asset.texturesIncluded.map((tex) => (
                  <span
                    key={tex}
                    className="px-2.5 py-1 rounded-lg bg-white text-xs text-[#00666f] font-mono border border-[#dcc1b7]/60"
                  >
                    {tex}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Guarantee Note */}
          <div className="p-3.5 bg-[#e9e2d5]/50 rounded-2xl border border-[#dcc1b7] flex items-center gap-3 text-xs text-[#625e54]">
            <span className="material-symbols-outlined text-[#00666f] text-xl">verified_user</span>
            <span>
              ضمانت صحت هندسی و عدم وجود Missing Assets در صورت استفاده از موتورهای رندر معرفی‌شده
            </span>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-[#e9e2d5]">
            {isPurchased ? (
              <div className="w-full py-3 text-center bg-[#00666f]/10 text-[#00666f] rounded-full font-bold text-sm">
                این دارایی قبلاً توسط شما خریداری شده است و در پنل دانلود موجود است
              </div>
            ) : (
              <>
                <button
                  onClick={handleAdd}
                  className={`w-full sm:w-1/2 py-3.5 rounded-full font-semibold text-sm transition-all cursor-pointer flex items-center justify-center gap-2 ${
                    justAdded
                      ? 'bg-[#00666f] text-white'
                      : isInCart
                      ? 'bg-[#e9e2d5] text-[#99411c] hover:bg-[#dcc1b7]'
                      : 'bg-white border-2 border-[#99411c] text-[#99411c] hover:bg-[#fcf2eb]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {justAdded ? 'check' : isInCart ? 'done_all' : 'shopping_bag'}
                  </span>
                  <span>
                    {justAdded ? 'به سبد افزوده شد!' : isInCart ? 'در سبد خرید موجود است' : 'افزودن به سبد خرید'}
                  </span>
                </button>

                <button
                  onClick={() => onInstantBuy(asset)}
                  className="w-full sm:w-1/2 py-3.5 rounded-full bg-[#99411c] hover:bg-[#b85932] text-white font-semibold text-sm transition-all cursor-pointer shadow-sm flex items-center justify-center gap-2 active:scale-98"
                >
                  <span className="material-symbols-outlined text-[20px]">bolt</span>
                  <span>خرید و فعال‌سازی فوری</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
