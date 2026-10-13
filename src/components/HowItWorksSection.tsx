import React from 'react';

export const HowItWorksSection: React.FC = () => {
  return (
    <section className="w-full px-6 sm:px-8 md:px-16 py-10 md:py-16 max-w-7xl mx-auto">
      <div className="w-full rounded-[28px] bg-[#e9e2d5] p-6 sm:p-10 md:p-12 text-right">
        <div className="max-w-2xl mb-8 md:mb-12">
          <span className="font-label-md text-xs sm:text-sm text-[#99411c] font-semibold">
            سادگی، شفافیت و اصالت
          </span>
          <h2 className="font-headline-lg text-2xl sm:text-3xl md:text-[32px] font-bold text-[#1f1b17] mt-1 leading-snug">
            فرآیند دسترسی به دارایی‌ها در سه گام آرام
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Step 1 */}
          <div className="flex flex-col space-y-3 bg-[#fff8f5]/65 backdrop-blur-sm rounded-[22px] p-6 sm:p-7 shadow-sm border border-white/60">
            <div className="flex items-center justify-between">
              <span className="font-display-md text-3xl sm:text-4xl font-light text-[#99411c]/80">
                ۰۱
              </span>
              <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center text-[#99411c] shadow-xs">
                <span className="material-symbols-outlined text-[22px]">manage_search</span>
              </div>
            </div>
            <h3 className="font-headline-sm text-lg sm:text-xl font-bold text-[#1f1b17] pt-2">
              انتخاب دقیق فایل
            </h3>
            <p className="font-body-md text-xs sm:text-sm text-[#625e54] leading-relaxed font-light">
              بررسی کاتالوگ تحلیلی، مشاهده رندرهای بدون ادیت، ارزیابی پولیگان‌ها و مشخصات فنی منطبق با نیاز پروژه.
            </p>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col space-y-3 bg-[#fff8f5]/65 backdrop-blur-sm rounded-[22px] p-6 sm:p-7 shadow-sm border border-white/60">
            <div className="flex items-center justify-between">
              <span className="font-display-md text-3xl sm:text-4xl font-light text-[#99411c]/80">
                ۰۲
              </span>
              <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center text-[#99411c] shadow-xs">
                <span className="material-symbols-outlined text-[22px]">verified_user</span>
              </div>
            </div>
            <h3 className="font-headline-sm text-lg sm:text-xl font-bold text-[#1f1b17] pt-2">
              پرداخت امن و آنی
            </h3>
            <p className="font-body-md text-xs sm:text-sm text-[#625e54] leading-relaxed font-light">
              تسویه حساب شتابی از درگاه‌های بانکی رسمی، صدور فاکتور الکترونیک معتبر و فعال‌سازی فوری لایسنس پروژه.
            </p>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col space-y-3 bg-[#fff8f5]/65 backdrop-blur-sm rounded-[22px] p-6 sm:p-7 shadow-sm border border-white/60">
            <div className="flex items-center justify-between">
              <span className="font-display-md text-3xl sm:text-4xl font-light text-[#99411c]/80">
                ۰۳
              </span>
              <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center text-[#99411c] shadow-xs">
                <span className="material-symbols-outlined text-[22px]">cloud_download</span>
              </div>
            </div>
            <h3 className="font-headline-sm text-lg sm:text-xl font-bold text-[#1f1b17] pt-2">
              دانلود فوری و نامحدود
            </h3>
            <p className="font-body-md text-xs sm:text-sm text-[#625e54] leading-relaxed font-light">
              دسترسی دائمی به لینک‌های پرسرعت در پنل کاربری اختصاصی، همراه با به‌روزرسانی‌های رایگان نسخه‌های آتی.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
