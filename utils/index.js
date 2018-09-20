/**
 * Created by niefz on 2018/9/18.
 */
const path = require('path')
const fs = require('fs')
const process = require('child_process')

const eslintStyles = ['airbnb', 'standard']

/**
 * Sorts dependencies in package.json alphabetically.
 * They are unsorted because they were grouped for the handlebars helpers
 * @param {object} data Data from questionnaire
 */
exports.sortDependencies = (data) => {
  const packageJsonFile = path.join(data.inPlace ? '' : data.destDirName, 'package.json')
  const packageJson = JSON.parse(fs.readFileSync(packageJsonFile))
  packageJson.dependencies = sortObject(packageJson.dependencies)
  packageJson.devDependencies = sortObject(packageJson.devDependencies)
  fs.writeFileSync(packageJsonFile, JSON.stringify(packageJson, null, 2) + '\n')
}

/**
 * Runs `npm install` in the project directory
 * @param {string} cwd Path of the created project directory
 * @param {object} data Data from questionnaire
 */
exports.installDependencies = (cwd, data, color) => {
  const executable = data.autoInstall || 'npm';
  console.log(`\n\n# ${color('Installing project dependencies ...')}`)
  console.log('# ========================\n')
  if (data.UI) {
    return new Promise((resolve) => {
      process.execFile(`../sh/${data.UIConfig}.sh`)
    })
  }
  return runCommand(executable, ['install'], { cwd })
}

/**
 * Runs `npm run eslint -- --fix` in the project directory
 * @param {string} cwd Path of the created project directory
 * @param {object} data Data from questionnaire
 */
exports.runLintFix = (cwd, data, color) => {
  if (data.eslint && eslintStyles.indexOf(data.eslintConfig) !== -1) {
    console.log(
      `\n\n${color(
        'Running eslint --fix to comply with chosen preset rules...'
      )}`
    )
    console.log('# ========================\n')
    const args =
      data.autoInstall === 'npm'
        ? ['run', 'eslint', '--', '--fix']
        : ['run', 'eslint', '--fix']
    return runCommand(data.autoInstall, args, { cwd })
  }
  return Promise.resolve()
}

/**
 * Prints the final message with instructions of necessary next steps.
 * @param {Object} data Data from questionnaire.
 */
exports.printMessage = (data, { green, yellow }) => {
  const message = `
  # ${green('Project initialization finished!')}
  # ========================
  To get started:
    ${yellow(`${data.inPlace ? '' : `cd ${data.destDirName}\n  `}${installMsg(data)}${eslintMsg(data)}npm run dev`)}
    
  Documentation can be found at https://github.com/niefz/vui-templates
  `
  console.log(message)
}

/**
 * If the user will have to run lint --fix themselves, it returns a string
 * containing the instruction for this step.
 * @param {Object} data Data from questionnaire.
 */
const eslintMsg = (data) => {
  return !data.autoInstall &&
  data.eslint &&
  eslintStyles.indexOf(data.lintConfig) !== -1
    ? 'npm run lint -- --fix (or for yarn: yarn run lint --fix)\n  '
    : ''
}

/**
 * If the user will have to run `npm install` or `yarn` themselves, it returns a string
 * containing the instruction for this step.
 * @param {Object} data Data from the questionnaire
 */
const installMsg = (data) => {
  return !data.autoInstall ? 'npm install (or if using yarn: yarn)\n  ' : ''
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
    const spwan = process.spawn(
      cmd,
      args,
      Object.assign(
        {
          cwd: process.cwd(),
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
  Object.keys(object)
    .sort()
    .forEach(item => {
      sortedObject[item] = object[item]
    })
  return sortedObject
}
