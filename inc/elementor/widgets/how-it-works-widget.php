<?php
if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly.
}

class Archfile_How_It_Works_Widget extends \Elementor\Widget_Base {

    public function get_name() {
        return 'archfile_how_it_works';
    }

    public function get_title() {
        return __( 'چگونه کار می‌کند (How it Works)', 'archfile' );
    }

    public function get_icon() {
        return 'fa fa-list-ol';
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
            'title',
            [
                'label'   => __( 'عنوان', 'archfile' ),
                'type'    => \Elementor\Controls_Manager::TEXT,
                'default' => __( 'گردش کار یکپارچه', 'archfile' ),
            ]
        );

        $repeater = new \Elementor\Repeater();

        $repeater->add_control(
            'step_icon',
            [
                'label' => __( 'کلاس آیکون (Iconsax)', 'archfile' ),
                'type' => \Elementor\Controls_Manager::TEXT,
                'default' => 'isax-search-normal',
            ]
        );
        $repeater->add_control(
            'step_title',
            [
                'label'   => __( 'عنوان مرحله', 'archfile' ),
                'type'    => \Elementor\Controls_Manager::TEXT,
            ]
        );
        $repeater->add_control(
            'step_desc',
            [
                'label'   => __( 'توضیحات مرحله', 'archfile' ),
                'type'    => \Elementor\Controls_Manager::TEXTAREA,
            ]
        );

        $this->add_control(
            'steps',
            [
                'label'   => __( 'مراحل', 'archfile' ),
                'type'    => \Elementor\Controls_Manager::REPEATER,
                'fields'  => $repeater->get_controls(),
                'default' => [
                    [
                        'step_icon' => 'isax-search-normal',
                        'step_title' => '۱. جستجو و انتخاب',
                        'step_desc' => 'فایل مورد نیاز خود را با استفاده از فیلترهای دقیق پیدا کنید.',
                    ],
                    [
                        'step_icon' => 'isax-card',
                        'step_title' => '۲. پرداخت امن',
                        'step_desc' => 'با درگاه‌های معتبر بانکی و بدون کارمزد پنهان پرداخت کنید.',
                    ],
                    [
                        'step_icon' => 'isax-document-download',
                        'step_title' => '۳. دانلود و استفاده',
                        'step_desc' => 'فایل بلافاصله در پنل شما قرار گرفته و آماده استفاده در پروژه است.',
                    ],
                ],
                'title_field' => '{{{ step_title }}}',
            ]
        );

        $this->end_controls_section();
    }

    protected function render() {
        $settings = $this->get_settings_for_display();
        ?>
        <section class="w-full bg-[#fcf2eb] py-12 md:py-20 mt-8 border-y border-[#e9e2d5]/60">
            <div class="px-6 sm:px-8 md:px-16 max-w-7xl mx-auto">
                <div class="text-center mb-12">
                    <h2 class="font-headline-lg text-2xl sm:text-3xl font-bold text-[#1f1b17]">
                        <?php echo esc_html($settings['title']); ?>
                    </h2>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12 relative">
                    <!-- Subtle connecting line for desktop -->
                    <div class="hidden sm:block absolute top-8 right-[15%] left-[15%] h-px bg-gradient-to-r from-transparent via-[#dcc1b7] to-transparent"></div>

                    <?php foreach($settings['steps'] as $step): ?>
                    <div class="flex flex-col items-center text-center gap-4 relative z-10">
                        <div class="w-16 h-16 rounded-2xl bg-[#fff8f5] border border-[#dcc1b7]/40 flex items-center justify-center text-[#99411c] shadow-sm">
                            <i class="isax <?php echo esc_attr($step['step_icon']); ?> text-[28px]"></i>
                        </div>
                        <h3 class="font-headline-sm text-lg sm:text-xl font-bold text-[#1f1b17]">
                            <?php echo esc_html($step['step_title']); ?>
                        </h3>
                        <p class="font-body-sm text-sm text-[#625e54] max-w-xs font-light leading-relaxed">
                            <?php echo esc_html($step['step_desc']); ?>
                        </p>
                    </div>
                    <?php endforeach; ?>
                </div>
            </div>
        </section>
        <?php
    }
}
