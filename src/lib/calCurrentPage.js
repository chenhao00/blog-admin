// 删除时计算当前页数
export default function calCurrentPage(currentPage, total, pageSize = 10) {
  const totalPage = Math.ceil((total - 1) / pageSize);
  let page;
  page = currentPage > totalPage ? totalPage : currentPage;
  page = page < 1 ? 1 : page;
  return page;
}
