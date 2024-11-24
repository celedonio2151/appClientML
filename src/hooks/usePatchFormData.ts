import axios from 'axios';
import {config} from '../config/environment';
const SERVER = config.SERVER;

interface RequestParams {
  endpoint: string;
  data?: Object | string;
  token?: string;
}
export default async function usePatchFormData(
  endpoint: string,
  data?: any,
  token?: string,
) {
  // const {endpoint, data, token} = params; // Destructure parameters
  const URL = `${SERVER}${endpoint}`;
  console.log(`This is the server: editando ${URL}`);
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.patch(`${URL}`, data, {
        headers: {Authorization: `Bearer ${token}`},
      });
      resolve(response.data);
    } catch (err) {
      console.log('🚀 ~ returnnewPromise ~ err:', err);
      reject(handleAxiosError(err));
    }
  });
}

// Improved error handling function
const handleAxiosError = error => {
  if (error.response) return error.response.data;
  if (error.request) {
    return {message: 'No se pudo conectar al servidor'};
  } else {
    return {message: 'Ocurrió un error inesperado'};
  }
};
