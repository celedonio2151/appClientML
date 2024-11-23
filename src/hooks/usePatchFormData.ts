import axios from 'axios';
import {config} from '../config/environment';
const SERVER = config.SERVER;

interface RequestParams {
  endpoint: string;
  data?: Object | string;
  token?: string;
}

// Improved error handling function
const handleAxiosError = (error: any) => {
  if (error.response) {
    return Promise.reject(error.response.data); // Return a rejected Promise with error data
  } else if (error.request) {
    return Promise.reject({message: 'No se pudo conectar al servidor'}); // Return a rejected Promise with a specific message
  } else {
    return Promise.reject('Ocurrió un error inesperado'); // Return a rejected Promise with a generic message
  }
};

// Modified usePost function without cancellation
export default async function usePatchFormData(
  endpoint: string,
  data?: any,
  token?: string,
) {
  // const {endpoint, data, token} = params; // Destructure parameters
  console.log(`This is the server: editando ${SERVER}${endpoint}`);

  try {
    const response = await axios.patch(`${SERVER}${endpoint}`, data, {
      headers: {Authorization: `Bearer ${token}`},
    });
    console.log(response.data);

    return response.data;
  } catch (error) {
    return handleAxiosError(error); // Delegate error handling
  }
}
