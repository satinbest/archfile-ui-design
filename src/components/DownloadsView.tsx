import React, { useState } from 'react';
import { ArchAsset, UserAccount } from '../types';

interface DownloadsViewProps {
  user: UserAccount | null;
  purchasedAssets: ArchAsset[];
  onSelectAsset: (assetId: string) => void;
  onExploreClick: () => void;
  onOpenAuth: () => void;
}

export const DownloadsView: React.FC<DownloadsViewProps> = ({
  user,
  purchasedAssets,
  onSelectAsset,
  onExploreClick,
  onOpenAuth,
}) => {
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [downloadSuccessId, setDownloadSuccessId] = useState<string | null>(null);

  const handleDownload = (e: React.MouseEvent, assetId: string, title: string) => {
    e.stopPropagation();
    setDownloadingId(assetId);
    setTimeout(() => {
      setDownloadingId(null);
      setDownloadSuccessId(assetId);
      // create simulated text download blob or simulated zip notification
      const element = document.createElement('a');
      const file = new Blob(
        [
          `ArchFile Digital Asset License & Source Package\n\nProject: ${title}\nAsset ID: ${assetId}\nLicensee: ${user?.name || 'Architect'}\nStatus: Commercial Architecture License Granted\nTimestamp: ${new Date().toISOString()}`
        ],
        { type: 'text/plain' }
      );
      element.href = URL.createObjectURL(file);
      element.download = `${assetId}-archfile-license.txt`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);

      setTimeout(() => {
        setDownloadSuccessId(null);
      }, 3000);
    }, 1200);
  };

  if (!user) {
    return (
      <div className="w-full px-6 py-20 max-w-xl mx-auto text-center">
        <div className="bg-[#fcf2eb] p-8 rounded-[28px] border border-[#e9e2d5]">
          <span className="material-symbols-outlined text-5xl text-[#99411c] mb-3">lock</span>
          <h2 className="font-headline-sm text-xl font-bold text-[#1f1b17]">
            برای مشاهده آرشیو دانلودها، لطفا وارد شوید
          </h2>
          <p className="font-body-md text-xs sm:text-sm text-[#625e54] mt-2 mb-6">
            دسترسی به لینک‌های پرسرعت دانلود و لایسنس پروژه‌ها نیازمند ورود به حساب کاربری است.
          </p>
          <button
            onClick={onOpenAuth}
            className="px-8 py-3 rounded-full bg-[#99411c] text-white text-sm font-semibold hover:bg-[#b85932] transition-colors cursor-pointer"
          >
            ورود به حساب کاربری
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full px-6 sm:px-8 md:px-16 py-8 md:py-12 max-w-6xl mx-auto text-right">
      {/* Profile Header */}
      <div className="bg-[#fcf2eb] p-6 sm:p-8 rounded-[28px] border border-[#e9e2d5] mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-[#99411c] text-white flex items-center justify-center text-2xl font-bold">
            {user.name.slice(0, 1)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-headline-sm text-xl sm:text-2xl font-bold text-[#1f1b17]">
                {user.name}
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-[#99411c]/10 text-[#99411c] text-xs font-semibold">
                {user.role}
              </span>
            </div>
            <p className="text-xs text-[#625e54] mt-1">
              {user.email} • عضویت از {user.joinedDate}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-white px-5 py-3 rounded-2xl border border-[#dcc1b7]/60">
          <div className="text-right">
            <span className="text-[11px] text-[#625e54] block">دارایی‌های فعال شما:</span>
            <span className="text-lg font-bold text-[#1f1b17]">{purchasedAssets.length} فایل تجاری</span>
          </div>
          <span className="material-symbols-outlined text-[#99411c] text-2xl">verified</span>
        </div>
      </div>

      {/* Downloads List */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-headline-sm text-xl font-bold text-[#1f1b17]">
          فایل‌های خریداری‌شده و لایسنس‌ها
        </h2>
        <span className="text-xs text-[#625e54]">دانلود نامحدود با ترافیک نیم‌بهاء</span>
      </div>

      {purchasedAssets.length === 0 ? (
        <div className="py-16 text-center bg-[#f6ece5] rounded-[24px] border border-[#e9e2d5] p-8">
          <span className="material-symbols-outlined text-4xl text-[#625e54] mb-2">folder_open</span>
          <h3 className="font-headline-sm text-base font-bold text-[#1f1b17]">
            هنوز فایلی در آرشیو دانلود شما ثبت نشده است
          </h3>
          <p className="text-xs text-[#625e54] mt-1 max-w-md mx-auto mb-6">
            می‌توانید از فروشگاه آرک‌فایل دیدن کرده و فایل‌های مورد نیاز پروژه‌های خود را تهیه کنید.
          </p>
          <button
            onClick={onExploreClick}
            className="px-6 py-2.5 rounded-full bg-[#99411c] text-white text-xs hover:bg-[#b85932] transition-colors cursor-pointer"
          >
            مشاهده فایل‌های برگزیده
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {purchasedAssets.map((asset) => {
            const isDownloading = downloadingId === asset.id;
            const isSuccess = downloadSuccessId === asset.id;

            return (
              <div
                key={asset.id}
                onClick={() => onSelectAsset(asset.id)}
                className="bg-white rounded-[20px] p-4 sm:p-5 border border-[#e9e2d5] hover:shadow-md transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-[#f6ece5] shrink-0">
                    <img src={asset.imageUrl} alt={asset.title} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <span className="text-[11px] text-[#99411c] font-semibold">{asset.formatBadge}</span>
                    <h3 className="font-headline-sm text-base font-bold text-[#1f1b17]">{asset.title}</h3>
                    <p className="text-xs text-[#625e54] mt-0.5 line-clamp-1">{asset.fileSize} • شامل سورس کامل و تکسچرها</p>
                    <div className="flex items-center gap-2 mt-1.5 text-[11px] text-[#00666f] font-mono">
                      <span>کد لایسنس: ARCH-{asset.id.slice(0, 6).toUpperCase()}-2025</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                  <button
                    onClick={(e) => handleDownload(e, asset.id, asset.title)}
                    disabled={isDownloading}
                    className={`px-5 py-2.5 rounded-full text-xs font-semibold flex items-center gap-2 cursor-pointer transition-colors ${
                      isSuccess
                        ? 'bg-[#00666f] text-white'
                        : 'bg-[#99411c] hover:bg-[#b85932] text-white'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {isDownloading ? 'sync' : isSuccess ? 'task_alt' : 'cloud_download'}
                    </span>
                    <span>
                      {isDownloading ? 'در حال آماده‌سازی...' : isSuccess ? 'دانلود شد!' : 'دانلود پکیج کامل'}
                    </span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
