<?php
if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly.
}

class Archfile_Featured_Files_Widget extends \Elementor\Widget_Base {

    public function get_name() {
        return 'archfile_featured_files';
    }

    public function get_title() {
        return __( 'فایل‌های منتخب (Featured Files)', 'archfile' );
    }

    public function get_icon() {
        return 'fa fa-star';
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
                'default' => __( 'پیشنهاد سردبیر', 'archfile' ),
            ]
        );

        $this->add_control(
            'title',
            [
                'label'   => __( 'عنوان', 'archfile' ),
                'type'    => \Elementor\Controls_Manager::TEXT,
                'default' => __( 'فایل‌های منتخب این فصل', 'archfile' ),
            ]
        );

        $repeater = new \Elementor\Repeater();

        $repeater->add_control(
            'file_title',
            [
                'label'   => __( 'عنوان فایل', 'archfile' ),
                'type'    => \Elementor\Controls_Manager::TEXT,
            ]
        );
        $repeater->add_control(
            'file_software',
            [
                'label'   => __( 'نرم‌افزار (مثلاً Revit 2024)', 'archfile' ),
                'type'    => \Elementor\Controls_Manager::TEXT,
            ]
        );
        $repeater->add_control(
            'file_price',
            [
                'label'   => __( 'قیمت (مثلاً ۲۵۰٬۰۰۰ تومان)', 'archfile' ),
                'type'    => \Elementor\Controls_Manager::TEXT,
            ]
        );
        $repeater->add_control(
            'file_image',
            [
                'label' => __( 'تصویر فایل', 'archfile' ),
                'type' => \Elementor\Controls_Manager::MEDIA,
            ]
        );
        $repeater->add_control(
            'file_link',
            [
                'label' => __( 'لینک فایل', 'archfile' ),
                'type'  => \Elementor\Controls_Manager::URL,
            ]
        );

        $this->add_control(
            'files',
            [
                'label'   => __( 'لیست فایل‌ها', 'archfile' ),
                'type'    => \Elementor\Controls_Manager::REPEATER,
                'fields'  => $repeater->get_controls(),
                'title_field' => '{{{ file_title }}}',
            ]
        );

        $this->end_controls_section();
    }

    protected function render() {
        $settings = $this->get_settings_for_display();
        ?>
        <section class="w-full px-6 sm:px-8 md:px-16 py-10 md:py-16 max-w-7xl mx-auto bg-[#ffffff]">
            <div class="flex flex-col mb-8 text-right">
                <span class="font-label-md text-xs sm:text-sm text-[#99411c] font-semibold mb-1">
                    <?php echo esc_html($settings['subtitle']); ?>
                </span>
                <h2 class="font-headline-lg text-2xl sm:text-3xl font-bold text-[#1f1b17]">
                    <?php echo esc_html($settings['title']); ?>
                </h2>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                <?php foreach($settings['files'] as $file):
                    $link = !empty($file['file_link']['url']) ? esc_url($file['file_link']['url']) : '#';
                ?>
                <div class="group flex flex-col gap-3">
                    <a href="<?php echo $link; ?>" class="relative w-full aspect-[4/3] rounded-[20px] overflow-hidden bg-[#f6ece5] cursor-pointer">
                        <img src="<?php echo esc_url($file['file_image']['url']); ?>" alt="<?php echo esc_attr($file['file_title']); ?>" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                        <div class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                        <div class="absolute top-3 right-3 flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity -translate-y-2 group-hover:translate-y-0 duration-300">
                            <button class="w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-[#1f1b17] hover:bg-[#99411c] hover:text-white transition-colors shadow-sm" title="افزودن به سبد خرید">
                                <i class="isax isax-shopping-cart text-[18px]"></i>
                            </button>
                        </div>
                    </a>

                    <div class="flex flex-col gap-1 text-right px-1">
                        <div class="flex items-center justify-between">
                            <span class="font-label-sm text-[11px] text-[#625e54] bg-[#e9e2d5]/50 px-2 py-0.5 rounded-full">
                                <?php echo esc_html($file['file_software']); ?>
                            </span>
                            <span class="font-label-md text-xs sm:text-sm text-[#1f1b17] font-semibold">
                                <?php echo esc_html($file['file_price']); ?>
                            </span>
                        </div>
                        <a href="<?php echo $link; ?>" class="font-headline-sm text-sm sm:text-base font-bold text-[#1f1b17] group-hover:text-[#99411c] transition-colors line-clamp-1 mt-1">
                            <?php echo esc_html($file['file_title']); ?>
                        </a>
                    </div>
                </div>
                <?php endforeach; ?>
            </div>
        </section>
        <?php
    }
}
