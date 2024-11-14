import {useState, useEffect, useRef} from 'react';
import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';
import {config} from '../config/environment';

type FetchApi<T> = {
  data: null | T;
  error: string | null;
  loading: boolean;
  isCancelled?: boolean;
};

type PropsType = {
  endpoint: string;
  token?: string;
  eventTrigger?: Date;
};

export default function useFetch<T>(
  endpoint: string,
  token: string | null,
  eventTrigger?: Date,
): [T | null, boolean, string | null, () => void] {
  // const {endpoint, token, eventTrigger} = parameters;
  const [state, setState] = useState<FetchApi<T>>({
    data: null,
    error: null,
    loading: false,
  });
  const [controller, setController] = useState<AbortController>(
    new AbortController(),
  );
  const [timeOut, setTimeoutCustom] = useState<any>();

  // const newAbortSignal = (timeoutMs: number) => {
  //   const abortController = new AbortController();
  //   setTimeout(() => abortController.abort(), timeoutMs || 0);

  //   return abortController.signal;
  // };

  useEffect(() => {
    const abortController = new AbortController();

    setController(abortController);
    setState(prevState => ({...prevState, loading: true}));
    axios
      .get(`${config.SERVER}${endpoint}`, {
        headers: {Authorization: `Bearer ${token}`}, // Agrega el token al encabezado si está presente
        signal: controller.signal,
      })
      .then(response => {
        // console.log(response.data);
        // const id = setTimeout(() => {
        setState({data: response.data, error: null, loading: false});
        // }, 1000);
        // setTimeoutCustom(id);
      })
      .catch(err => {
        // console.log(err.response.data);
        setState({
          data: null,
          error: err.response?.data || err.message,
          loading: false,
        });
      })
      .finally(() => {
        clearTimeout(timeOut);
      });

    return () => controller.abort();
  }, [endpoint, token, eventTrigger]);

  const handleCancelRequest = () => {
    if (controller) {
      controller.abort();
    }
  };

  return [state.data, state.loading, state.error, handleCancelRequest];
}
