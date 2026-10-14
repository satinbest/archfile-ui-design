<?php
if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly.
}

class Archfile_Hero_Widget extends \Elementor\Widget_Base {

    public function get_name() {
        return 'archfile_hero';
    }

    public function get_title() {
        return __( 'هیرو (Hero)', 'archfile' );
    }

    public function get_icon() {
        return 'fa fa-home';
    }

    public function get_categories() {
        return [ 'archfile-widgets' ];
    }

    protected function _register_controls() {
        $this->start_controls_section(
            'content_section',
            [
                'label' => __( 'محتوا', 'archfile' ),
                'tab'   => \Elementor\Controls_Manager::TAB_CONTENT,
            ]
        );

        $this->add_control(
            'badge_text',
            [
                'label'   => __( 'متن نشان', 'archfile' ),
                'type'    => \Elementor\Controls_Manager::TEXT,
                'default' => __( 'نسخه زمستان ۱۴۰۳ • بازتولید با دقت ابعادی', 'archfile' ),
            ]
        );

        $this->add_control(
            'title',
            [
                'label'   => __( 'عنوان اصلی', 'archfile' ),
                'type'    => \Elementor\Controls_Manager::TEXTAREA,
                'default' => __( "معماری در پرتوی نور\nو خلوص ناب فرم", 'archfile' ),
            ]
        );

        $this->add_control(
            'description',
            [
                'label'   => __( 'توضیحات', 'archfile' ),
                'type'    => \Elementor\Controls_Manager::TEXTAREA,
                'default' => __( 'مجموعه‌ای منتخب از مدل‌های فاخر رویت، تری‌دی‌مکس و تکسچرهای واقع‌گرایانه، طراحی‌شده برای معماران پیشرو و دفاتر خلاق با استانداردهای اجرایی بی‌نقص.', 'archfile' ),
            ]
        );

        $this->add_control(
            'button_1_text',
            [
                'label'   => __( 'متن دکمه اول', 'archfile' ),
                'type'    => \Elementor\Controls_Manager::TEXT,
                'default' => __( 'مشاهده فایل‌ها', 'archfile' ),
            ]
        );
        $this->add_control(
            'button_1_link',
            [
                'label' => __( 'لینک دکمه اول', 'archfile' ),
                'type'  => \Elementor\Controls_Manager::URL,
            ]
        );

        $this->add_control(
            'button_2_text',
            [
                'label'   => __( 'متن دکمه دوم', 'archfile' ),
                'type'    => \Elementor\Controls_Manager::TEXT,
                'default' => __( 'درباره آرشیو ما', 'archfile' ),
            ]
        );
        $this->add_control(
            'button_2_link',
            [
                'label' => __( 'لینک دکمه دوم', 'archfile' ),
                'type'  => \Elementor\Controls_Manager::URL,
            ]
        );

        $this->add_control(
            'main_image',
            [
                'label' => __( 'تصویر اصلی', 'archfile' ),
                'type' => \Elementor\Controls_Manager::MEDIA,
                'default' => [
                    'url' => \Elementor\Utils::get_placeholder_image_src(),
                ],
            ]
        );

        $this->add_control(
            'secondary_image',
            [
                'label' => __( 'تصویر فرعی', 'archfile' ),
                'type' => \Elementor\Controls_Manager::MEDIA,
                'default' => [
                    'url' => \Elementor\Utils::get_placeholder_image_src(),
                ],
            ]
        );

        $this->end_controls_section();
    }

