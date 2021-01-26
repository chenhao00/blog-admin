// 过滤无效参数
export default function filterQuery(basePath, form) {
  let queryArr = [];
  for (const key in form) {
    if (form[key] !== null && form[key] !== '') {
      queryArr.push(`${key}=${form[key]}`);
    }
  }
  const path = `${basePath}${basePath.indexOf('?') > -1 ? '&' : '?'}${queryArr.join('&')}`;
  return queryArr.length > 0 ? path : basePath;
}
