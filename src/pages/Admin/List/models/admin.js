import {
  handleGetUser,
  handleAddUser,
  handleUpdateUser,
  handleDeleteUser,
} from '../services/admin.js';
export default {
  namespace: 'user',
  // 设置state初始数据
  state: {
    //搜索条件及分页码的缓存
    listData: [],
  },
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
    *setData({ payload, callback }, { call, put }) {
      yield put({
        type: 'setSearchData',
        payload: {
          listData: payload,
        },
      });
    },
  },
  reducers: {
    //搜索条件及分页码的缓存
    setSearchData(state, { payload }) {
      return Object.assign({}, state, payload);
    },
  },
};
