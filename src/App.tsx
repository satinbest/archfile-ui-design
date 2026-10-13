import React, { useState, useEffect } from 'react';
import { ArchAsset, CartItem, UserAccount, AssetCategory } from './types';
import { ASSETS_DATA } from './data/mockAssets';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { SoftwareStrip } from './components/SoftwareStrip';
import { CategoriesSection } from './components/CategoriesSection';
import { FeaturedFilesSection } from './components/FeaturedFilesSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { CallToActionBanner } from './components/CallToActionBanner';
import { StoreView } from './components/StoreView';
import { CategoriesView } from './components/CategoriesView';
import { AboutView } from './components/AboutView';
import { DownloadsView } from './components/DownloadsView';
import { AssetDetailModal } from './components/AssetDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { SearchModal } from './components/SearchModal';
import { AuthModal } from './components/AuthModal';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<string>('home');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedAssetId, setSelectedAssetId] = useState<string | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutDiscount, setCheckoutDiscount] = useState(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Filter state passed to Store when navigating from specific sections
  const [storeCategoryFilter, setStoreCategoryFilter] = useState<string>('all');
  const [storeSoftwareFilter, setStoreSoftwareFilter] = useState<string>('all');

  // User account state
  const [user, setUser] = useState<UserAccount | null>({
    name: 'مهندس آرش شمس',
    email: 'arash.shams@archstudio.ir',
    phone: '۰۹۱۲۹۸۷۶۵۴۳',
    role: 'طراح ارشد معماری',
    purchasedAssetIds: ['lavasan-villa'],
    joinedDate: 'پاییز ۱۴۰۳',
  });

  // Purchased assets ids
  const [purchasedAssetIds, setPurchasedAssetIds] = useState<string[]>(['lavasan-villa']);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  const handleNavigate = (screen: string) => {
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Keyboard shortcut for search (Ctrl+K or Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Cart operations
  const handleAddToCart = (asset: ArchAsset) => {
    setCartItems((prev) => {
      if (prev.some((item) => item.asset.id === asset.id)) {
        showToast(`«${asset.title}» در سبد خرید شما موجود است`);
        return prev;
      }
      showToast(`«${asset.title}» به سبد خرید افزوده شد`);
      return [...prev, { asset, addedAt: new Date() }];
    });
  };

  const handleRemoveFromCart = (assetId: string) => {
    setCartItems((prev) => prev.filter((item) => item.asset.id !== assetId));
    showToast('فایل از سبد خرید حذف شد');
  };

  const handleProceedToCheckout = (discountPercent: number) => {
    setCheckoutDiscount(discountPercent);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handlePaymentSuccess = (purchasedIds: string[]) => {
    setPurchasedAssetIds((prev) => Array.from(new Set([...prev, ...purchasedIds])));
    setCartItems([]);
    if (user) {
      setUser({
        ...user,
        purchasedAssetIds: Array.from(new Set([...user.purchasedAssetIds, ...purchasedIds])),
      });
    }
    showToast('پرداخت تایید شد و دارایی‌ها به پنل دانلود اضافه شدند!');
    setTimeout(() => {
      setIsCheckoutOpen(false);
      handleNavigate('downloads');
    }, 1800);
  };

  const handleInstantBuy = (asset: ArchAsset) => {
    // Add to cart if not present and open checkout immediately
    if (!cartItems.some((item) => item.asset.id === asset.id)) {
      setCartItems((prev) => [...prev, { asset, addedAt: new Date() }]);
    }
    setSelectedAssetId(null);
    setCheckoutDiscount(0);
    setIsCheckoutOpen(true);
  };

  // Navigation handlers with filters
  const handleSelectCategoryFromHome = (categoryId: AssetCategory) => {
    setStoreCategoryFilter(categoryId);
    setStoreSoftwareFilter('all');
    handleNavigate('store');
  };

  const handleSelectSoftwareFromStrip = (software: string) => {
    setStoreSoftwareFilter(software);
    setStoreCategoryFilter('all');
    handleNavigate('store');
  };

  const selectedAsset = ASSETS_DATA.find((a) => a.id === selectedAssetId) || null;
  const heroAsset = ASSETS_DATA[0]; // lavasan villa

  const purchasedAssetsList = ASSETS_DATA.filter((a) => purchasedAssetIds.includes(a.id));
  const cartAssetIds = cartItems.map((item) => item.asset.id);

  return (
    <div className="min-h-screen bg-[#fff8f5] text-[#1f1b17] flex flex-col selection:bg-[#ffdbce] selection:text-[#370e00]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#1f1b17] text-[#fff8f5] px-5 py-2.5 rounded-full shadow-2xl text-xs sm:text-sm font-medium animate-bounce flex items-center gap-2 border border-[#dcc1b7]/40">
          <span className="material-symbols-outlined text-[#99411c] text-[18px]">info</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Global Navigation Header */}
      <Header
        currentScreen={currentScreen}
        onNavigate={handleNavigate}
        cartCount={cartItems.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        user={user}
      />

      {/* Main Content Area */}
      <main className="w-full pt-20 md:pt-24 flex-grow">
        {currentScreen === 'home' && (
          <div className="flex flex-col w-full animate-fade-in">
            {/* 1. Hero Section */}
            <Hero
              onExploreClick={() => handleNavigate('store')}
              onAboutClick={() => handleNavigate('about')}
              onSelectAsset={(id) => setSelectedAssetId(id)}
              heroAsset={heroAsset}
            />

            {/* 2. Software Compatibility Strip */}
            <SoftwareStrip onSelectSoftware={handleSelectSoftwareFromStrip} />

            {/* 3. Categories (4 tall aesthetic cards) */}
            <CategoriesSection
              onSelectCategory={handleSelectCategoryFromHome}
              onViewAllClick={() => handleNavigate('categories')}
            />

            {/* 4. Featured Files this Season (4 clean cards) */}
            <FeaturedFilesSection
              assets={ASSETS_DATA}
              onSelectAsset={(id) => setSelectedAssetId(id)}
              onAddToCart={handleAddToCart}
              cartAssetIds={cartAssetIds}
            />

            {/* 5. How It Works (3 calm steps) */}
            <HowItWorksSection />

            {/* 6. Call To Action Atelier Studio Banner */}
            <CallToActionBanner onExploreClick={() => handleNavigate('store')} />
          </div>
        )}

        {currentScreen === 'store' && (
          <div className="animate-fade-in">
            <StoreView
              assets={ASSETS_DATA}
              onSelectAsset={(id) => setSelectedAssetId(id)}
              onAddToCart={handleAddToCart}
              cartAssetIds={cartAssetIds}
              initialCategory={storeCategoryFilter}
              initialSoftware={storeSoftwareFilter}
            />
          </div>
        )}

        {currentScreen === 'categories' && (
          <div className="animate-fade-in">
            <CategoriesView
              onSelectCategoryFilter={(catId) => {
                setStoreCategoryFilter(catId);
                handleNavigate('store');
              }}
              onSelectAsset={(id) => setSelectedAssetId(id)}
            />
          </div>
        )}

        {currentScreen === 'about' && (
          <div className="animate-fade-in">
            <AboutView />
          </div>
        )}

        {currentScreen === 'downloads' && (
          <div className="animate-fade-in">
            <DownloadsView
              user={user}
              purchasedAssets={purchasedAssetsList}
              onSelectAsset={(id) => setSelectedAssetId(id)}
              onExploreClick={() => handleNavigate('store')}
              onOpenAuth={() => setIsAuthOpen(true)}
            />
          </div>
        )}
      </main>

      {/* Global Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Modals & Overlays */}
      <AssetDetailModal
        asset={selectedAsset}
        onClose={() => setSelectedAssetId(null)}
        onAddToCart={handleAddToCart}
        onInstantBuy={handleInstantBuy}
        isInCart={selectedAsset ? cartAssetIds.includes(selectedAsset.id) : false}
        isPurchased={selectedAsset ? purchasedAssetIds.includes(selectedAsset.id) : false}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onRemoveItem={handleRemoveFromCart}
        onProceedToCheckout={handleProceedToCheckout}
        onExploreClick={() => handleNavigate('store')}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        discountPercent={checkoutDiscount}
        user={user}
        onPaymentSuccess={handlePaymentSuccess}
        onOpenAuth={() => setIsAuthOpen(true)}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        assets={ASSETS_DATA}
        onSelectAsset={(id) => setSelectedAssetId(id)}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={(newUser) => {
          setUser(newUser);
          setPurchasedAssetIds((prev) => Array.from(new Set([...prev, ...newUser.purchasedAssetIds])));
          showToast(`خوش آمدید، ${newUser.name}`);
        }}
      />
    </div>
  );
}
