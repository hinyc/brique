import axios from 'axios';

export const simpleRequest = async (value: string) => {
  const date = new Date();
  const api = import.meta.env.VITE_API_URL;

  const result = await axios
    .get(api, {
      params: {
        text: value.length === 0 ? 'Ping' : value,
        time: date.getTime()
      }
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return {
        status: error.message === 'Network Error' ? 500 : error.response.status,
        message: error.message
      };
    });

  return result;
};
