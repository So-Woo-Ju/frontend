import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://3.34.255.82/api/v1',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

//request 처리
// axiosInstance.interceptors.request.use(
//   function (config) {

//     return config;
//   },
//   function (error) {
//     console.log(error);
//     return Promise.reject(error);
//   }
// );

//response 처리
// axiosInstance.interceptors.response.use(
//   function (response) {
//     return response.data.data;
   
//   },
//   function (error) {
//   }
// );

export default axiosInstance;