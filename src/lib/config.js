// 生产环境地址
const configProduction = {
  backendBaseUrl: ''
};

// 测试环境地址
const configDev = {
  backendBaseUrl: 'http://localhost:3001'
};

const config = () => {
  if (process.env.NODE_ENV === 'production') {
    return configProduction;
  }
  return configDev;
};

export default config();
