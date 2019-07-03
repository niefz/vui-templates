/**
 * Created by niefz on 2018/9/18.
 */
module.exports = {
  plugins: {
    'postcss-cssnext': {
      browsers: [
        'last 100 versions',
      ],
    },
    'postcss-bem': {
      defaultNamespace: undefined,
      style: 'bem',
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
    cssnano: {},
  },
};
