// 对于用户操作的接口管理
import request from '../utils/request';

export default function (params) {
  return request.post('/passport/login', params);
}

// https://mallapi.duyiedu.com/passport/login
