<?php

/**
 * Define the internationalization functionality
 *
 * Loads and defines the internationalization files for this plugin
 * so that it is ready for translation.
 *
 * @link       https://https://velocitydeveloper.com/
 * @since      1.0.0
 *
 * @package    Velocity_Custom
 * @subpackage Velocity_Custom/includes
 */

/**
 * Define the internationalization functionality.
 *
 * Loads and defines the internationalization files for this plugin
 * so that it is ready for translation.
 *
 * @since      1.0.0
 * @package    Velocity_Custom
 * @subpackage Velocity_Custom/includes
 * @author     Velocity Developer <bantuanvelocity@gmail.com>
 */
class Velocity_Custom_i18n {


	/**
	 * Load the plugin text domain for translation.
	 *
	 * @since    1.0.0
	 */
	public function load_plugin_textdomain() {

		load_plugin_textdomain(
			'velocity-custom',
			false,
			dirname( dirname( plugin_basename( __FILE__ ) ) ) . '/languages/'
		);

	}



}
