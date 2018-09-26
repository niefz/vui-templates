<template>
  <div class="wrapper clearfix">
    <div
      class="main-wrapper">
      {{#router}}
      <router-view/>
      {{else}}
      <HelloWorld/>
      {{/router}}
    </div>
  </div>
</template>
<script>
  {{#unless router}}
  import HelloWorld from './components/hello-world/hello-world';

  {{/unless}}
  export default {
    {{#router}}
    components: {
    },
    {{else}}
    components: {
      HelloWorld,
    },
    {{/router}}
  };
</script>
<style lang="less" scoped>
  @import "./less/_variables.less";

  .main-wrapper {
    margin-top: 60px;
    margin-left: 200px;
  }
</style>
