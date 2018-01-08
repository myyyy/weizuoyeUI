import dynamic from 'dva/dynamic';

// wrapper of dynamic
const dynamicWrapper = (app, models, component) => dynamic({
  app,
  models: () => models.map(m => import(`../models/${m}.js`)),
  component,
});

// nav data
export const getNavData = app => [
  {
    component: dynamicWrapper(app, ['user', 'login'], () => import('../layouts/BasicLayout')),
    layout: 'BasicLayout',
    name: '首页',
    path: '/workplace',
    children: [
      {
        name: '工作台',
        icon: 'dashboard',
        path: 'workplace',
        component: dynamicWrapper(app, ['project', 'activities', 'chart'], () => import('../routes/Index/Workplace')),
      },
      {
        name: '课程',
        path: 'course',
        icon: 'file',
        component: dynamicWrapper(app, ['course'], () => import('../routes/Course/Course')),
      },
      {
        name: '习题',
        path: 'task/:id',
        icon: 'file',
        component: dynamicWrapper(app, ['task'], () => import('../routes/Task/Task')),
      },
    ],
  },
  {
    component: dynamicWrapper(app, [], () => import('../layouts/UserLayout')),
    path: '/user',
    layout: 'UserLayout',
    children: [
      {
        name: '帐户',
        icon: 'user',
        path: 'user',
        children: [
          {
            name: '登录',
            path: 'login',
            component: dynamicWrapper(app, ['login'], () => import('../routes/User/Login')),
          },
          {
            name: '注册',
            path: 'register',
            component: dynamicWrapper(app, ['register'], () => import('../routes/User/Register')),
          },
          {
            name: '注册结果',
            path: 'register-result',
            component: dynamicWrapper(app, [], () => import('../routes/User/RegisterResult')),
          },
        ],
      },
    ],
  },
];
