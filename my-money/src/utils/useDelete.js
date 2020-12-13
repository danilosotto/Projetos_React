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
    };
  }
  return state;
};

const useDelete = () => {
  const [data, dispatch] = useReducer(reduce, { loading: false });

  const remove = (url) => {
    dispatch({ type: "REQUEST" });
    axios.delete(url).then((response) => {
      dispatch({ type: "SUCCESS"});
    }); 
  };

  return [data, remove];
};

export default useDelete;
