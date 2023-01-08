import _ from "axios";

// const baseURL = process.env.REACT_APP_DICTIONARY_API_URL;
const apiTimeout = process.env.REACT_APP_DICTIONARY_API_TIMEOUT;

const axios = _.create({
  baseURL: "https://od-api.oxforddictionaries.com/api/v2/en",
  headers: {
    app_id: "3f203c25",
    app_key: "127c439e10eda233218e9252b916e2b1",
  },
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
