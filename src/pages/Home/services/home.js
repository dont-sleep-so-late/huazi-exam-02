import { request } from '@umijs/max';

export async function handleGetData(data) {
  return request('/home/getData', {
    method: 'GET',
    data,
  });
}

// export async function handleLogin(param) {
//   return request.post('/user/login', {
//     data: param,
//   });
// }
