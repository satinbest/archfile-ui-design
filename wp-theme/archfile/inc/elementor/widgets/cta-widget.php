<?php
if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly.
}

class Archfile_CTA_Widget extends \Elementor\Widget_Base {

    public function get_name() {
        return 'archfile_cta';
    }

    public function get_title() {
        return __( 'بنر دعوت به اقدام (CTA)', 'archfile' );
    }

    public function get_icon() {
        return 'fa fa-bullhorn';
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
                'default' => __( 'طراحی را به سطح بعدی ببرید', 'archfile' ),
            ]
        );

        $this->add_control(
            'description',
            [
                'label'   => __( 'توضیحات', 'archfile' ),
                'type'    => \Elementor\Controls_Manager::TEXTAREA,
                'default' => __( 'با دسترسی به آرشیو پریمیوم ما، سرعت و کیفیت پروژه‌های معماری خود را متحول کنید.', 'archfile' ),
            ]
        );

        $this->add_control(
            'button_text',
            [
                'label'   => __( 'متن دکمه', 'archfile' ),
                'type'    => \Elementor\Controls_Manager::TEXT,
                'default' => __( 'شروع جستجو در آرشیو', 'archfile' ),
            ]
        );

        $this->add_control(
            'button_link',
            [
                'label' => __( 'لینک دکمه', 'archfile' ),
                'type'  => \Elementor\Controls_Manager::URL,
            ]
        );

        $this->end_controls_section();
    }

    protected function render() {
        $settings = $this->get_settings_for_display();
        ?>
        <section class="w-full px-6 sm:px-8 md:px-16 py-12 md:py-20 max-w-7xl mx-auto">
            <div class="w-full rounded-[32px] bg-[#1f1b17] overflow-hidden relative text-center py-16 md:py-24 px-6 shadow-2xl">
                <!-- Architectural background noise/texture effect -->
                <div class="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.8)_0,transparent_1px)] bg-[size:24px_24px]"></div>

                <!-- Warm ambient glow -->
                <div class="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-[#99411c]/20 blur-[80px] rounded-full pointer-events-none"></div>

                <div class="relative z-10 flex flex-col items-center max-w-2xl mx-auto">
                    <span class="inline-block px-3 py-1 rounded-full bg-[#352f2b] text-[#dcc1b7] font-label-md text-xs mb-6 border border-[#56423c]/50">
                        Atelier Studio Collection
                    </span>

                    <h2 class="font-display-md text-3xl sm:text-4xl md:text-[42px] font-bold text-[#ffffff] mb-6 leading-tight">
                        <?php echo esc_html($settings['title']); ?>
                    </h2>

                    <p class="font-body-md text-sm sm:text-base text-[#e9e2d5] opacity-80 mb-10 max-w-lg font-light leading-relaxed">
                        <?php echo esc_html($settings['description']); ?>
                    </p>

                    <?php if(!empty($settings['button_link']['url'])): ?>
                    <a href="<?php echo esc_url($settings['button_link']['url']); ?>" class="inline-flex items-center justify-center px-8 py-4 rounded-full bg-[#99411c] text-[#ffffff] font-label-lg text-sm sm:text-base hover:bg-[#b85932] hover:scale-105 transition-all duration-300 shadow-[0_4px_20px_rgba(153,65,28,0.3)] cursor-pointer">
                        <?php echo esc_html($settings['button_text']); ?>
                    </a>
                    <?php endif; ?>
                </div>
            </div>
        </section>
        <?php
    }
}
