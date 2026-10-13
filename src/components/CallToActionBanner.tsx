import React from 'react';

interface CallToActionBannerProps {
  onExploreClick: () => void;
}

export const CallToActionBanner: React.FC<CallToActionBannerProps> = ({ onExploreClick }) => {
  return (
    <section className="w-full px-6 sm:px-8 md:px-16 py-10 md:py-16 max-w-7xl mx-auto">
      <div className="relative w-full min-h-[420px] md:h-[460px] rounded-[28px] overflow-hidden shadow-xl bg-[#f6ece5] flex items-center">
        {/* Background Render */}
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBSltHs1kt5l3YMsvmC204iyRCFBSAwC0FNrKdwV0PV2YIHFGWgGv2Czn-o6ShODatfjBp78cyWAqNlTxhhtSJKSg5nwna8kyD7L-8mAKBM2VQpspkLguj8t1_dKW2ev7I9qatm3gS1IQ-A0mYnIESzZuYBfiNNOknsgds5wX9uVEBjvY1adQ8AIRUSPqPrWsiXgDhJIu5QB3sfiWkKKX_oBlFujxQhMbn0rLCAbzLgyR-3Re0XNRxbow"
          alt="Architect studio atelier sanctuary"
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />

        {/* Gentle light overlay scrim for readable charcoal text (RTL: right side is content) */}
        <div className="absolute inset-0 bg-gradient-to-l md:bg-gradient-to-l from-[#fff8f5]/95 via-[#fff8f5]/85 to-transparent"></div>

        {/* Banner Content */}
        <div className="relative z-10 max-w-xl p-6 sm:p-10 md:p-14 flex flex-col items-start space-y-5 text-right">
          <span className="px-4 py-1.5 rounded-full bg-[#ffdbce] text-[#370e00] font-label-md text-xs sm:text-[13px] font-semibold">
            پیوستن به همراهان آرک‌فایل
          </span>

          <h2 className="font-display-md text-2xl sm:text-3xl md:text-[38px] font-bold text-[#1f1b17] leading-snug">
            فضایی برای درخشش ایده‌های معمارانه شما
          </h2>

          <p className="font-body-lg text-sm sm:text-base text-[#625e54] leading-relaxed font-light">
            به جامعه طراحان، معماران و دفاتر پیشروی کشور بپیوندید و سرعت مدلسازی و پرزنت پروژه‌های خود را متحول کنید.
          </p>

          <div className="pt-2">
            <button
              onClick={onExploreClick}
              className="inline-flex items-center justify-center px-8 sm:px-9 py-3.5 rounded-full bg-[#99411c] text-[#ffffff] font-label-lg text-sm sm:text-base hover:bg-[#b85932] shadow-sm transition-all duration-300 cursor-pointer active:scale-98"
            >
              <span>آغاز کاوش در آرشیو</span>
              <span className="material-symbols-outlined text-[18px] mr-2">arrow_back</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
