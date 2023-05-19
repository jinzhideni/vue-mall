import request from '../utils/request';

export function getList(params) {
  return request.get('/products/all', {
    params,
  });
}

export function removeList(params) {
  return request.delete(`/products/${params.id}`);
}

export function addList(params) {
  return request.post('/products/add', {
    params,
  });
}
