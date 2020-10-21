import * as actionType from "../actions/actions";

const initialState = {
  test: "test",
  forms: {
    firstName: {
      type: "text",
      placeholder: "firstName",
      name: "firstName",
      value: "",
    },
    lastName: {
      type: "text",
      placeholder: "",
      name: "lastName",
      value: "",
    },
    email: {
      type: "email",
      placeholder: "email",
      name: "email",
      value: "",
    },
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.FORM:
      return {
        ...state,
        forms: {
          ...state.forms,
          [action.name]: {
            ...state.forms[action.name],
            value: action.value,
          },
        },
      };
    default:
      return state;
  }
};

export default reducer;
