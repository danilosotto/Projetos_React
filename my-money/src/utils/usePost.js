import { useReducer } from "react";
import axios from "axios";

const reduce = (state, action) => {
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

const usePost = (url) => {
  const [data, dispatch] = useReducer(reduce, { loading: false, payload: {} });

  const post = (payload) => {
    dispatch({ type: "REQUEST" });
    axios.post(url, payload).then((response) => {
      dispatch({ type: "SUCCESS", payload: response.data });
    });
  };
  return [data, post];
};

export default usePost;
