/**
 * Created by NieFZ on 2018/9/18.
 */
import axios from 'axios';
import { Message } from 'iview';

axios.defaults.baseURL = '/';

axios.interceptors.request.use(
  config => config,
  err => Promise.reject(err),
);

axios.interceptors.response.use(
  (res) => {
    if (res && res.data && res.data.code) {
      if (res.data.code !== '0') {
        Message.error({
          content: res.data.msg,
          duration: '1500',
        });
      }
    }
    return res;
  },
  (err) => {
    Message.error({
      content: err,
      duration: '1500',
    });
    return Promise.reject(err);
  },
);

export default axios;
