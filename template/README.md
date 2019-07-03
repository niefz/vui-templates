# {{ name }}

> {{ description }}

## Project Structure

+ ├── docs/                       # docs of platform
+ │   └── ...
+ ├── src/
+ │   ├── api/                    # api config
+ │   │   └── index.js
+ │   └── assets/                 # module assets (processed by webpack)
+ │       └── ...
+ │   ├── components/             # ui components
+ │   │   └── ...
+ │   ├── directives/             # directives
+ │   │   └── ...
+ │   ├── filters/                # filters
+ │   │   └── ...
+ │   ├── i18n/                   # Internationalization
+ │   │   └── ...
+ │   ├── interceptor/            # axios interceptor
+ │   │   └── index.js
+ │   ├── mixins/                 # mixins
+ │   │   └── ...
+ │   ├── pages/                  # multiply pages entry file
+ │   │   └── ...
+ │   ├── routers/                # routers
+ │   │   └── ...
+ │   ├── sass/                   # styles
+ │   │   └── ...
+ │   ├── stores/                 # vuex store
+ │   │   └── ...
+ │   ├── templates/              # vue templates
+ │   │   └── ...
+ │   ├── utils/                  # common utils
+ │   │   └── ...
+ │   ├── index.html              # index.html template
+ │   ├── index.js                # app entry file
+ │   ├── index.vue               # main app component
+ ├── static/                     # pure static assets (directly copied)
+ ├── test/
+ │   └── unit/                   # unit tests
+ │   │   ├── specs/              # test spec files
+ │   │   ├── index.js            # test build entry file
+ │   │   ├── jest.conf.js        # Config file when using Jest for unit tests
+ │   │   └── karma.conf.js       # test runner config file when using Karma for unit tests
+ │   └── e2e/                    # e2e tests
+ │   │   ├── specs/              # test spec files
+ │   │   └── nightwatch.conf.js  # test runner config file
+ │   │   └── globals.js          # globals setting of nightwatch
+ ├── .babelrc                    # babel config
+ ├── .eslintignore               # eslint ignore rules
+ ├── .eslintrc                   # eslint config
+ ├── .gitignore                  # sensible defaults for gitignore
+ ├── .htmllintrc                 # htmllint config
+ ├── .postcssrc.js               # postcss config
+ ├── .prettierrc                 # prettier config
+ ├── .stylelintignore            # stylelint ignore rules
+ ├── .stylelintrc                # stylelint config
+ ├── package.json                # build scripts and dependencies
+ └── README.md                   # Default README file
+ ├── sftp.config.js              # sftp config
+ ├── webpack.base.js             # webpack base config
+ ├── webpack.dev.js              # webpack-dev-server config
+ ├── webpack.prod.js             # webpack prod config
+ ├── webpack.sync.js             # webpack browser-sync config
+ ├── webpack.test.js             # test config

## Build Setup

``` bash
# build element-ui theme
npm run build:theme

# serve with hot reload at localhost:8080
npm run dev

# time-saving synchronised browser testing.
npm run sync

# build for production with minification
npm run prod
{{#unit}}

# run unit tests
npm run test:unit
{{/unit}}
{{#e2e}}

# run e2e tests
npm run test:e2e
{{/e2e}}
{{#if_or unit e2e}}
{{/if_or}}
```
