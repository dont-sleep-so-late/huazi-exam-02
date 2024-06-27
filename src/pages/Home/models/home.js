import { handleGetData } from '../services/home.js';
export default {
  namespace: 'home',
  // 设置state初始数据
  state: {},
  effects: {
    // 调用引入的handleQueryData方法
    *getData({ payload, callback }, { call, put }) {
      const response = yield call(handleGetData, payload);
      console.log('response', response);
      callback(response);
    },
  },
  reducers: {},
};
