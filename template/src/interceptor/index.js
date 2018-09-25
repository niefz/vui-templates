/**
 * Created by NieFZ on 2018/9/18.
 */
import axios from 'axios';
{{#UI}}
{{#if_eq UILibrary 'element-ui'}}
import { Message } from 'element-ui';
{{/if_eq}}
{{/UI}}

axios.defaults.baseURL = '/gateway';

axios.interceptors.response.use((res) => {
  if (res && res.data && res.data.code) {
    if (res.data.code !== '0') {
      console.log(res);
      {{#UI}}
      {{#if_eq UILibrary 'element-ui'}}
      Message({
        type: 'error',
        message: res.data.msg,
        duration: '1500',
      });
      {{/if_eq}}
      {{/UI}}
    }
  }
  return res;
});

export default axios;
