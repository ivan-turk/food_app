// Interceptor "sluša" zahtjeve (request/response) prema serveru te ćemo ga koristiti za Loading animaciju

import axios from "axios";

export const setLoadingInterceptor = ({ showLoading, hideLoading }) => {
  //request prema serveru:
  axios.interceptors.request.use(
    (req) => {
      showLoading();
      return req;
    },
    (error) => {
      hideLoading();
      return Promise.reject(error);
    }
  );

  //resposnse sa servera prema klijentu:
  axios.interceptors.response.use(
    (res) => {
      hideLoading();
      return res;
    },
    (error) => {
      hideLoading();
      return Promise.reject(error);
    }
  );
};

export default setLoadingInterceptor;
