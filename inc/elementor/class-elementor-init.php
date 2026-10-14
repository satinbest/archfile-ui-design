<?php
if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly.
}

class Archfile_Elementor_Init {

    public function __construct() {
        add_action( 'elementor/elements/categories_registered', [ $this, 'register_widget_categories' ] );
        add_action( 'elementor/widgets/register', [ $this, 'register_widgets' ] );
    }

    public function register_widget_categories( $elements_manager ) {
        $elements_manager->add_category(
            'archfile-widgets',
            [
                'title' => __( 'ابزارک‌های آرک‌فایل', 'archfile' ),
                'icon'  => 'fa fa-plug',
            ]
        );
    }

    public function register_widgets( $widgets_manager ) {
        require_once( __DIR__ . '/widgets/hero-widget.php' );
        require_once( __DIR__ . '/widgets/software-strip-widget.php' );
        require_once( __DIR__ . '/widgets/categories-widget.php' );
        require_once( __DIR__ . '/widgets/featured-files-widget.php' );
        require_once( __DIR__ . '/widgets/how-it-works-widget.php' );
        require_once( __DIR__ . '/widgets/cta-widget.php' );

        $widgets_manager->register( new \Archfile_Hero_Widget() );
        $widgets_manager->register( new \Archfile_Software_Strip_Widget() );
        $widgets_manager->register( new \Archfile_Categories_Widget() );
        $widgets_manager->register( new \Archfile_Featured_Files_Widget() );
        $widgets_manager->register( new \Archfile_How_It_Works_Widget() );
        $widgets_manager->register( new \Archfile_CTA_Widget() );
    }
}

new Archfile_Elementor_Init();
