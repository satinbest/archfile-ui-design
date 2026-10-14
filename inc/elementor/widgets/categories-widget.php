<?php
if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly.
}

class Archfile_Categories_Widget extends \Elementor\Widget_Base {

    public function get_name() {
        return 'archfile_categories';
    }

    public function get_title() {
        return __( 'دسته‌بندی‌ها (Categories)', 'archfile' );
    }

    public function get_icon() {
        return 'fa fa-th-large';
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
            'subtitle',
            [
                'label'   => __( 'زیرعنوان', 'archfile' ),
                'type'    => \Elementor\Controls_Manager::TEXT,
                'default' => __( 'دسته‌بندی‌های آرشیو', 'archfile' ),
            ]
        );

        $this->add_control(
            'title',
            [
                'label'   => __( 'عنوان', 'archfile' ),
                'type'    => \Elementor\Controls_Manager::TEXT,
                'default' => __( 'دسته‌بندی دارایی‌های معمارانه', 'archfile' ),
            ]
        );

        $this->add_control(
            'view_all_text',
            [
                'label'   => __( 'متن مشاهده همه', 'archfile' ),
                'type'    => \Elementor\Controls_Manager::TEXT,
                'default' => __( 'مشاهده همه بخش‌ها', 'archfile' ),
            ]
        );

        $this->add_control(
            'view_all_link',
            [
                'label' => __( 'لینک مشاهده همه', 'archfile' ),
                'type'  => \Elementor\Controls_Manager::URL,
            ]
        );

        $repeater = new \Elementor\Repeater();

        $repeater->add_control(
            'cat_title',
            [
                'label'   => __( 'عنوان', 'archfile' ),
                'type'    => \Elementor\Controls_Manager::TEXT,
                'default' => __( 'معماری داخلی', 'archfile' ),
            ]
        );
        $repeater->add_control(
            'cat_desc',
            [
                'label'   => __( 'توضیح کوتاه', 'archfile' ),
                'type'    => \Elementor\Controls_Manager::TEXT,
                'default' => __( 'مدل‌های آماده فضاهای داخلی', 'archfile' ),
            ]
        );
        $repeater->add_control(
            'cat_count',
            [
                'label'   => __( 'تعداد / لیبل', 'archfile' ),
                'type'    => \Elementor\Controls_Manager::TEXT,
                'default' => __( '۳۵۰+ فایل', 'archfile' ),
            ]
        );
        $repeater->add_control(
            'cat_link',
            [
                'label' => __( 'لینک', 'archfile' ),
                'type'  => \Elementor\Controls_Manager::URL,
            ]
        );
        $repeater->add_control(
            'cat_image',
            [
                'label' => __( 'تصویر', 'archfile' ),
                'type' => \Elementor\Controls_Manager::MEDIA,
                'default' => [
                    'url' => \Elementor\Utils::get_placeholder_image_src(),
                ],
            ]
        );

        $this->add_control(
            'categories',
            [
                'label'   => __( 'آیتم‌های دسته‌بندی', 'archfile' ),
                'type'    => \Elementor\Controls_Manager::REPEATER,
                'fields'  => $repeater->get_controls(),
                'title_field' => '{{{ cat_title }}}',
            ]
        );

        $this->end_controls_section();
    }

    protected function render() {
        $settings = $this->get_settings_for_display();
        ?>
        <section class="w-full px-6 sm:px-8 md:px-16 py-10 md:py-16 max-w-7xl mx-auto">
            <div class="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 text-right">
                <div class="flex flex-col">
                    <span class="font-label-md text-xs sm:text-sm text-[#99411c] font-semibold mb-1">
                        <?php echo esc_html($settings['subtitle']); ?>
                    </span>
                    <h2 class="font-headline-lg text-2xl sm:text-3xl font-bold text-[#1f1b17]">
                        <?php echo esc_html($settings['title']); ?>
                    </h2>
                </div>

                <?php if(!empty($settings['view_all_link']['url'])): ?>
                <a href="<?php echo esc_url($settings['view_all_link']['url']); ?>" class="font-label-lg text-sm text-[#625e54] hover:text-[#99411c] transition-colors flex items-center gap-1 self-start md:self-auto cursor-pointer group">
                    <span><?php echo esc_html($settings['view_all_text']); ?></span>
                    <i class="isax isax-arrow-left-2 text-[18px] transition-transform group-hover:-translate-x-1"></i>
                </a>
                <?php endif; ?>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <?php foreach($settings['categories'] as $cat):
                    $link = !empty($cat['cat_link']['url']) ? esc_url($cat['cat_link']['url']) : '#';
                ?>
                <a href="<?php echo $link; ?>" class="group relative h-[380px] rounded-[24px] overflow-hidden shadow-sm bg-[#f6ece5] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-lg text-right cursor-pointer w-full block">
                    <img src="<?php echo esc_url($cat['cat_image']['url']); ?>" alt="<?php echo esc_attr($cat['cat_title']); ?>" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                    <div class="absolute inset-0 bg-gradient-to-t from-[#1f1b17]/85 via-[#1f1b17]/30 to-transparent"></div>

                    <div class="absolute bottom-0 right-0 left-0 p-5 sm:p-6 flex flex-col justify-end text-[#fff8f5]">
                        <span class="font-label-sm text-xs opacity-80 mb-1 font-medium">
                            <?php echo esc_html($cat['cat_count']); ?>
                        </span>
                        <h3 class="font-headline-sm text-xl sm:text-[22px] font-bold text-white mb-1.5 leading-snug">
                            <?php echo esc_html($cat['cat_title']); ?>
                        </h3>
                        <p class="font-body-sm text-xs sm:text-[13px] opacity-90 line-clamp-1 font-light leading-relaxed">
                            <?php echo esc_html($cat['cat_desc']); ?>
                        </p>

                        <div class="mt-3 pt-3 border-t border-white/20 flex items-center justify-between text-xs text-white/80 opacity-0 group-hover:opacity-100 transition-opacity">
                            <span>ورود به آرشیو <?php echo esc_html($cat['cat_title']); ?></span>
                            <i class="isax isax-arrow-left text-sm"></i>
                        </div>
                    </div>
                </a>
                <?php endforeach; ?>
            </div>
        </section>
        <?php
    }
}
