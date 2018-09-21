/**
 * Created by NieFZ on 2018/9/18.
 */
import axios from 'axios';
{{#UI}}
{{#if_eq UIConfig 'element-ui'}}
import { Message } from 'element-ui';

{{/if_eq}}
{{/UI}}
axios.defaults.baseURL = '/gateway';

axios.interceptors.response.use((response) => {
  if (response && response.data && response.data.code) {
    if (response.data.code !== '0') {
      {{#UI}}
      {{#if_eq UIConfig 'element-ui'}}
      Message({
        type: 'error',
        message: response.data.msg,
        duration: '1500',
      });
      {{/if_eq}}
      {{/UI}}
    }
  }
  return response;
});

export default axios;
