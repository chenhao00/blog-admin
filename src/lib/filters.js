// 全局过滤器
import moment from 'moment';

const filters = {
  // 格式化时间戳为北京时间(秒)
  formateDate(toFormateDate, fmt = 'YYYY-MM-DD HH:mm:ss') {
    if (toFormateDate) {
      return moment.unix(toFormateDate).format(fmt);
    }
  }
};

export default filters;
