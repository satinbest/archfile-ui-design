<?php
if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly.
}

class Archfile_Software_Strip_Widget extends \Elementor\Widget_Base {

    public function get_name() {
        return 'archfile_software_strip';
    }

    public function get_title() {
        return __( 'نوار نرم‌افزارها (Software Strip)', 'archfile' );
    }

    public function get_icon() {
        return 'fa fa-ellipsis-h';
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
                'default' => __( 'سازگار با محیط‌های نرم‌افزاری استاندارد:', 'archfile' ),
            ]
        );

        $repeater = new \Elementor\Repeater();
        $repeater->add_control(
            'software_name',
            [
                'label'   => __( 'نام نرم‌افزار', 'archfile' ),
                'type'    => \Elementor\Controls_Manager::TEXT,
                'default' => __( 'Revit', 'archfile' ),
            ]
        );
        $repeater->add_control(
            'software_link',
            [
                'label' => __( 'لینک', 'archfile' ),
                'type'  => \Elementor\Controls_Manager::URL,
            ]
        );

        $this->add_control(
            'software_list',
            [
                'label'   => __( 'لیست نرم‌افزارها', 'archfile' ),
                'type'    => \Elementor\Controls_Manager::REPEATER,
                'fields'  => $repeater->get_controls(),
                'default' => [
                    [ 'software_name' => 'Autodesk Revit' ],
                    [ 'software_name' => '3ds Max' ],
                    [ 'software_name' => 'V-Ray' ],
                    [ 'software_name' => 'Corona' ],
                    [ 'software_name' => 'Lumion' ],
                ],
                'title_field' => '{{{ software_name }}}',
            ]
        );

        $this->end_controls_section();
    }

    protected function render() {
        $settings = $this->get_settings_for_display();
        ?>
        <section class="w-full px-6 sm:px-8 md:px-16 py-4 md:py-6 max-w-7xl mx-auto">
            <div class="w-full rounded-[24px] bg-[#fcf2eb] border border-[#e9e2d5]/60 px-6 sm:px-8 py-5 sm:py-6 flex flex-wrap items-center justify-between gap-y-4 gap-x-6">
                <div class="flex items-center gap-2 text-[#625e54]">
                    <i class="isax isax-setting-2 text-[20px] text-[#99411c]"></i>
                    <span class="font-label-md text-xs sm:text-sm font-medium">
                        <?php echo esc_html( $settings['title'] ); ?>
                    </span>
                </div>

                <div class="flex flex-wrap items-center gap-x-4 sm:gap-x-6 md:gap-x-8 gap-y-2 font-label-lg text-xs sm:text-sm text-[#56423c] tracking-wider">
                    <?php
                    $list = $settings['software_list'];
                    $count = count( $list );
                    foreach ( $list as $index => $item ) {
                        $link = !empty($item['software_link']['url']) ? esc_url($item['software_link']['url']) : '#';
                        ?>
                        <a href="<?php echo $link; ?>" class="transition-colors cursor-pointer hover:text-[#99411c] font-medium">
                            <?php echo esc_html( $item['software_name'] ); ?>
                        </a>
                        <?php if ( $index < $count - 1 ) : ?>
                            <span class="text-[#dcc1b7] select-none">•</span>
                        <?php endif; ?>
                        <?php
                    }
                    ?>
                </div>
            </div>
        </section>
        <?php
    }
}
