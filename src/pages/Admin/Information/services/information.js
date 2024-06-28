import { request } from '@umijs/max';

export async function handleGetUser(data) {
  return request('/user/getUser', {
    method: 'post',
    data,
  });
}

export async function handleDeleteUser(data) {
  return request('/user/deleteUser', {
    method: 'post',
    data,
  });
}
export async function handleUpdateUser(data) {
  return request('/user/updateUser', {
    method: 'post',
    data,
  });
}
export async function handleAddUser(data) {
  return request('/user/addUser', {
    method: 'post',
    data,
  });
}
