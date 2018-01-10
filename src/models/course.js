
import { queryCourse, AddCourse, UpdateCourse, DeleteCourse,getCrouseTaskStatus } from '../services/api';

export default {
  namespace: 'course',

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
      const response = yield call(queryCourse, payload);
      yield put({
        type: 'saveCourseList',
        payload: response.courses,
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
      const response = yield call(AddCourse, payload);
      yield put({
        type: 'addCourse',
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
      const response = yield call(DeleteCourse, payload);
      yield put({
        type: 'removeCourse',
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
      const response = yield call(UpdateCourse, payload);
      yield put({
        type: 'editCourse',
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
    saveCourseList(state, action) {
      return {
        ...state,
        course: action.payload,
      };
    },
    changeLoading(state, action) {
      return {
        ...state,
        loading: action.payload,
      };
    },
    addCourse(state, action) {
      return {
        ...state,
        newc: action.payload,
      };
    },
    removeCourse(state, action) {
      return {
        ...state,
        rm: action.payload,
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
