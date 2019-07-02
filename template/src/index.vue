<template>
  <div class="wrapper clearfix">
    {{#router}}
    <router-view />
    {{else}}
    <HelloWorld />
    {{/router}}
  </div>
</template>
<script>
{{#unless router}}
import HelloWorld from './components/hello-world';

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
