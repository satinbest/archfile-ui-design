import React from 'react';
import { ArchAsset } from '../types';

interface HeroProps {
  onExploreClick: () => void;
  onAboutClick: () => void;
  onSelectAsset: (assetId: string) => void;
  heroAsset: ArchAsset;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreClick,
  onAboutClick,
  onSelectAsset,
  heroAsset,
}) => {
  return (
    <section className="w-full px-6 sm:px-8 md:px-16 pt-8 pb-12 md:pb-16 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Editorial Content (Right Side in RTL, order-2 on mobile, order-1 on lg) */}
        <div className="lg:col-span-6 flex flex-col justify-center items-start space-y-5 md:space-y-6 order-2 lg:order-1 text-right">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#e9e2d5] text-[#68645a]">
            <span className="w-2 h-2 rounded-full bg-[#99411c]"></span>
            <span className="font-label-md text-xs sm:text-[13px] font-medium">
              نسخه زمستان ۱۴۰۳ • بازتولید با دقت ابعادی
            </span>
          </div>

          <h1 className="font-display-lg text-3xl sm:text-4xl lg:text-[54px] font-bold text-[#1f1b17] leading-[1.25] tracking-tight">
            معماری در پرتوی نور
            <br />
            و خلوص ناب فرم
          </h1>

          <p className="font-body-lg text-base sm:text-lg text-[#625e54] max-w-xl leading-relaxed font-light">
            مجموعه‌ای منتخب از مدل‌های فاخر رویت، تری‌دی‌مکس و تکسچرهای واقع‌گرایانه، طراحی‌شده برای معماران پیشرو و دفاتر خلاق با استانداردهای اجرایی بی‌نقص.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4 sm:gap-6">
            <button
              onClick={onExploreClick}
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-[#99411c] text-[#ffffff] font-label-lg text-sm sm:text-base shadow-sm hover:bg-[#b85932] transition-all duration-300 cursor-pointer active:scale-98"
            >
              <span>مشاهده فایل‌ها</span>
              <span className="material-symbols-outlined text-[18px] mr-2">arrow_back</span>
            </button>

            <button
              onClick={onAboutClick}
              className="inline-flex items-center gap-2 text-[#1f1b17] hover:text-[#99411c] font-label-lg text-sm sm:text-base transition-colors py-2 border-b border-[#dcc1b7] hover:border-[#99411c] cursor-pointer"
            >
              <span>درباره آرشیو ما</span>
              <span className="material-symbols-outlined text-[18px]">arrow_left_alt</span>
            </button>
          </div>

          {/* Metric accents */}
          <div className="pt-6 sm:pt-8 flex items-center gap-8 sm:gap-12">
            <div className="flex flex-col">
              <span className="font-headline-md text-2xl sm:text-3xl font-bold text-[#1f1b17]">
                ۲٬۴۰۰+
              </span>
              <span className="font-label-md text-xs sm:text-sm text-[#625e54]">
                دارایی سه‌بعدی بازبینی‌شده
              </span>
            </div>
            <div className="w-px h-10 bg-[#dcc1b7]/60"></div>
            <div className="flex flex-col">
              <span className="font-headline-md text-2xl sm:text-3xl font-bold text-[#1f1b17]">
                ۱۰۰٪
              </span>
              <span className="font-label-md text-xs sm:text-sm text-[#625e54]">
                سازگاری با موتورهای رندر
              </span>
            </div>
          </div>
        </div>

        {/* Architectural Composition (Left Side in RTL) */}
        <div className="lg:col-span-6 relative flex justify-center lg:justify-end order-1 lg:order-2">
          <div className="relative w-full max-w-[540px]">
            {/* Primary Main Villa Render */}
            <div
              onClick={() => onSelectAsset(heroAsset.id)}
              className="relative w-full h-[380px] sm:h-[480px] lg:h-[520px] rounded-[28px] overflow-hidden shadow-xl bg-[#f6ece5] group cursor-pointer"
            >
              <img
                src={heroAsset.imageUrl}
                alt="Modern architectural villa in Lavasan"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1f1b17]/40 via-transparent to-transparent pointer-events-none"></div>

              {/* Hover overlay hint */}
              <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 text-white text-xs px-3 py-1.5 rounded-full backdrop-blur-sm flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm">visibility</span>
                <span>مشاهده مشخصات فنی و فایل</span>
              </div>
            </div>

            {/* Secondary Overlapping Detail Render */}
            <div
              onClick={() => onSelectAsset('travertine-oak-textures')}
              className="absolute -bottom-6 -right-6 w-44 sm:w-56 h-44 sm:h-56 rounded-[24px] overflow-hidden shadow-2xl bg-[#f6ece5] hidden sm:block border-4 border-[#fff8f5] group cursor-pointer transition-transform duration-300 hover:scale-105"
            >
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAF4YNmFNlzkyU5UK0AO_PpAA-8QGMTZw1GKy4BhHOUXK6g-E7Kquzi9hSx5ArVbMJpsFXlajFfVPNyqxTTiszIDK-d70ycfi8vbSimw9eSOXy8pPYdY1uK-qgvn9iLk0KvJ-rNOq-psNiLGzU_cbR7Lx7gF4pu9Raf0_Rs5EFanxU6zC62vAk3vN4g_tUp69WcS-UJUTOmbSrN8yk0Wa-voQZdY14Z1u3J-v_KoyZDWIJG1xvTYcj92g"
                alt="Architectural travertine and oak detail"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
            </div>

            {/* Floating White Asset Card */}
            <div
              onClick={() => onSelectAsset(heroAsset.id)}
              className="absolute top-6 sm:top-10 -left-2 sm:left-4 bg-[#ffffff]/95 backdrop-blur-md rounded-[20px] p-3 sm:p-4 shadow-lg flex items-center gap-3 sm:gap-4 max-w-[280px] border border-[#dcc1b7]/40 hover:shadow-xl transition-all cursor-pointer"
            >
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#e9e2d5] flex items-center justify-center text-[#99411c] shrink-0">
                <span className="material-symbols-outlined text-[24px]">apartment</span>
              </div>
              <div className="flex flex-col min-w-0 text-right">
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#99411c]/10 text-[#99411c] font-label-sm text-[11px] w-fit mb-1 font-semibold">
                  {heroAsset.formatBadge}
                </span>
                <span className="font-headline-sm text-sm sm:text-[15px] leading-snug font-semibold text-[#1f1b17] truncate">
                  {heroAsset.title}
                </span>
                <span className="font-body-sm text-xs sm:text-sm text-[#625e54] font-medium">
                  {heroAsset.priceFormatted}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
