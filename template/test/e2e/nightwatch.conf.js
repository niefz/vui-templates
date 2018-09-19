/**
 * Created by niefz on 2018/8/27.
 */
module.exports = {

  // An array of folders (excluding subfolders) where the tests are located.
  src_folders: ['test/e2e/specs'],

  // The location where the JUnit XML report files will be saved.
  output_folder: 'test/e2e/report',

  // Location(s) where custom commands will be loaded from.
  custom_commands_path: 'node_modules/nightwatch-helpers/commands',

  // 	Location(s) where custom assertions will be loaded from.
  custom_assertions_path: 'node_modules/nightwatch-helpers/assertions',

  // Location(s) where page object files will be loaded from.
  page_objects_path: '',

  // Location of an external globals module which will be loaded and made available to the test as a property globals on the main client instance.
  globals_path: '',

  // 	An object containing Selenium Server related configuration options. See below for details.
  selenium: {

    // Whether or not to manage the selenium process automatically.
    start_process: true,

    // Whether or not to automatically start the Selenium session. This will typically be set to false when running unit/integration tests that don't interact with the Selenium server.
    start_session: true,

    // The location of the selenium jar file. This needs to be specified if start_process is enabled.
    server_path: require('selenium-server').path,

    // The location where the selenium output.log file will be placed. Defaults to current directory.
    log_path: '',

    // The port number Selenium will listen on.
    port: 4444,

    // List of cli arguments to be passed to the Selenium process.
    cli_args: {
      // Selenium will be default create a new Firefox profile for each session. If you wish to use an existing Firefox profile you can specify its name here.
      'webdriver.chrome.driver': require('chromedriver').path,

      // Nightwatch can run the tests using Chrome browser also. To enable this you have to download the ChromeDriver binary and specify it's location here. Also don't forget to specify chrome as the browser name in the desiredCapabilities object.
      // 'webdriver.gecko.driver': require('geckodriver').path,

      // Nightwatch has support for Internet Explorer also. To enable this you have to download the IE Driver binary and specify it's location here. Also don't forget to specify "internet explorer" as the browser name in the desiredCapabilities object.
      // 'webdriver.edge.driver': require('edgedriver').path
    }
  },

  // This object contains all the test related options. See below for details.
  test_settings: {
    default: {
      // A url which can be used later in the tests as the main url to load. Can be useful if your tests will run on different environments, each one with a different url.
      launch_url: 'http://localhost',

      // The hostname/IP on which the selenium server is accepting connections.
      selenium_host: 'localhost',

      // 	The port number on which the selenium server is accepting connections.
      selenium_port: 4444,

      // Whether to show extended Selenium command logs.
      silent: true,

      // Use to disable terminal output completely.
      output: true,

      // Use to disable colored output in the terminal.
      disable_colors: false,

      // Selenium generates screenshots when command errors occur. With on_failure set to true, also generates screenshots for failing or erroring tests. These are saved on the disk.
      // Since v0.7.5 you can disable screenshots for command errors by setting "on_error" to false.
      // Example:
      // "screenshots" : {
      //   "enabled" : true,
      //   "on_failure" : true,
      //   "on_error" : false,
      //   "path" : ""
      // }
      screenshots: {
        enabled: true,
        on_failure: true,
        on_error: false,
        path: 'test/e2e/report'
      },

      // In case the selenium server requires credentials this username will be used to compute the Authorization header.
      // The value can be also an environment variable, in which case it will look like this:
      // "username" : "${SAUCE_USERNAME}"
      username: '',

      // This field will be used together with username to compute the Authorization header.
      // Like username, the value can be also an environment variable:
      // "access_key" : "${SAUCE_ACCESS_KEY}"
      access_key: '',

      // An object which will be passed to the Selenium WebDriver when a new session will be created. You can specify browser name for instance along with other capabilities.
      // Example:
      // "desiredCapabilities" : {
      //   "browserName" : "firefox",
      //   "acceptSslCerts" : true
      // }
      desiredCapabilities: {
        browserName: 'chrome',
        marionette: true
      },

      // An object which will be made available within the test and can be overwritten per environment. Example:
      // "globals" : {
      //   "myGlobal" : "some_global"
      // }
      globals: {
        myGlobal: '',
      },

      // An array of folders or file patterns to be skipped (relative to the main source folder).
      // Example:
      // "exclude" : ["excluded-folder"]
      // or:
      // "exclude" : ["test-folder/*-smoke.js"]
      // exclude: [],

      // Folder or file pattern to be used when loading the tests. Files that don't match this pattern will be ignored.
      // Example:
      // "filter" : "tests/*-smoke.js"
      filter: '',

      // Do not show the Base64 image data in the (verbose) log when taking screenshots.
      log_screenshot_data: false,

      // Use xpath as the default locator strategy
      use_xpath: false,

      // Same as Selenium settings cli_args. You can override the global cli_args on a per-environment basis.
      cli_args: null,

      // End the session automatically when the test is being terminated, usually after a failed assertion.
      end_session_on_fail: true,

      // Skip the remaining testcases (or test steps) from the same test suite (i.e. test file), when one testcase fails.
      skip_testcases_on_fail: true,
    },

    chrome: {
      desiredCapabilities: {
        browserName: 'chrome',
        javascriptEnabled: true,
        acceptSslCerts: true
      }
    },

    edge: {
      desiredCapabilities: {
        browserName: 'MicrosoftEdge',
        javascriptEnabled: true,
        acceptSslCerts: true
      }
    }
  },

  // Whether or not to buffer the output in case of parallel running. See below for details.
  live_output: false,

  // Controls whether or not to disable coloring of the cli output globally.
  disable_colors: false,

  // Specifies the delay(in milliseconds) between starting the child processes when running in parallel mode.
  parallel_process_delay: 10,

  // Whether or not to run individual test files in parallel. If set to true, runs the tests in parallel and determines the number of workers automatically.
  // If set to an object, can specify specify the number of workers as "auto" or a number.
  // Example: "test_workers" : {"enabled" : true, "workers" : "auto"}
  test_workers: false,

  // Specifies which test runner to use when running the tests. Values can be either default (built in nightwatch runner) or mocha.
  // Example: "test_runner" : {"type" : "mocha", "options" : {"ui" : "tdd"}}
  test_runner: 'default'
};