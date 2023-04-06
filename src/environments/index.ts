// 通过process.env.NODE_ENV区分环境变量
// 开发环境：development,
// 生成环境: production,
// 测试环境： test
let BASE_URL = ''
const TIME_OUT = 10000
if (process.env.NODE_ENV === 'development') {
  BASE_URL = '/api'
} else if (process.env.NODE_ENV === 'production') {
  BASE_URL = '123'
} else {
  BASE_URL = '234'
}
export { BASE_URL, TIME_OUT }
