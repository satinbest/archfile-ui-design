import React from 'react';

export const AboutView: React.FC = () => {
  return (
    <div className="w-full px-6 sm:px-8 md:px-16 py-8 md:py-16 max-w-5xl mx-auto text-right">
      {/* Header */}
      <div className="mb-12">
        <span className="font-label-md text-xs sm:text-sm text-[#99411c] font-semibold">
          مانیفست استودیو
        </span>
        <h1 className="font-display-lg text-3xl sm:text-4xl md:text-5xl font-bold text-[#1f1b17] mt-2 leading-tight">
          آرک‌فایل؛ تلاقی دقت مهندسی و روح معماری
        </h1>
        <p className="font-body-lg text-base sm:text-lg text-[#625e54] mt-4 font-light leading-relaxed">
          ما آرک‌فایل را با یک هدف بنیادین بنا نهادیم: رهایی معماران و طراحان خلاق از فرآیندهای فرساینده مدلسازی تکراری، و ارتقای استاندارد بصری ارائه‌های معماری در کشور.
        </p>
      </div>

      {/* Main Image Atelier spread */}
      <div className="relative w-full h-[320px] sm:h-[440px] rounded-[28px] overflow-hidden shadow-lg bg-[#f6ece5] mb-12">
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBSltHs1kt5l3YMsvmC204iyRCFBSAwC0FNrKdwV0PV2YIHFGWgGv2Czn-o6ShODatfjBp78cyWAqNlTxhhtSJKSg5nwna8kyD7L-8mAKBM2VQpspkLguj8t1_dKW2ev7I9qatm3gS1IQ-A0mYnIESzZuYBfiNNOknsgds5wX9uVEBjvY1adQ8AIRUSPqPrWsiXgDhJIu5QB3sfiWkKKX_oBlFujxQhMbn0rLCAbzLgyR-3Re0XNRxbow"
          alt="ArchFile Atelier"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        <div className="absolute bottom-6 right-6 left-6 text-white text-xs sm:text-sm font-light opacity-95">
          آتلیه تخصصی کالیبراسیون نور و مدل‌های دیجیتال آرک‌فایل
        </div>
      </div>

      {/* 3 Core Quality Pillars */}
      <div className="mb-16">
        <h2 className="font-headline-lg text-2xl sm:text-3xl font-bold text-[#1f1b17] mb-6">
          سه استاندارد خدشه‌ناپذیر در انتشار هر فایل
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#fcf2eb] p-6 rounded-[24px] border border-[#e9e2d5]">
            <div className="w-10 h-10 rounded-full bg-[#99411c]/10 text-[#99411c] flex items-center justify-center font-bold mb-4">
              ۱
            </div>
            <h3 className="font-headline-sm text-lg font-bold text-[#1f1b17] mb-2">
              صحت هندسی و مقیاس واقعی
            </h3>
            <p className="font-body-md text-xs sm:text-sm text-[#625e54] leading-relaxed font-light">
              تمام احجام بر اساس مقیاس میلی‌متری دقیق و بدون پولیگان‌های همپوشان یا نرمال‌های معکوس مدلسازی می‌شوند تا در هیچ موتور رندری ایجاد آرتیفکت نکنند.
            </p>
          </div>

          <div className="bg-[#fcf2eb] p-6 rounded-[24px] border border-[#e9e2d5]">
            <div className="w-10 h-10 rounded-full bg-[#99411c]/10 text-[#99411c] flex items-center justify-center font-bold mb-4">
              ۲
            </div>
            <h3 className="font-headline-sm text-lg font-bold text-[#1f1b17] mb-2">
              تکسچرهای فوتوگرامتری PBR
            </h3>
            <p className="font-body-md text-xs sm:text-sm text-[#625e54] leading-relaxed font-light">
              متریال‌ها شامل اسکن‌های واقعی سنگ‌ها، آجرها و چوب‌های ایرانی با مپ‌های تفکیک‌شده ۸K و محاسبه دقیق بازتاب و ناهمواری فیزیکی هستند.
            </p>
          </div>

          <div className="bg-[#fcf2eb] p-6 rounded-[24px] border border-[#e9e2d5]">
            <div className="w-10 h-10 rounded-full bg-[#99411c]/10 text-[#99411c] flex items-center justify-center font-bold mb-4">
              ۳
            </div>
            <h3 className="font-headline-sm text-lg font-bold text-[#1f1b17] mb-2">
              لایه‌بندی استاندارد BIM
            </h3>
            <p className="font-body-md text-xs sm:text-sm text-[#625e54] leading-relaxed font-light">
              فایل‌های رویت و کد با استانداردهای فاز ۲، تفکیک دقیق متریال‌ها، فمیلی‌های پارامتریک و نام‌گذاری استاندارد آماده ورود مستقیم به پروسه ساخت هستند.
            </p>
          </div>
        </div>
      </div>

      {/* Studio Team & Contact */}
      <div className="bg-[#e9e2d5] p-8 sm:p-10 rounded-[28px] border border-[#dcc1b7]">
        <div className="max-w-2xl">
          <span className="font-label-md text-xs text-[#99411c] font-semibold">ارتباط با استودیو</span>
          <h2 className="font-headline-lg text-xl sm:text-2xl font-bold text-[#1f1b17] mt-1">
            سفارش مدلسازی و فمیلی‌های اختصاصی برای دفاتر معماری
          </h2>
          <p className="font-body-md text-xs sm:text-sm text-[#625e54] mt-2 leading-relaxed font-light">
            چنانچه دفتر معماری شما نیازمند تهیه پکیج اختصاصی، تبدیل نقشه‌های فاز ۲ به مدل‌های هوشمند BIM، یا اسکن اختصاصی متریال‌های لوکس است، با تیم پشتیبانی آرک‌فایل در تماس باشید.
          </p>

          <div className="flex flex-wrap items-center gap-6 mt-6 pt-4 border-t border-[#dcc1b7]/60 text-xs text-[#1f1b17]">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#99411c] text-sm">mail</span>
              <span>studio@archfile.ir</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#99411c] text-sm">phone</span>
              <span dir="ltr">۰۲۱ - ۲۲۰۰ ۴۸۹۰</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#99411c] text-sm">location_on</span>
              <span>تهران، خیابان فرشته، پلاک ۲۴</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
