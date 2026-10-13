import React, { useState } from 'react';
import { CartItem, UserAccount } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  discountPercent: number;
  user: UserAccount | null;
  onPaymentSuccess: (purchasedIds: string[]) => void;
  onOpenAuth: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  discountPercent,
  user,
  onPaymentSuccess,
  onOpenAuth,
}) => {
  const [step, setStep] = useState<'review' | 'processing' | 'success'>('review');
  const [cardNumber, setCardNumber] = useState('۶۰۳۷ - ۹۹۱۸ - ۴۲۸۰ - ۱۵۲۴');
  const [cvv2, setCvv2] = useState('۷۴۱');
  const [dynamicOtp, setDynamicOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [customerName, setCustomerName] = useState(user?.name || 'مهندس معماری');
  const [customerPhone, setCustomerPhone] = useState(user?.phone || '۰۹۱۲۳۴۵۶۷۸۹');

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.asset.price, 0);
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const finalPrice = subtotal - discountAmount;

  const handleSimulatePayment = () => {
    setStep('processing');
    setTimeout(() => {
      setStep('success');
      const ids = cartItems.map((item) => item.asset.id);
      onPaymentSuccess(ids);
    }, 1500);
  };

  const handleSendOtp = () => {
    setOtpSent(true);
    setDynamicOtp('۸۳۹۲۵');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-[#fff8f5] rounded-[28px] p-6 sm:p-8 shadow-2xl border border-[#e9e2d5] text-right"
        onClick={(e) => e.stopPropagation()}
      >
        {step === 'review' && (
          <div>
            <div className="flex items-center justify-between border-b border-[#e9e2d5] pb-4 mb-6">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#99411c]">verified_user</span>
                <h3 className="font-headline-sm text-lg font-bold text-[#1f1b17]">
                  درگاه امن شاپرک • تسویه حساب آرک‌فایل
                </h3>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-[#f6ece5] hover:bg-[#e9e2d5] flex items-center justify-center text-xs"
              >
                ✕
              </button>
            </div>

            {/* Order Brief */}
            <div className="bg-[#fcf2eb] p-4 rounded-2xl border border-[#e9e2d5] mb-5 space-y-2 text-xs">
              <div className="flex justify-between text-[#625e54]">
                <span>تعداد اقلام:</span>
                <span className="font-bold text-[#1f1b17]">{cartItems.length} فایل معماری</span>
              </div>
              <div className="flex justify-between text-[#625e54]">
                <span>جمع کل:</span>
                <span>{subtotal.toLocaleString('fa-IR')} تومان</span>
              </div>
              {discountPercent > 0 && (
                <div className="flex justify-between text-[#00666f]">
                  <span>تخفیف اعمال‌شده:</span>
                  <span>- {discountAmount.toLocaleString('fa-IR')} تومان</span>
                </div>
              )}
              <div className="flex justify-between text-sm font-bold text-[#1f1b17] pt-2 border-t border-[#dcc1b7]/60">
                <span>مبلغ نهایی پرداختی:</span>
                <span className="text-[#99411c] text-base font-bold">
                  {finalPrice.toLocaleString('fa-IR')} تومان
                </span>
              </div>
            </div>

            {/* Buyer information */}
            <div className="space-y-3 mb-5">
              <span className="font-label-md text-xs font-semibold text-[#1f1b17] block">
                اطلاعات دریافت لایسنس و فاکتور رسمی:
              </span>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <input
                  type="text"
                  placeholder="نام و نام خانوادگی / دفتر معماری"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="bg-white border border-[#dcc1b7] rounded-xl px-3 py-2 text-right focus:outline-none focus:border-[#99411c]"
                />
                <input
                  type="text"
                  placeholder="شماره تماس جهت ارسال پیامک"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="bg-white border border-[#dcc1b7] rounded-xl px-3 py-2 text-right focus:outline-none focus:border-[#99411c]"
                />
              </div>
            </div>

            {/* Bank Card Simulation Box */}
            <div className="bg-[#f6ece5] p-4 rounded-2xl border border-[#dcc1b7] mb-6 space-y-3">
              <div className="flex items-center justify-between text-xs text-[#625e54]">
                <span>کارت بانکی شتاب:</span>
                <span className="text-[#00666f] font-mono">شاپرک تایید شده</span>
              </div>
              <input
                type="text"
                dir="ltr"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                className="w-full bg-white border border-[#dcc1b7] rounded-xl px-3 py-2 text-center font-mono text-sm tracking-wider"
              />
              <div className="grid grid-cols-2 gap-2 text-xs">
                <input
                  type="text"
                  dir="ltr"
                  placeholder="CVV2"
                  value={cvv2}
                  onChange={(e) => setCvv2(e.target.value)}
                  className="bg-white border border-[#dcc1b7] rounded-xl px-3 py-2 text-center font-mono"
                />
                <div className="flex gap-1.5">
                  <input
                    type="text"
                    dir="ltr"
                    placeholder="رمز پویا"
                    value={dynamicOtp}
                    onChange={(e) => setDynamicOtp(e.target.value)}
                    className="w-24 bg-white border border-[#dcc1b7] rounded-xl px-2 py-2 text-center font-mono"
                  />
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    className="flex-grow px-2 py-2 rounded-xl bg-[#56423c] text-white text-[11px] hover:bg-[#1f1b17] cursor-pointer whitespace-nowrap"
                  >
                    {otpSent ? 'ارسال شد' : 'دریافت رمز'}
                  </button>
                </div>
              </div>
            </div>

            {/* Quick action buttons */}
            <div className="space-y-2">
              <button
                onClick={handleSimulatePayment}
                className="w-full py-3.5 rounded-full bg-[#99411c] hover:bg-[#b85932] text-white font-bold text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>پرداخت و دریافت فوری فایل‌ها</span>
                <span className="material-symbols-outlined text-[18px]">credit_card</span>
              </button>

              <p className="text-center text-[11px] text-[#625e54]">
                تست محیط دمو: کلیک روی دکمه فوق پرداخت را فوراً تایید کرده و لینک‌ها را فعال می‌کند.
              </p>
            </div>
          </div>
        )}

        {step === 'processing' && (
          <div className="py-16 text-center space-y-4">
            <div className="w-16 h-16 rounded-full border-4 border-[#99411c] border-t-transparent animate-spin mx-auto"></div>
            <h3 className="font-headline-sm text-lg font-bold text-[#1f1b17]">
              در حال ارتباط با شاپرک و اعتبارسنجی تراکنش...
            </h3>
            <p className="text-xs text-[#625e54]">لطفاً چند لحظه شکیبا باشید</p>
          </div>
        )}

        {step === 'success' && (
          <div className="py-6 text-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-[#00666f]/10 text-[#00666f] flex items-center justify-center mx-auto text-3xl font-bold">
              <span className="material-symbols-outlined text-4xl">check_circle</span>
            </div>

            <div>
              <span className="px-3 py-1 rounded-full bg-[#00666f]/10 text-[#00666f] text-xs font-bold inline-block mb-2">
                تراکنش موفقیت‌آمیز
              </span>
              <h3 className="font-headline-lg text-2xl font-bold text-[#1f1b17]">
                پرداخت با موفقیت انجام شد!
              </h3>
              <p className="text-xs text-[#625e54] mt-1">
                شماره پیگیری: SHP-{Math.floor(100000 + Math.random() * 900000)} • لایسنس پروژه‌ها صادر گردید
              </p>
            </div>

            <div className="bg-[#fcf2eb] p-4 rounded-2xl border border-[#e9e2d5] text-right space-y-2 text-xs">
              <span className="font-bold text-[#1f1b17] block mb-1">فایل‌های خریداری‌شده:</span>
              {cartItems.map((item) => (
                <div key={item.asset.id} className="flex justify-between items-center py-1 border-b border-[#e9e2d5]/60 last:border-0">
                  <span className="font-medium text-[#1f1b17] truncate max-w-[220px]">
                    {item.asset.title}
                  </span>
                  <span className="text-[#00666f] font-mono text-[11px]">لایسنس دائم فعال</span>
                </div>
              ))}
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                onClick={onClose}
                className="flex-grow py-3 rounded-full bg-[#99411c] hover:bg-[#b85932] text-white font-semibold text-xs sm:text-sm cursor-pointer shadow-sm"
              >
                مشاهده در آرشیو دانلود من
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
