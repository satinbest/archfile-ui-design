import React from 'react';
import { SOFTWARE_LIST } from '../data/mockAssets';

interface SoftwareStripProps {
  onSelectSoftware: (software: string) => void;
  activeSoftware?: string;
}

export const SoftwareStrip: React.FC<SoftwareStripProps> = ({
  onSelectSoftware,
  activeSoftware,
}) => {
  return (
    <section className="w-full px-6 sm:px-8 md:px-16 py-4 md:py-6 max-w-7xl mx-auto">
      <div className="w-full rounded-[24px] bg-[#fcf2eb] border border-[#e9e2d5]/60 px-6 sm:px-8 py-5 sm:py-6 flex flex-wrap items-center justify-between gap-y-4 gap-x-6">
        <div className="flex items-center gap-2 text-[#625e54]">
          <span className="material-symbols-outlined text-[20px] text-[#99411c]">tune</span>
          <span className="font-label-md text-xs sm:text-sm font-medium">
            سازگار با محیط‌های نرم‌افزاری استاندارد:
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-x-4 sm:gap-x-6 md:gap-x-8 gap-y-2 font-label-lg text-xs sm:text-sm text-[#56423c] tracking-wider">
          {SOFTWARE_LIST.slice(0, 6).map((software, index) => (
            <React.Fragment key={software}>
              <button
                onClick={() => onSelectSoftware(software)}
                className={`transition-colors cursor-pointer hover:text-[#99411c] font-medium ${
                  activeSoftware === software ? 'text-[#99411c] font-bold underline' : ''
                }`}
                title={`مشاهده فایل‌های سازگار با ${software}`}
              >
                {software}
              </button>
              {index < 5 && <span className="text-[#dcc1b7] select-none">•</span>}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};
