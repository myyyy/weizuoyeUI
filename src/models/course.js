
import { queryCourse,AddCourse,UpdateCourse ,DeleteCourse} from '../services/api';
export default {
  namespace: 'course',

  state: {
    list: [],
    loading: false,
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
        payload:response.courses,
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
  },

  reducers: {
    saveCourseList(state, action) {
      return {
        ...state,
        list: action.payload,
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
        new: action.payload,
      };
    },
  },
};
