
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
    *add({ payload }, { call, put }) {
        yield put({
          type: 'changeSubmitting',
          payload: true,
        });
        const response = yield call(AddCourse, payload);
        // console.log('88888888', response, payload);
        yield put({
          type: 'changeCourseStatus',
          payload: response,
        });
        // Login successfully
        if (response.status === true) {
          yield put(routerRedux.push('/'));
        }
      },
    *appendFetch({ payload }, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(queryFakeList, payload);
      yield put({
        type: 'appendList',
        // payload: Array.isArray(response.courses) ? response : [],
        payload:response.courses,
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
        list: action.payload,
      };
    },
    changeLoading(state, action) {
      return {
        ...state,
        loading: action.payload,
      };
    },
  },
};
