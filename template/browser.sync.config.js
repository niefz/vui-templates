/**
 * Created by niefz on 2018/9/18.
 */
const bs = require('browser-sync').create();

bs.init({
  ui: {
    port: 3000
  },
  files: [
    'src/**'
  ],
  proxy: {
    target: 'http://localhost:12586',
  }
});
