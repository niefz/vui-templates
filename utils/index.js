/**
 * Created by niefz on 2018/9/18.
 */
const {
  join,
} = require('path')

const {
  readFileSync,
  writeFileSync,
} = require('fs')

const {
  spawn,
} = require('child_process')

const eslintStyles = [
  'airbnb',
  'standard',
]

/**
 * Sorts dependencies in package.json alphabetically.
 * They are unsorted because they were grouped for the handlebars helpers
 * @param {object} data Data from questionnaire
 */
exports.sortDependencies = (data) => {
  const { inPlace, destDirName } = data
  const packageJsonFile = join(inPlace ? '' : destDirName, 'package.json')
  const packageJson = JSON.parse(readFileSync(packageJsonFile))
  packageJson.dependencies = sortObject(packageJson.dependencies)
  packageJson.devDependencies = sortObject(packageJson.devDependencies)
  writeFileSync(packageJsonFile, JSON.stringify(packageJson, null, 2) + '\n')
}

/**
 * Runs `npm install` in the project directory
 * @param {string} cwd Path of the created project directory
 * @param {object} data Data from questionnaire
 */
exports.installDependencies = (cwd, data, color) => {
  const { autoInstall } = data
  const executable = autoInstall
  const args = [
    'install',
    '&&',
    executable, 'install', '-g', 'element-theme',
    '&&',
    'et', '-i', 'src/sass/_element-variables.scss'
  ]
  console.log()
  console.log(`# ${color('Installing project dependencies ...')}`)
  return runCommand(executable, args, { cwd })
}

/**
 * Runs `npm run eslint -- --fix` in the project directory
 * @param {string} cwd Path of the created project directory
 * @param {object} data Data from questionnaire
 */
exports.runLintFix = (cwd, data, color) => {
  const { eslint, eslintConfig, autoInstall } = data
  const executable = autoInstall
  if (eslint && eslintStyles.indexOf(eslintConfig) !== -1) {
    console.log(`# ${color('Running eslint --fix to comply with chosen preset rules...')}`)
    const args = executable.toString() === 'npm'
      ? ['run', 'eslint', '--', '--fix'] : ['run', 'eslint', '--fix']
    return runCommand(executable, args, { cwd })
  }
  return Promise.resolve()
}

/**
 * Prints the final message with instructions of necessary next steps.
 * @param {Object} data Data from questionnaire.
 */
exports.printMessage = (data, { green, yellow }) => {
  const { inPlace, destDirName } = data
  console.log()
  console.log(`# ${green('Project initialization finished!')}`)
  console.log()
  console.log('# To get started:')
  console.log()
  console.log(`  ${yellow(`${inPlace ? '' : `cd ${destDirName}`}`)}`)
  console.log(`  ${yellow('npm run build:theme')}`)
  console.log(`  ${yellow(`${installMsg(data)}${eslintMsg(data)}npm run dev`)}`)
  console.log()
  console.log('# Documentation can be found at https://github.com/niefz/vui-templates')
}

/**
 * If the user will have to run eslint --fix themselves, it returns a string
 * containing the instruction for this step.
 * @param {Object} data Data from questionnaire.
 */
const eslintMsg = (data) => {
  const { eslint, eslintConfig, autoInstall } = data
  return !autoInstall
  && eslint
  && eslintStyles.indexOf(eslintConfig) !== -1
    ? 'npm run eslint -- --fix (or for yarn: yarn run eslint --fix)\n  '
    : ''
}

/**
 * If the user will have to run `npm install` or `yarn` themselves, it returns a string
 * containing the instruction for this step.
 * @param {Object} data Data from the questionnaire
 */
const installMsg = (data) => {
  const { autoInstall } = data
  return !autoInstall ? 'npm install (or if using yarn: yarn)\n  ' : ''
}

/**
 * spawns a child process and runs the specified command
 * By default, runs in the CWD and inherits stdio
 * Options are the same as node's child_process.spawn
 * @param {string} cmd
 * @param {array<string>} args
 * @param {object} options
 */
const runCommand = (cmd, args, options) => {
  return new Promise((resolve) => {
    const spwan = spawn(
      cmd,
      args,
      Object.assign(
        {
          stdio: 'inherit',
          shell: true,
        },
        options
      )
    )

    spwan
      .on('exit', () => {
        resolve()
      })
  })
}

const sortObject = (object) => {
  // Based on https://github.com/yarnpkg/yarn/blob/v1.3.2/src/config.js#L79-L85
  const sortedObject = {}
  Object
    .keys(object)
    .sort()
    .forEach((item) => {
      sortedObject[item] = object[item]
    })
  return sortedObject
}
