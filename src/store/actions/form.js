import axios from "axios";
import * as actionType from "./actions";

export const formValue = (name, value) => {
  return {
    type: actionType.FORM,
    name,
    value,
  };
};

export const formSubmit = (first, last, email) => {
  return (dispatch) => {
    const user = {
      first,
      last,
      email,
    };
    //axios.post( user);
  };
};
