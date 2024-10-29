import {useState, useRef} from 'react';
import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';
import {config} from '../config/environment';

export default function useFetchEvent(endpoint: string, token?: string | null) {
  const source = axios.CancelToken.source();
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get(`${config.SERVER}${endpoint}`, {
        headers: {Authorization: `Bearer ${token}`},
        cancelToken: source.token,
      });
      resolve(response.data);
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log('Request canceled', error.message);
      } else {
        // console.error("Axios error", error);
        reject(handleAxiosError(error));
      }
    }
  });
}

const handleAxiosError = error => {
  if (error.response) {
    return error.response.data;
  } else if (error.request) {
    return 'No se pudo conectar al servidor';
  } else {
    return 'Ocurrió un error inesperado';
  }
};
