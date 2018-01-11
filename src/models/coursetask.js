
import { queryCTask, AddCTask, UpdateCTask, DeleteCTask,getCrouseTaskStatus } from '../services/api';

export default {
  namespace: 'coursetask',

  state: {
    course: [],
    loading: false,
    rm: true,
    newc: '',
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(queryCTask, payload);
      yield put({
        type: 'saveCTaskList',
        payload: response ? response.courses:[],
      });
      yield put({
        type: 'changeLoading',
        payload: false,
      });
    },
    *add({ payload, callback }, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(AddCTask, payload);
      yield put({
        type: 'addCourseTask',
        payload: response,
      });
      yield put({
        type: 'changeLoading',
        payload: false,
      });
      if (callback) callback();
    },
    *remove({payload, callback }, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(DeleteCTask, payload);
      yield put({
        type: 'removeCourseTask',
        payload: response,
      });
      yield put({
        type: 'changeLoading',
        payload: false,
      });
      if (callback) callback();
    },
    *edit({payload, callback }, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(UpdateCTask, payload);
      yield put({
        type: 'editCourseTask',
        payload: response,
      });
      yield put({
        type: 'changeLoading',
        payload: false,
      });
      if (callback) callback();
    },
    *crouseTaskStatus({ payload }, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(getCrouseTaskStatus, payload);
      yield put({
        type: 'courseTaskStatus',
        payload: response.coursetask,
      });
      yield put({
        type: 'changeLoading',
        payload: false,
      });
    },
  },

  reducers: {
    saveCTaskList(state, action) {
      return {
        ...state,
        courseTask: action.payload,
      };
    },
    changeLoading(state, action) {
      return {
        ...state,
        loading: action.payload,
      };
    },
    addCourseTask(state, action) {
      return {
        ...state,
        newct: action.payload,
      };
    },
    removeCourseTask(state, action) {
      return {
        ...state,
        rmct: action.payload,
      };
    },
    getCourseTaskStatus(state, action) {
      return {
        ...state,
        courseTaskStatus: action.payload,
      };
    },
  },
};
