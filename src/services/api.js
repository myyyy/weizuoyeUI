import { stringify } from 'qs';
import request from '../utils/request';

export async function queryProjectNotice() {
  return request('/api/project/notice');
}

export async function queryActivities() {
  return request('/api/activities');
}

export async function queryRule(params) {
  return request(`/api/rule?${stringify(params)}`);
}

export async function removeRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function fakeSubmitForm(params) {
  return request('/api/forms', {
    method: 'POST',
    body: params,
  });
}

export async function fakeChartData() {
  return request('/api/fake_chart_data');
}

export async function queryTags() {
  return request('/api/tags');
}

export async function queryBasicProfile() {
  return request('/api/profile/basic');
}

export async function queryAdvancedProfile() {
  return request('/api/profile/advanced');
}

export async function queryFakeList(params) {
  return request(`/api/fake_list?${stringify(params)}`);
}

export async function fakeAccountLogin(params) {
  return request('/login', {
    method: 'POST',
    body: params,
  });
}

export async function fakeRegister(params) {
  return request('/api/register', {
    method: 'POST',
    body: params,
  });
}

export async function queryNotices() {
  return request('/api/notices');
}

export async function queryCourse() {
  return request('/course');
}

export async function AddCourse(params) {
  return request('/course', {
    method: 'POST',
    body: params,
  });
}

export async function UpdateCourse(params) {
  return request('/course', {
    method: 'PUT',
    body: params,
  });
}

export async function DeleteCourse(params) {
  return request('/course', {
    method: 'DELETE',
    body: params,
  });
}

export async function queryTask() {
  return request('/task');
}

export async function AddTask(params) {
  return request('/task', {
    method: 'POST',
    body: params,
  });
}

export async function UpdateTask(params) {
  return request('/task', {
    method: 'PUT',
    body: params,
  });
}

export async function DeleteTask(params) {
  return request('/task', {
    method: 'DELETE',
    body: params,
  });
}
