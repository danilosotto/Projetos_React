import { useReducer, useEffect } from "react";
import axios from "axios";

axios.defaults.validateStatus = (code) => code < 500;

const INITIAL_STATE = {
  loading: false,
  payload: {},
  error: "",
};

const getAuth = () => {
  const token = localStorage.getItem("token");
  if (token) {
    return `?auth=${token}`;
  }
  return "";
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

  if (action.type === "FAILURE") {
    return {
      ...state,
      loading: false,
      error: action.error,
    };
  }

  return state;
};

export const usePost = (resource) => {
  const [data, dispatch] = useReducer(reducer, INITIAL_STATE);
  const post = async (payload) => {
    try {
      dispatch({ type: "REQUEST" });
      const response = await axios.post(resource, payload);

      if (response.data.error && Object.keys(response.data.error).length > 0) {
        dispatch({ type: "FAILURE", error: response.data.error.message });
      } else {
        dispatch({ type: "SUCCESS", payload: response.data });
      }
    } catch (error) {
      dispatch({ type: "FAILURE", error: "unkown error" });
    }
  };

  return [data, post];
};

const init = (baseURL) => {
  const useGet = (resource) => {
    const [data, dispatch] = useReducer(reducer, INITIAL_STATE);

    const carregar = async () => {
      try {
        dispatch({ type: "REQUEST" });
        const response = await axios.get(
          baseURL + resource + ".json" + getAuth()
        );
        if (
          response.data.error &&
          Object.keys(response.data.error).length > 0
        ) {
          dispatch({
            type: "FAILURE",
            error: response.data.error,
          });
        } else {
          dispatch({ type: "SUCCESS", payload: response.data });
        }
      } catch (error) {
        dispatch({ type: "FAILURE", error: "unkown error" });
      }
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
      const response = await axios.post(
        baseURL + resource + ".json" + getAuth(),
        payload
      );
      dispatch({ type: "SUCCESS", payload: response.data });
    };

    return post;
  };

  const usePatch = (resource) => {
    const [data, dispatch] = useReducer(reducer, INITIAL_STATE);

    const patch = async (payload) => {
      dispatch({ type: "REQUEST" });
      const response = await axios.patch(
        baseURL + resource + ".json" + getAuth(),
        payload
      );
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
