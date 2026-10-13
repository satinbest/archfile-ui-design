import React from 'react';
import { UserAccount } from '../types';

interface HeaderProps {
  currentScreen: string;
  onNavigate: (screen: string) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenSearch: () => void;
  onOpenAuth: () => void;
  user: UserAccount | null;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  onNavigate,
  cartCount,
  onOpenCart,
  onOpenSearch,
  onOpenAuth,
  user,
}) => {
  return (
    <header className="fixed top-0 w-full z-40 bg-[#fff8f5]/90 backdrop-blur-xl border-b border-[#e9e2d5]/60 shadow-[0_1px_8px_rgba(43,38,34,0.03)]">
      <div className="h-20 w-full px-6 sm:px-8 md:px-16 flex items-center justify-between max-w-7xl mx-auto">
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-8">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-1 group text-right cursor-pointer"
          >
            <span className="font-headline-md text-2xl md:text-[26px] font-bold tracking-tight text-[#1f1b17] transition-colors group-hover:text-[#99411c]">
              آرک‌فایل
            </span>
            <span className="w-2 h-2 rounded-full bg-[#99411c] mb-1"></span>
          </button>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 font-label-lg text-sm">
            <button
              onClick={() => onNavigate('home')}
              className={`transition-colors py-1 cursor-pointer whitespace-nowrap ${
                currentScreen === 'home'
                  ? 'text-[#99411c] font-semibold border-b-2 border-[#99411c]'
                  : 'text-[#625e54] hover:text-[#99411c]'
              }`}
            >
              خانه
            </button>
            <button
              onClick={() => onNavigate('store')}
              className={`transition-colors py-1 cursor-pointer whitespace-nowrap ${
                currentScreen === 'store'
                  ? 'text-[#99411c] font-semibold border-b-2 border-[#99411c]'
                  : 'text-[#625e54] hover:text-[#99411c]'
              }`}
            >
              فروشگاه
            </button>
            <button
              onClick={() => onNavigate('categories')}
              className={`transition-colors py-1 cursor-pointer whitespace-nowrap ${
                currentScreen === 'categories'
                  ? 'text-[#99411c] font-semibold border-b-2 border-[#99411c]'
                  : 'text-[#625e54] hover:text-[#99411c]'
              }`}
            >
              دسته‌بندی‌ها
            </button>
            <button
              onClick={() => onNavigate('about')}
              className={`transition-colors py-1 cursor-pointer whitespace-nowrap ${
                currentScreen === 'about'
                  ? 'text-[#99411c] font-semibold border-b-2 border-[#99411c]'
                  : 'text-[#625e54] hover:text-[#99411c]'
              }`}
            >
              درباره ما
            </button>
            {user && (
              <button
                onClick={() => onNavigate('downloads')}
                className={`transition-colors py-1 cursor-pointer whitespace-nowrap ${
                  currentScreen === 'downloads'
                    ? 'text-[#99411c] font-semibold border-b-2 border-[#99411c]'
                    : 'text-[#625e54] hover:text-[#99411c]'
                }`}
              >
                آرشیو دانلود من
              </button>
            )}
          </nav>
        </div>

        {/* Zone 3: Actions */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          <button
            onClick={onOpenSearch}
            aria-label="جستجو در آرشیو"
            className="w-10 h-10 rounded-full flex items-center justify-center text-[#56423c] hover:bg-[#f6ece5] hover:text-[#1f1b17] transition-all cursor-pointer"
            title="جستجو (Ctrl + K)"
          >
            <span className="material-symbols-outlined text-[22px]">search</span>
          </button>

          <button
            onClick={onOpenCart}
            aria-label="سبد خرید"
            className="relative w-10 h-10 rounded-full flex items-center justify-center text-[#56423c] hover:bg-[#f6ece5] hover:text-[#1f1b17] transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[22px]">shopping_bag</span>
            <span className="absolute top-1 left-1 min-w-4 h-4 px-1 rounded-full bg-[#99411c] text-[#ffffff] font-label-sm text-[10px] leading-none flex items-center justify-center font-bold">
              {cartCount}
            </span>
          </button>

          {user ? (
            <button
              onClick={() => onNavigate('downloads')}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#f6ece5] hover:bg-[#ebe1da] transition-colors text-right cursor-pointer"
              title="پنل کاربری و فایل‌های خریداری‌شده"
            >
              <div className="w-7 h-7 rounded-full bg-[#99411c] text-white flex items-center justify-center text-xs font-bold">
                {user.name.slice(0, 1)}
              </div>
              <span className="hidden sm:inline font-label-md text-xs font-medium text-[#1f1b17]">
                {user.name}
              </span>
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={onOpenAuth}
                className="inline-flex items-center justify-center px-5 sm:px-6 py-2 rounded-full bg-[#99411c] text-[#ffffff] font-label-lg text-sm hover:bg-[#b85932] transition-colors shadow-none cursor-pointer"
              >
                ورود
              </button>
              <button
                onClick={onOpenAuth}
                className="w-8 h-8 rounded-full bg-[#99411c] hidden sm:flex items-center justify-center cursor-pointer text-white hover:bg-[#b85932] transition-colors"
                aria-label="پروفایل"
              >
                <span className="material-symbols-outlined text-white text-[18px]">person</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile sub-navigation bar */}
      <div className="md:hidden flex items-center justify-around border-t border-[#e9e2d5]/80 py-2 px-4 bg-[#fff8f5]">
        <button
          onClick={() => onNavigate('home')}
          className={`font-label-md text-xs px-2 py-1 ${
            currentScreen === 'home' ? 'text-[#99411c] font-bold' : 'text-[#625e54]'
          }`}
        >
          خانه
        </button>
        <button
          onClick={() => onNavigate('store')}
          className={`font-label-md text-xs px-2 py-1 ${
            currentScreen === 'store' ? 'text-[#99411c] font-bold' : 'text-[#625e54]'
          }`}
        >
          فروشگاه
        </button>
        <button
          onClick={() => onNavigate('categories')}
          className={`font-label-md text-xs px-2 py-1 ${
            currentScreen === 'categories' ? 'text-[#99411c] font-bold' : 'text-[#625e54]'
          }`}
        >
          دسته‌بندی‌ها
        </button>
        <button
          onClick={() => onNavigate('about')}
          className={`font-label-md text-xs px-2 py-1 ${
            currentScreen === 'about' ? 'text-[#99411c] font-bold' : 'text-[#625e54]'
          }`}
        >
          درباره ما
        </button>
      </div>
    </header>
  );
};