    protected function render() {
        $settings = $this->get_settings_for_display();
        $title = str_replace("\n", "<br/>", esc_html($settings['title']));
        ?>
        <section class="w-full px-6 sm:px-8 md:px-16 pt-8 pb-12 md:pb-16 max-w-7xl mx-auto">
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                <!-- Editorial Content -->
                <div class="lg:col-span-6 flex flex-col justify-center items-start space-y-5 md:space-y-6 order-2 lg:order-1 text-right">
                    <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#e9e2d5] text-[#68645a]">
                        <span class="w-2 h-2 rounded-full bg-[#99411c]"></span>
                        <span class="font-label-md text-xs sm:text-[13px] font-medium">
                            <?php echo esc_html($settings['badge_text']); ?>
                        </span>
                    </div>

                    <h1 class="font-display-lg text-3xl sm:text-4xl lg:text-[54px] font-bold text-[#1f1b17] leading-[1.25] tracking-tight">
                        <?php echo wp_kses_post($title); ?>
                    </h1>

                    <p class="font-body-lg text-base sm:text-lg text-[#625e54] max-w-xl leading-relaxed font-light">
                        <?php echo esc_html($settings['description']); ?>
                    </p>

                    <div class="pt-2 flex flex-wrap items-center gap-4 sm:gap-6">
                        <?php if(!empty($settings['button_1_link']['url'])): ?>
                        <a href="<?php echo esc_url($settings['button_1_link']['url']); ?>" class="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-[#99411c] text-[#ffffff] font-label-lg text-sm sm:text-base shadow-sm hover:bg-[#b85932] transition-all duration-300 cursor-pointer active:scale-98">
                            <span><?php echo esc_html($settings['button_1_text']); ?></span>
                            <i class="isax isax-arrow-left-2 text-[18px] mr-2"></i>
                        </a>
                        <?php endif; ?>

                        <?php if(!empty($settings['button_2_link']['url'])): ?>
                        <a href="<?php echo esc_url($settings['button_2_link']['url']); ?>" class="inline-flex items-center gap-2 text-[#1f1b17] hover:text-[#99411c] font-label-lg text-sm sm:text-base transition-colors py-2 border-b border-[#dcc1b7] hover:border-[#99411c] cursor-pointer">
                            <span><?php echo esc_html($settings['button_2_text']); ?></span>
                            <i class="isax isax-arrow-left text-[18px]"></i>
                        </a>
                        <?php endif; ?>
                    </div>

                    <!-- Metric accents -->
                    <div class="pt-6 sm:pt-8 flex items-center gap-8 sm:gap-12">
                        <div class="flex flex-col">
                            <span class="font-headline-md text-2xl sm:text-3xl font-bold text-[#1f1b17]">۲٬۴۰۰+</span>
                            <span class="font-label-md text-xs sm:text-sm text-[#625e54]">دارایی سه‌بعدی بازبینی‌شده</span>
                        </div>
                        <div class="w-px h-10 bg-[#dcc1b7]/60"></div>
                        <div class="flex flex-col">
                            <span class="font-headline-md text-2xl sm:text-3xl font-bold text-[#1f1b17]">۱۰۰٪</span>
                            <span class="font-label-md text-xs sm:text-sm text-[#625e54]">سازگاری با موتورهای رندر</span>
                        </div>
                    </div>
                </div>

                <!-- Architectural Composition -->
                <div class="lg:col-span-6 relative flex justify-center lg:justify-end order-1 lg:order-2">
                    <div class="relative w-full max-w-[540px]">
                        <!-- Primary Main Villa Render -->
                        <div class="relative w-full h-[380px] sm:h-[480px] lg:h-[520px] rounded-[28px] overflow-hidden shadow-xl bg-[#f6ece5] group cursor-pointer">
                            <img src="<?php echo esc_url($settings['main_image']['url']); ?>" alt="Main Hero Image" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103" loading="eager" />
                            <div class="absolute inset-0 bg-gradient-to-t from-[#1f1b17]/40 via-transparent to-transparent pointer-events-none"></div>
                        </div>

                        <!-- Secondary Overlapping Detail Render -->
                        <div class="absolute -bottom-6 -right-6 w-44 sm:w-56 h-44 sm:h-56 rounded-[24px] overflow-hidden shadow-2xl bg-[#f6ece5] hidden sm:block border-4 border-[#fff8f5] group cursor-pointer transition-transform duration-300 hover:scale-105">
                            <img src="<?php echo esc_url($settings['secondary_image']['url']); ?>" alt="Secondary Hero Image" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                            <div class="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <?php
    }
}
