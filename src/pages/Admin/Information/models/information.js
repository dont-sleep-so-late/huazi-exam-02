import {
  handleGetUser,
  handleAddUser,
  handleUpdateUser,
  handleDeleteUser,
} from '../services/information.js';
export default {
  namespace: 'information',
  // 设置state初始数据
  state: {
    
  },
  effects: {
    // 调用引入的handleQueryData方法
    *setArea({ payload, callback }, { call, put }) {
      yield put({
        type: 'saveArea',
        payload,
      });
    },
    *getArea({ payload, callback }, { call, put }) {
      const res = yield put({ type: 'getArea' });
    },
  },
  reducers: {
    saveArea(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    getArea(state) {
      return {
        state,
      };
    },
  },
};
