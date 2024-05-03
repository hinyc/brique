import axios from 'axios';

export const getRandomResponse = async () => {
  //직접 호출시 CORS 에러가 발생하기 때문에
  //local sever를 통해 우회하여 데이터를 가져온다.
  //http://codingtest.brique.kr:8080/random

  const api = `${import.meta.env.VITE_API_URL}/random`;

  return await axios
    .get(api)
    .then((response) => {
      return { status: response.status, data: response.data };
    })
    .catch((error) => {
      return {
        status: error.message === 'Network Error' ? 500 : error.response.status,
        data: { message: error.message }
      };
    });
};
