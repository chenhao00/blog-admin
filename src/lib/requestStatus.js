export default function requestStatus(res) {
  if (res.code === 1) {
    this.errorMsg = res.msg;
  } else if (res.code === -1) {
    this.$message({
      message: '登陆失效，请重新登陆',
      type: 'error',
      duration: 1000,
      onClose: () => {
        console.log('退出登陆');
        this.$bus.$emit('showLogin');
      }
    });
    return;
  } else if (res.status === 500) {
    this.errorMsg = '系统异常，请稍后再试';
  } else if (res.status === 404 || res.status === 401 || res.status === 403) {
    this.errorMsg = '网络错误';
  }
  this.$message(this.errorMsg);
}
