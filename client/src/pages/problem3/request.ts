import axios from 'axios';

export const requestEmployees = async () => {
  const api = `${import.meta.env.VITE_API_URL}/employees`;

  const result = await axios
    .get(api)
    .then((response) => {
      console.log('response');
      console.log(response);
      return response.data;
    })
    .catch((error) => {
      return {
        status: error.message === 'Network Error' ? 500 : error.response.status,
        message: error.message,
      };
    });

  return result;
};
