import axios from "axios";
import { createContext, useCallback, useReducer } from "react";
import {SCRAPER_API_URL} from '../contants'
import basedata from './basedata'

export const NewsContext = createContext([basedata, () => '']);

export const NewsContextProvider = ({ children }) => {
  const reducer = (prevState, updatedProperty) => ({
    ...prevState,
    ...updatedProperty,
  });

  const [newsState, setNewsState] = useReducer(reducer, {
    loading: null,
    error: null,
    errorCode: null,
    data: null,
  });

  const fetchNews = useCallback(async () => {
    setNewsState({
      loading: true,
      error: null,
    });

    try {
      const response = await axios.get(`${SCRAPER_API_URL}/latest`);
      setNewsState({
        loading: false,
        error: null,
        data: response.data.data,
      });
    } catch (err) {
      console.log(err)
      setNewsState({
        loading: false,
        error: err
      })
    }
  }, []);

  return (
    <NewsContext.Provider value={[newsState, fetchNews]}>
      {children}
    </NewsContext.Provider>
  );
}

