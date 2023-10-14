<?php

/**
 * The plugin bootstrap file
 *
 * This file is read by WordPress to generate the plugin information in the plugin
 * admin area. This file also includes all of the dependencies used by the plugin,
 * registers the activation and deactivation functions, and defines a function
 * that starts the plugin.
 *
 * @link              https://https://velocitydeveloper.com/
 * @since             1.0.0
 * @package           Velocity_Custom
 *
 * @wordpress-plugin
 * Plugin Name:       Velocity Custom
 * Plugin URI:        https://https://velocitydeveloper.com/
 * Description:       Plugin untuk web custom velocitydeveloper.com
 * Version:           1.0.0
 * Author:            Velocity Developer
 * Author URI:        https://https://velocitydeveloper.com//
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       velocity-custom
 * Domain Path:       /languages
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * Currently plugin version.
 * Start at version 1.0.0 and use SemVer - https://semver.org
 * Rename this for your plugin and update it as you release new versions.
 */
define( 'VELOCITY_CUSTOM_VERSION', '1.0.0' );

/**
 * The code that runs during plugin activation.
 * This action is documented in includes/class-velocity-custom-activator.php
 */
function activate_velocity_custom() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-velocity-custom-activator.php';
	Velocity_Custom_Activator::activate();
}

/**
 * The code that runs during plugin deactivation.
 * This action is documented in includes/class-velocity-custom-deactivator.php
 */
function deactivate_velocity_custom() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-velocity-custom-deactivator.php';
	Velocity_Custom_Deactivator::deactivate();
}

register_activation_hook( __FILE__, 'activate_velocity_custom' );
register_deactivation_hook( __FILE__, 'deactivate_velocity_custom' );

/**
 * The core plugin class that is used to define internationalization,
 * admin-specific hooks, and public-facing site hooks.
 */
require plugin_dir_path( __FILE__ ) . 'includes/class-custom.php';

/**
 * Begins execution of the plugin.
 *
 * Since everything within the plugin is registered via hooks,
 * then kicking off the plugin from this point in the file does
 * not affect the page life cycle.
 *
 * @since    1.0.0
 */
function run_velocity_custom() {

	$plugin = new Velocity_Custom();
	$plugin->run();

}
run_velocity_custom();
