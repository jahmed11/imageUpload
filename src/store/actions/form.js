import * as actionType from "./actions";

export const formValue = (name, value) => {
  return {
    type: actionType.FORM,
    name,
    value,
  };
};
