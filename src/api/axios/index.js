import _ from "axios";

const baseURL = process.env.REACT_APP_DICTIONARY_API_URL;
const apiTimeout = process.env.REACT_APP_DICTIONARY_API_TIMEOUT;

const axios = _.create({
  baseURL,
});
axios.defaults.timeout = apiTimeout;

axios.interceptors.request.use(
  (request) => {
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const promise = Promise.reject(error);
    promise.catch((err) => {
      return Promise.reject(err);
    });
    return promise;
  }
);

export default axios;
