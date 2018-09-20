/**
 * Created by niefz on 2018/9/18.
 */
const path = require('path')

const { sortDependencies, installDependencies, runLintFix, printMessage } = require('./utils')
const { addTestAnswers } = require('./scenarios')
const pkg = require('./package.json')

const templateVersion = pkg.version

module.exports = {
  metalsmith: {
    // When running tests for the template, this adds answers for the selected scenario
    // before: addTestAnswers
  },
  helpers: {
    if_or(v1, v2, options) {

      if (v1 || v2) {
        return options.fn(this)
      }

      return options.inverse(this)
    },
    template_version() {
      return templateVersion
    },
  },
  prompts: {
    name: {
      when: 'isNotTest',
      type: 'string',
      required: true,
      message: 'Project name',
    },
    description: {
      when: 'isNotTest',
      type: 'string',
      required: false,
      message: 'Project description',
      default: 'A Vue.js project',
    },
    license: {
      when: 'isNotTest',
      type: 'string',
      required: false,
      message: 'License',
      default: 'MIT',
    },
    author: {
      when: 'isNotTest',
      type: 'string',
      message: 'Author',
    },
    router: {
      when: 'isNotTest',
      type: 'confirm',
      message: 'Install vue-router?',
    },
    vuex: {
      when: 'isNotTest',
      type: 'confirm',
      message: 'Install vuex?',
    },
    i18n: {
      when: 'isNotTest',
      type: 'confirm',
      message: 'Install vue-i18n?',
    },
    htmllint: {
      when: 'isNotTest',
      type: 'confirm',
      message: 'Use htmllint to lint your html?',
    },
    stylelint: {
      when: 'isNotTest',
      type: 'confirm',
      message: 'Use stylelint to lint your style?',
    },
    eslint: {
      when: 'isNotTest',
      type: 'confirm',
      message: 'Use eslint to lint your code?',
    },
    eslintConfig: {
      when: 'isNotTest && eslint',
      type: 'list',
      message: 'Pick an eslint preset',
      choices: [
        {
          name: 'Airbnb (https://github.com/airbnb/javascript)',
          value: 'airbnb',
          short: 'Airbnb',
        },
        {
          name: 'Standard (https://github.com/standard/standard)',
          value: 'standard',
          short: 'Standard',
        },
        {
          name: 'none (configure it yourself)',
          value: 'none',
          short: 'none',
        },
      ],
    },
    UI: {
      when: 'isNotTest',
      type: 'confirm',
      message: 'Set up UI library',
    },
    UIConfig: {
      when: 'isNotTest && UI',
      type: 'list',
      message: 'Pick a UI library',
      choices: [
        {
          name: 'Element-UI',
          value: 'element-ui',
          short: 'Element-UI',
        },
        {
          name: 'iView',
          value: 'iview',
          short: 'iView',
        },
        {
          name: 'none (configure it yourself)',
          value: 'noUI',
          short: 'noUI',
        },
      ],
    },
    unit: {
      when: 'isNotTest',
      type: 'confirm',
      message: 'Set up unit tests',
    },
    runner: {
      when: 'isNotTest && unit',
      type: 'list',
      message: 'Pick a test runner',
      choices: [
        {
          name: 'Karma and Mocha',
          value: 'karma',
          short: 'karma',
        },
        {
          name: 'Jest',
          value: 'jest',
          short: 'jest',
        },
        {
          name: 'none (configure it yourself)',
          value: 'noTest',
          short: 'noTest',
        },
      ],
    },
    e2e: {
      when: 'isNotTest',
      type: 'confirm',
      message: 'Setup e2e tests with Nightwatch?',
    },
    autoInstall: {
      when: 'isNotTest',
      type: 'list',
      message: 'Should we run `npm install` for you after the project has been created? (recommended)',
      choices: [
        {
          name: 'Yes, use NPM',
          value: 'npm',
          short: 'npm',
        },
        {
          name: 'Yes, use Yarn',
          value: 'yarn',
          short: 'yarn',
        },
        {
          name: 'No, I will handle that myself',
          value: false,
          short: 'no',
        },
      ],
    },
  },
  filters: {
    '.htmllintrc': 'htmllint',
    '.stylelintrc': 'stylelint',
    '.stylelintignore': 'stylelint',
    '.eslintrc': 'eslint',
    '.eslintignore': 'eslint',
    'src/styles/element.scss': 'UI && UIConfig === "element-ui"',
    'src/styles/iview.less': 'UI && UIConfig === "iview"',
    'webpack.test.config.js': 'unit && runner === "karma"',
    'test/unit/**/*': 'unit',
    'test/unit/index.js': 'unit && runner === "karma"',
    'test/unit/karma.conf.js': 'unit && runner === "karma"',
    'test/unit/jest.conf.js': 'unit && runner === "jest"',
    'test/e2e/**/*': 'e2e',
    'src/routers/**/*': 'router',
    'src/stores/**/*': 'vuex',
    'src/i18n/**/*': 'i18n',
    'src/local/**/*': 'i18n',
  },
  complete: function (data, { chalk }) {
    const green = chalk.green

    sortDependencies(data)

    const cwd = path.join(process.cwd(), data.inPlace ? '' : data.destDirName)

    if (data.autoInstall) {
      installDependencies(cwd, data, green)
        .then(() => {
          return runLintFix(cwd, data, green)
        })
        .then(() => {
          printMessage(data, green)
        })
        .catch(e => {
          console.log(chalk.red('Error:'), e)
        })
    } else {
      printMessage(data, chalk)
    }
  },
}