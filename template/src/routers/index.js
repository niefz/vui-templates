/**
 * Created by niefz on 2018/8/27.
 */
export default {
  mode: 'hash',
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: r => require.ensure([], (require) => {
        r(require('src/components/hello-world/hello-world.vue'));
      }, 'hello-world'),
    },
  ],
};
