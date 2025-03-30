import axios from 'axios';

const callPublicRoute = async (requestConfig) => {
  const axiosResponse = await axios({
    baseURL: 'http://localhost:8000/api',
    ...requestConfig
  });
  return axiosResponse;
};

export { callPublicRoute };
