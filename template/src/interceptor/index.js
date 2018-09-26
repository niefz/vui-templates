/**
 * Created by NieFZ on 2018/9/18.
 */
import axios from 'axios';
import { Message } from 'element-ui';

axios.defaults.baseURL = '/';

axios.interceptors.request.use(
  config => config,
  err => Promise.reject(err),
);

axios.interceptors.response.use(
  (res) => {
    if (res && res.data && res.data.code) {
      if (res.data.code !== '0') {
        Message({
          type: 'error',
          message: res.data.msg,
          duration: '1500',
        });
      }
    }
    return res;
  },
  (err) => {
    Message({
      type: 'error',
      message: err,
      duration: '1500',
    });
    return Promise.reject(err);
  },
);

export default axios;
