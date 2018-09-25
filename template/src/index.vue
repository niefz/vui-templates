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
  import HelloWorld from './components/hello-world';

  {{/unless}}
  export default {
    {{#router}}{{else}}
    components: {
      HelloWorld,
    },
    {{/router}}
  };
</script>
<style lang="scss" scoped>
  @import "./styles/variables";

  .main-wrapper {
    margin-top: 60px;
    margin-left: 200px;
  }
</style>
