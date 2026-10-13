import React from 'react';

interface FooterProps {
  onNavigate: (screen: string) => void;
  onFilterCategory?: (category: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="w-full bg-[#e9e2d5] text-[#1f1b17] py-12 md:py-16 border-t border-[#dcc1b7]/60">
      <div className="w-full px-6 sm:px-8 md:px-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 mb-12 text-right">
          {/* Brand info */}
          <div className="md:col-span-5 flex flex-col gap-3">
            <div className="flex items-center gap-1">
              <span className="font-headline-sm text-2xl font-bold text-[#1f1b17]">
                آرک‌فایل
              </span>
              <span className="w-2 h-2 rounded-full bg-[#99411c] mb-1"></span>
            </div>
            <p className="font-body-md text-sm text-[#625e54] leading-relaxed max-w-md font-light">
              مرجع تخصصی دارایی‌ها و آبجکت‌های دیجیتال معماری برای طراحان، معماران و هنرمندان تجسمی. دقت ابعادی، متریال‌های واقع‌گرایانه و ساختار استاندارد.
            </p>
          </div>

          {/* About Links */}
          <div className="md:col-span-2 md:col-start-7 flex flex-col gap-3">
            <span className="font-headline-sm text-base font-bold text-[#1f1b17]">
              درباره آرک‌فایل
            </span>
            <div className="flex flex-col gap-2 font-body-sm text-xs sm:text-sm text-[#625e54]">
              <button
                onClick={() => onNavigate('about')}
                className="hover:text-[#99411c] transition-colors text-right cursor-pointer"
              >
                داستان ما
              </button>
              <button
                onClick={() => onNavigate('about')}
                className="hover:text-[#99411c] transition-colors text-right cursor-pointer"
              >
                استاندارد مدل‌ها
              </button>
              <button
                onClick={() => onNavigate('about')}
                className="hover:text-[#99411c] transition-colors text-right cursor-pointer"
              >
                ارتباط با استودیو
              </button>
            </div>
          </div>

          {/* Quick Access */}
          <div className="md:col-span-2 flex flex-col gap-3">
            <span className="font-headline-sm text-base font-bold text-[#1f1b17]">
              دسترسی سریع
            </span>
            <div className="flex flex-col gap-2 font-body-sm text-xs sm:text-sm text-[#625e54]">
              <button
                onClick={() => onNavigate('store')}
                className="hover:text-[#99411c] transition-colors text-right cursor-pointer"
              >
                تمام آرشیو
              </button>
              <button
                onClick={() => onNavigate('store')}
                className="hover:text-[#99411c] transition-colors text-right cursor-pointer"
              >
                فمیلی‌های رویت
              </button>
              <button
                onClick={() => onNavigate('categories')}
                className="hover:text-[#99411c] transition-colors text-right cursor-pointer"
              >
                تکسچرهای PBR
              </button>
            </div>
          </div>

          {/* Guidelines */}
          <div className="md:col-span-2 flex flex-col gap-3">
            <span className="font-headline-sm text-base font-bold text-[#1f1b17]">
              راهنما و قوانین
            </span>
            <div className="flex flex-col gap-2 font-body-sm text-xs sm:text-sm text-[#625e54]">
              <button
                onClick={() => onNavigate('about')}
                className="hover:text-[#99411c] transition-colors text-right cursor-pointer"
              >
                مجوز استفاده
              </button>
              <button
                onClick={() => onNavigate('about')}
                className="hover:text-[#99411c] transition-colors text-right cursor-pointer"
              >
                پرسش‌های متداول
              </button>
              <button
                onClick={() => onNavigate('about')}
                className="hover:text-[#99411c] transition-colors text-right cursor-pointer"
              >
                حریم خصوصی
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-[#dcc1b7]/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-[#625e54] font-label-md text-xs sm:text-[13px]">
          <span>تمامی حقوق مادی و معنوی محفوظ است © ۱۴۰۳ آرک‌فایل</span>
          <span>طراحی بر پایه آرامش و تناسب معمارانه</span>
        </div>
      </div>
    </footer>
  );
};
