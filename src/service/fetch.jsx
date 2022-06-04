import Taro from '@tarojs/taro';

// Fetch(url, data).then((res) => { console.log(res)})

const preHttp = 'http://119.3.2.168:4016/';
const Fetch = (url, data = {}, method = 'GET') => {
  console.log(url)
  const header = {
    'content-type': 'application/json',
    token: Taro.getStorageSync('token')
    // token:
    //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdHVkZW50X2lkIjoiMjAyMTIxMzk0NyIsImV4cCI6MTY0Nzg3NjU5NSwiaWF0IjoxNjQ3MTU2NTk1fQ.MQ-Zo7T36Hj6ANcAZdYGlEuTNgC2eXcRE4y_PHSbWJA

    // token:
    //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdHVkZW50X2lkIjoiMjAyMTIxMzk0NyIsImV4cCI6MTY0Nzg3ODU4MSwiaWF0IjoxNjQ3MTU4NTgxfQ.F_qqSzgWwIA9cjbR4VSCD5BEJukVuYoCrKKo2grkb64

  };
  
  return Taro.request({
    url: preHttp + url,
    data,
    method,
    header
  }).then(res => {
    console.log(res, 111);
    switch (res.statusCode) {
      case 200:
        if (res.data) {
          return res.data;
        } else {
          return res.statusCode; // 业务逻辑错误，返回业务错误码
        }
      case 400:
        throw new Error('没有权限访问');
      case 401:
        throw new Error('未授权');
      case 404:
        throw new Error('not found');
      case 500:
        throw new Error('服务器错误');
    }
  }).catch(e => console.log(e))
};

export default Fetch;
