/**
 * Created by NieFZ on 2018/9/18.
 */
import axios from 'axios';
import { message } from '@/utils';

axios.defaults.baseURL = '/';

axios.interceptors.request.use(
  config => config,
  err => Promise.reject(err),
);

axios.interceptors.response.use(
  (res) => {
    if (res && res.data && res.data.code) {
      if (res.data.code !== '0') {
        message({
          type: 'error',
          message: res.data.msg,
        });
      }
    }
    return res;
  },
  (err) => {
    message({
      type: 'error',
      message: err,
    });
    return Promise.reject(err);
  },
);

export default axios;
