// 所有类目的接口

import request from '../utils/request';

export default function (params) {
  return request.get('category/all', {
    params,
  });
}
