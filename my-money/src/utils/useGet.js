import { useReducer, useEffect } from "react";
import axios from "axios";

const reducer = (state, action) => {
  if (action.type === "REQUEST") {
    return {
      ...state,
      loading: true,
    };
  }

  if (action.type === "SUCCESS") {
    return {
      ...state,
      loading: false,
      payload: action.payload,
    };
  }
  return state;
};

export const useGet = (url) => {
  const [data, dispatch] = useReducer(reducer, {
    loading: false,
    payload: {},
  });

  useEffect(() => {
    dispatch({ type: "REQUEST" });
    axios.get(url).then((response) => {
      dispatch({ type: "SUCCESS", payload: response.data });
    });
  }, []);

  return data;
};

export default useGet;
