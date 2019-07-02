/**
 * Created by niefz on 2018/9/18.
 */
module.exports = {
  plugins: {
    'postcss-salad': {
      browsers: [
        'last 100 versions',
      ],
      features: {
        bem: {
          shortcuts: {
            component: 'b',
            descendent: 'e',
            modifier: 'm',
          },
          separators: {
            descendent: '-',
            modifier: '--',
          },
        },
      },
    },
    cssnano: {},
  },
};
