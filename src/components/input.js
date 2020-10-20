import React from "react";
import styled from "styled-components";

const Label = styled.label`
  display: block;
  text-transform: capitalize;
`;
const InputDiv = styled.div`
  width: 350px;
  margin: 5px auto;
`;
const input = (props) => {
  return (
    <InputDiv className="form-group">
      <Label htmlFor={props.name}>{props.name}</Label>
      <input
        className="form-control"
        type={props.type}
        placeholder={props.placeholder}
        name={props.name}
        value={props.value}
        onChange={props.changed}
      />
    </InputDiv>
  );
};

export default input;
