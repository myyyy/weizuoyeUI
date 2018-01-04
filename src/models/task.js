
import { queryCourse,AddCourse,UpdateCourse ,DeleteCourse} from '../services/api';
export default {
  namespace: 'task',

  state: {
    list: [],
    loading: false,
    rm:true,
    newc:'',
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(queryTask, payload);
      yield put({
        type: 'saveTask',
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
        const response = yield call(AddTask, payload);
        yield put({
          type: 'addTask',
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
      const response = yield call(DeleteTask, payload);
      yield put({
        type: 'removeTask',
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
      const response = yield call(UpdateTask, payload);
      yield put({
        type: 'editTask',
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
    saveTask(state, action) {
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
    addTask(state, action) {
      return {
        ...state,
        newc: action.payload,
      };
    },
    removeTask(state,action) {
      return {
        ...state,
        rm: action.payload,
      }; 
    }
  },
};
