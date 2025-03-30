import axios from 'axios';

const callPublicRoute = async (requestConfig) => {
  const axiosResponse = await axios({
    baseURL: `${import.meta.env.VITE_SERVER_URL}/api`,
    ...requestConfig
  });
  return axiosResponse;
};

export { callPublicRoute };
