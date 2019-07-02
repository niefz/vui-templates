<template>
  <div class="exception">
    <div class="exception-inner">
      <img
        class="exception-inner--img"
        :src="exceptionImg"
        :alt="exception"
      >
      <div class="exception-inner--content">
        <h1>
          <slot name="title">
            {{ exception }}
          </slot>
        </h1>
        <h2>
          <slot name="desc">
            {{ exceptionTip }}
          </slot>
        </h2>
        <slot />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Exception',
  inheritAttrs: false,
  props: {
    exception: {
      type: String,
      default: '404',
    },
    src: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      403: {
        image: '/assets/images/403.svg',
        description: '抱歉，你无权访问该页面',
      },
      404: {
        image: '/assets/images/404.svg',
        description: '抱歉，你访问的页面不存在',
      },
      500: {
        image: '/assets/images/500.svg',
        description: '抱歉，服务器出错了',
      },
    };
  },
  computed: {
    exceptionImg() {
      const { exception, src } = this;
      if (src) return this.src;
      return this[exception].image;
    },
    exceptionTip() {
      const { exception, description } = this;
      if (description) return this.description;
      return this[exception].description;
    },
  },
};
</script>
