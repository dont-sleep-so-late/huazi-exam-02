import {
  handleGetUser,
  handleAddUser,
  handleUpdateUser,
  handleDeleteUser,
} from '../services/admin.js';
export default {
  namespace: 'user',
  // 设置state初始数据
  state: {},
  effects: {
    // 调用引入的handleQueryData方法
    *getUser({ payload, callback }, { call, put }) {
      const response = yield call(handleGetUser, payload);
      callback(response);
    },
    *addUser({ payload, callback }, { call, put }) {
      const response = yield call(handleAddUser, payload);
      callback(response);
    },
    *updateUser({ payload, callback }, { call, put }) {
      const response = yield call(handleUpdateUser, payload);
      callback(response);
    },
    *deleteUser({ payload, callback }, { call, put }) {
      const response = yield call(handleDeleteUser, payload);
      callback(response);
    },
  },
  reducers: {},
};
