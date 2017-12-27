import request from '../utils/request';

export async function query() {
  return request('/user');
}

export async function queryCurrent() {
  return request('/user');
}
