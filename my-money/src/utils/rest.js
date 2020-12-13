import { useReducer, useEffect } from "react";
import axios from "axios";

const INITIAL_STATE = {
  loading: false,
  payload: {},
};

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

const init = (baseURL) => {
  const useGet = (resource) => {
    const [data, dispatch] = useReducer(reducer, INITIAL_STATE);

    const carregar = async () => {
      dispatch({ type: "REQUEST" });
      const response = await axios.get(baseURL + resource + ".json");
      dispatch({ type: "SUCCESS", payload: response.data });
    };

    useEffect(() => {
      carregar();
    }, []);

    return {
      ...data,
      refetch: carregar,
    };
  };

  const usePost = (resource) => {
    const [data, dispatch] = useReducer(reducer, INITIAL_STATE);
    const post = async (payload) => {
      dispatch({ type: "REQUEST" });
      const response = await axios.post(baseURL + resource + ".json", payload);
      dispatch({ type: "SUCCESS", payload: response.data });
    };

    return post;
  };

  const usePatch = () => {
    const [data, dispatch] = useReducer(reducer, INITIAL_STATE);

    const patch = async (resource, payload) => {
      dispatch({ type: "REQUEST" });
      const response = await axios.patch(baseURL + resource + ".json", payload);
      dispatch({ type: "SUCCESS", payload: response.data });
    };

    return [data, patch];
  };

  return {
    useGet,
    usePost,
    usePatch,
  };
};

export default init;
