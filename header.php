<!DOCTYPE html>
<html <?php language_attributes(); ?> dir="rtl">
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php wp_head(); ?>
</head>
<body <?php body_class( 'bg-[#fff8f5] text-[#1f1b17] antialiased selection:bg-[#ffdbce] selection:text-[#370e00]' ); ?>>
    <?php wp_body_open(); ?>

<header class="fixed top-0 w-full z-40 bg-[#fff8f5]/90 backdrop-blur-xl border-b border-[#e9e2d5]/60 shadow-[0_1px_8px_rgba(43,38,34,0.03)]">
    <div class="h-20 w-full px-6 sm:px-8 md:px-16 flex items-center justify-between max-w-7xl mx-auto">
        <!-- Zone 1: Brand Wordmark -->
        <div class="flex items-center gap-8">
            <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="flex items-center gap-1 group text-right cursor-pointer">
                <span class="font-headline-md text-2xl md:text-[26px] font-bold tracking-tight text-[#1f1b17] transition-colors group-hover:text-[#99411c]">
                    آرک‌فایل
                </span>
                <span class="w-2 h-2 rounded-full bg-[#99411c] mb-1"></span>
            </a>

            <!-- Zone 2: Navigation Links -->
            <nav class="hidden md:flex items-center gap-6 lg:gap-8 font-label-lg text-sm">
                <?php
                wp_nav_menu( array(
                    'theme_location' => 'primary',
                    'container'      => false,
                    'menu_class'     => 'flex items-center gap-6 lg:gap-8 font-label-lg text-sm',
                    'fallback_cb'    => false,
                    'items_wrap'     => '<ul id="%1$s" class="%2$s">%3$s</ul>',
                    'link_before'    => '<span class="text-[#625e54] hover:text-[#99411c] transition-colors py-1 cursor-pointer whitespace-nowrap">',
                    'link_after'     => '</span>',
                ) );
                ?>
                <!-- For static conversion we keep the old style as fallback if no menu -->
                <?php if ( ! has_nav_menu( 'primary' ) ) : ?>
                    <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="transition-colors py-1 cursor-pointer whitespace-nowrap text-[#99411c] font-semibold border-b-2 border-[#99411c]">خانه</a>
                    <a href="#" class="transition-colors py-1 cursor-pointer whitespace-nowrap text-[#625e54] hover:text-[#99411c]">فروشگاه</a>
                    <a href="#" class="transition-colors py-1 cursor-pointer whitespace-nowrap text-[#625e54] hover:text-[#99411c]">دسته‌بندی‌ها</a>
                    <a href="#" class="transition-colors py-1 cursor-pointer whitespace-nowrap text-[#625e54] hover:text-[#99411c]">درباره ما</a>
                <?php endif; ?>
            </nav>
        </div>

        <!-- Zone 3: Actions -->
        <div class="flex items-center gap-2 sm:gap-4 shrink-0">
            <button aria-label="جستجو در آرشیو" class="w-10 h-10 rounded-full flex items-center justify-center text-[#56423c] hover:bg-[#f6ece5] hover:text-[#1f1b17] transition-all cursor-pointer" title="جستجو">
                <i class="isax isax-search-normal-1 text-[22px]"></i>
            </button>

            <button aria-label="سبد خرید" class="relative w-10 h-10 rounded-full flex items-center justify-center text-[#56423c] hover:bg-[#f6ece5] hover:text-[#1f1b17] transition-all cursor-pointer">
                <i class="isax isax-shopping-bag text-[22px]"></i>
                <span class="absolute top-1 left-1 min-w-4 h-4 px-1 rounded-full bg-[#99411c] text-[#ffffff] font-label-sm text-[10px] leading-none flex items-center justify-center font-bold">
                    0
                </span>
            </button>

            <?php if ( is_user_logged_in() ) :
                $current_user = wp_get_current_user();
                $first_letter = mb_substr( $current_user->display_name, 0, 1, 'utf-8' );
            ?>
                <a href="<?php echo esc_url( get_dashboard_url() ); ?>" class="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#f6ece5] hover:bg-[#ebe1da] transition-colors text-right cursor-pointer" title="پنل کاربری">
                    <div class="w-7 h-7 rounded-full bg-[#99411c] text-white flex items-center justify-center text-xs font-bold">
                        <?php echo esc_html( $first_letter ); ?>
                    </div>
                    <span class="hidden sm:inline font-label-md text-xs font-medium text-[#1f1b17]">
                        <?php echo esc_html( $current_user->display_name ); ?>
                    </span>
                </a>
            <?php else : ?>
                <div class="flex items-center gap-2">
                    <a href="<?php echo esc_url( wp_login_url() ); ?>" class="inline-flex items-center justify-center px-5 sm:px-6 py-2 rounded-full bg-[#99411c] text-[#ffffff] font-label-lg text-sm hover:bg-[#b85932] transition-colors shadow-none cursor-pointer">
                        ورود
                    </a>
                    <a href="<?php echo esc_url( wp_login_url() ); ?>" class="w-8 h-8 rounded-full bg-[#99411c] hidden sm:flex items-center justify-center cursor-pointer text-white hover:bg-[#b85932] transition-colors" aria-label="پروفایل">
                        <i class="isax isax-profile-circle text-white text-[18px]"></i>
                    </a>
                </div>
            <?php endif; ?>
        </div>
    </div>

    <!-- Mobile sub-navigation bar -->
    <div class="md:hidden flex items-center justify-around border-t border-[#e9e2d5]/80 py-2 px-4 bg-[#fff8f5]">
        <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="font-label-md text-xs px-2 py-1 text-[#99411c] font-bold">
            خانه
        </a>
        <a href="#" class="font-label-md text-xs px-2 py-1 text-[#625e54]">
            فروشگاه
        </a>
        <a href="#" class="font-label-md text-xs px-2 py-1 text-[#625e54]">
            دسته‌بندی‌ها
        </a>
        <a href="#" class="font-label-md text-xs px-2 py-1 text-[#625e54]">
            درباره ما
        </a>
    </div>
</header>
