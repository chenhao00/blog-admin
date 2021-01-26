import axiosConfig from './axiosUtils';
import requestStatus from './requestStatus';
import config from './config';

const install = (Vue) => {
  // eventBus
  Vue.prototype.$bus = new Vue();
  // 参数配置
  Vue.prototype.$config = config;
  // 网络请求
  Vue.prototype.$http = axiosConfig;
  // 错误处理
  Vue.prototype.$requestStatus = requestStatus;
};

export default install;
