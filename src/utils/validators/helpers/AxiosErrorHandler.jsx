const AxiosErrorHandler = (instance) => {
  instance.interceptors.response.use(config => {
    return config;
  }, error => {
    if (error.response.status >= 400 && error.response.status <= 499) {
      console.log(`Client error ${error.response.status}`)
      window.location.href = '/400'
      return Promise.reject(error);
    } 
    if(error.response.status >= 500 && error.response.status <= 599){
      console.log(`Server error ${error.response.status}`)
      window.location.href = '/500'
      return Promise.reject(error);
    }
    else {
      throw error;
    }
  });
}

export default AxiosErrorHandler