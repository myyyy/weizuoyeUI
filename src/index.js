import 'babel-polyfill';
import dva from 'dva';
import 'moment/locale/zh-cn';
import browserHistory from 'history/createBrowserHistory';
import './g2';
import './rollbar';
import './index.less';

// 1. Initialize
const app = dva({
  history: browserHistory(),
});

// 2. Plugins
// app.use({});

// 3. Register global model
app.model(require('./models/global'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
