import React, { useState } from 'react';
import { UserAccount } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: UserAccount) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [phoneOrEmail, setPhoneOrEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const user: UserAccount = {
      name: fullName.trim() || 'مهندس معماری',
      email: phoneOrEmail.includes('@') ? phoneOrEmail : 'architect@studio.ir',
      phone: phoneOrEmail.includes('@') ? '۰۹۱۲۳۴۵۶۷۸۹' : phoneOrEmail,
      role: 'طراح ارشد معماری',
      purchasedAssetIds: ['lavasan-villa'], // default sample owned
      joinedDate: 'پاییز ۱۴۰۳',
    };
    onLoginSuccess(user);
    onClose();
  };

  const handleDemoLogin = () => {
    const demoUser: UserAccount = {
      name: 'مهندس آرش شمس',
      email: 'arash.shams@archstudio.ir',
      phone: '۰۹۱۲۹۸۷۶۵۴۳',
      role: 'مدیر آتلیه معماری',
      purchasedAssetIds: ['lavasan-villa', 'travertine-oak-textures'],
      joinedDate: 'زمستان ۱۴۰۳',
    };
    onLoginSuccess(demoUser);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-[#fff8f5] rounded-[28px] p-6 sm:p-8 shadow-2xl border border-[#e9e2d5] text-right"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#e9e2d5]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#99411c]">person</span>
            <h3 className="font-headline-sm text-lg font-bold text-[#1f1b17]">
              {isSignUp ? 'عضویت در پلتفرم آرک‌فایل' : 'ورود به حساب کاربری'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#f6ece5] hover:bg-[#e9e2d5] flex items-center justify-center text-xs"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <div>
              <label className="font-label-md text-xs text-[#625e54] block mb-1">نام و نام خانوادگی:</label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="مثلاً: آرش تهرانی"
                className="w-full bg-white border border-[#dcc1b7] rounded-xl px-4 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-[#99411c]"
              />
            </div>
          )}

          <div>
            <label className="font-label-md text-xs text-[#625e54] block mb-1">
              شماره موبایل یا ایمیل کاری:
            </label>
            <input
              type="text"
              required
              value={phoneOrEmail}
              onChange={(e) => setPhoneOrEmail(e.target.value)}
              placeholder="۰۹۱۲XXXXXXX یا email@domain.com"
              className="w-full bg-white border border-[#dcc1b7] rounded-xl px-4 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-[#99411c]"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-full bg-[#99411c] hover:bg-[#b85932] text-white font-semibold text-sm transition-colors cursor-pointer shadow-sm"
          >
            {isSignUp ? 'ثبت‌نام و ورود' : 'ورود به پنل معمار'}
          </button>
        </form>

        <div className="relative my-6 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#dcc1b7]/60"></div>
          </div>
          <span className="relative bg-[#fff8f5] px-3 text-xs text-[#625e54]">یا ورود آزمایشی</span>
        </div>

        <button
          type="button"
          onClick={handleDemoLogin}
          className="w-full py-2.5 rounded-full bg-[#e9e2d5] hover:bg-[#dcc1b7] text-[#1f1b17] font-medium text-xs sm:text-sm transition-colors cursor-pointer flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined text-[18px] text-[#99411c]">workspace_premium</span>
          <span>ورود سریع با حساب دمو (مهندس آرش شمس)</span>
        </button>

        <div className="mt-5 text-center text-xs text-[#625e54]">
          {isSignUp ? 'قبلاً عضو شده‌اید؟' : 'هنوز حساب کاربری ندارید؟'}{' '}
          <button
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-[#99411c] font-bold hover:underline cursor-pointer"
          >
            {isSignUp ? 'ورود به حساب' : 'ایجاد حساب کاربری'}
          </button>
        </div>
      </div>
    </div>
  );
};
