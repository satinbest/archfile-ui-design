import React, { useState } from 'react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onRemoveItem: (assetId: string) => void;
  onProceedToCheckout: (appliedDiscountPercent: number) => void;
  onExploreClick: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onRemoveItem,
  onProceedToCheckout,
  onExploreClick,
}) => {
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.asset.price, 0);
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const total = subtotal - discountAmount;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const code = couponCode.trim().toUpperCase();
    if (code === 'ARCH2025' || code === 'NOROOZ' || code === 'STUDIO15') {
      setDiscountPercent(15);
      setCouponSuccess('کد تخفیف ۱۵٪ با موفقیت اعمال شد!');
      setCouponError('');
    } else if (code === 'VIP25') {
      setDiscountPercent(25);
      setCouponSuccess('کد تخفیف ویژه ۲۵٪ اعمال شد!');
      setCouponError('');
    } else {
      setCouponError('کد تخفیف نامعتبر است (کد تستی: ARCH2025)');
      setCouponSuccess('');
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-start bg-black/40 backdrop-blur-xs animate-fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md h-full bg-[#fff8f5] shadow-2xl flex flex-col justify-between text-right border-l border-[#e9e2d5]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-5 border-b border-[#e9e2d5] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#99411c]">shopping_bag</span>
            <h2 className="font-headline-sm text-lg font-bold text-[#1f1b17]">
              سبد خرید شما ({cartItems.length})
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="بستن"
            className="w-8 h-8 rounded-full bg-[#f6ece5] hover:bg-[#e9e2d5] flex items-center justify-center text-[#1f1b17] transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Drawer Items */}
        <div className="p-5 flex-grow overflow-y-auto space-y-4">
          {cartItems.length === 0 ? (
            <div className="py-20 text-center flex flex-col items-center justify-center">
              <span className="material-symbols-outlined text-5xl text-[#dcc1b7] mb-3">
                shopping_cart_checkout
              </span>
              <p className="font-headline-sm text-base font-bold text-[#1f1b17]">
                سبد خرید شما در حال حاضر خالی است
              </p>
              <p className="text-xs text-[#625e54] mt-1 max-w-xs">
                از فایل‌های رویت، تری‌دی مکس و تکسچرهای برگزیده دیدن کنید.
              </p>
              <button
                onClick={() => {
                  onClose();
                  onExploreClick();
                }}
                className="mt-5 px-6 py-2 rounded-full bg-[#99411c] text-white text-xs hover:bg-[#b85932] cursor-pointer"
              >
                مشاهده فایل‌های آرشیو
              </button>
            </div>
          ) : (
            cartItems.map(({ asset }) => (
              <div
                key={asset.id}
                className="bg-white p-3.5 rounded-2xl border border-[#e9e2d5] flex items-center gap-3.5 shadow-xs"
              >
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-[#f6ece5] shrink-0">
                  <img src={asset.imageUrl} alt={asset.title} className="w-full h-full object-cover" />
                </div>

                <div className="flex-grow min-w-0">
                  <span className="text-[10px] text-[#99411c] font-semibold">{asset.formatBadge}</span>
                  <h4 className="font-headline-sm text-xs sm:text-sm font-bold text-[#1f1b17] truncate">
                    {asset.title}
                  </h4>
                  <span className="text-xs font-bold text-[#1f1b17] block mt-0.5">
                    {asset.priceFormatted}
                  </span>
                </div>

                <button
                  onClick={() => onRemoveItem(asset.id)}
                  aria-label="حذف از سبد"
                  className="w-8 h-8 rounded-full text-[#ba1a1a] hover:bg-[#ffdad6] flex items-center justify-center transition-colors cursor-pointer"
                  title="حذف فایل"
                >
                  <span className="material-symbols-outlined text-[18px]">delete</span>
                </button>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer & Checkout */}
        {cartItems.length > 0 && (
          <div className="p-5 border-t border-[#e9e2d5] bg-[#fcf2eb]/80 space-y-4">
            {/* Coupon input */}
            <form onSubmit={handleApplyCoupon} className="flex gap-2">
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="کد تخفیف (مثال: ARCH2025)"
                className="flex-grow bg-white border border-[#dcc1b7] rounded-full px-4 py-2 text-xs focus:outline-none focus:border-[#99411c]"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-full bg-[#56423c] text-white text-xs hover:bg-[#1f1b17] transition-colors cursor-pointer whitespace-nowrap"
              >
                اعمال کد
              </button>
            </form>
            {couponSuccess && <p className="text-[11px] text-[#00666f] font-medium">{couponSuccess}</p>}
            {couponError && <p className="text-[11px] text-[#ba1a1a]">{couponError}</p>}

            {/* Calculations */}
            <div className="space-y-1.5 text-xs text-[#625e54]">
              <div className="flex justify-between">
                <span>مجموع فایل‌ها:</span>
                <span className="font-medium">{subtotal.toLocaleString('fa-IR')} تومان</span>
              </div>
              {discountPercent > 0 && (
                <div className="flex justify-between text-[#00666f]">
                  <span>تخفیف ({discountPercent}٪):</span>
                  <span>- {discountAmount.toLocaleString('fa-IR')} تومان</span>
                </div>
              )}
              <div className="flex justify-between text-sm font-bold text-[#1f1b17] pt-2 border-t border-[#e9e2d5]">
                <span>مبلغ قابل پرداخت:</span>
                <span className="text-[#99411c] text-base font-bold">
                  {total.toLocaleString('fa-IR')} تومان
                </span>
              </div>
            </div>

            {/* Checkout CTA */}
            <button
              onClick={() => onProceedToCheckout(discountPercent)}
              className="w-full py-3.5 rounded-full bg-[#99411c] hover:bg-[#b85932] text-white font-semibold text-sm transition-all cursor-pointer shadow-sm flex items-center justify-center gap-2 active:scale-98"
            >
              <span>پرداخت و صدور آنی لایسنس</span>
              <span className="material-symbols-outlined text-[18px]">lock</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
