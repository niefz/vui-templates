/**
 * Created by niefz on 2018/8/27.
 */
import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

export default new VueRouter({
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
});
