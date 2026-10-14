<?php
/**
 * Archfile functions and definitions
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Enqueue scripts and styles.
 */
function archfile_scripts() {
	wp_enqueue_style( 'archfile-style', get_stylesheet_uri(), array(), wp_get_theme()->get( 'Version' ) );
    wp_enqueue_style( 'archfile-main', get_template_directory_uri() . '/assets/css/main.css', array(), wp_get_theme()->get( 'Version' ) );
    wp_enqueue_style( 'archfile-vazirmatn', get_template_directory_uri() . '/assets/fonts/Vazirmatn/fontface.css', array(), '1.0.0' );
    wp_enqueue_style( 'archfile-iconsax', get_template_directory_uri() . '/assets/fonts/Iconsax/iconsax.css', array(), '1.0.0' );
}
add_action( 'wp_enqueue_scripts', 'archfile_scripts' );

/**
 * Theme setup.
 */
function archfile_setup() {
	add_theme_support( 'title-tag' );
	add_theme_support( 'post-thumbnails' );
	add_theme_support( 'html5', array(
		'search-form',
		'comment-form',
		'comment-list',
		'gallery',
		'caption',
	) );

    register_nav_menus( array(
		'primary' => __( 'منوی اصلی', 'archfile' ),
	) );
}
add_action( 'after_setup_theme', 'archfile_setup' );

/**
 * Load Elementor widgets
 */
require_once get_template_directory() . '/inc/elementor/class-elementor-init.php';
