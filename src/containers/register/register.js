import React, { useState, useEffect, useCallback } from "react";
import Input from "../../components/input.js";
import { useSelector, useDispatch } from "react-redux";
import ImageUpload from "../../components/addImage";
import styled from "styled-components";
import * as actionCreators from "../../store/actions/form";
import axios from "axios";
const ButtonDiv = styled.div`
  text-align: center;
  margin-top: 10px;
  button: {
    width: 350px;
  }
`;

const Register = () => {
  const [file, setFile] = useState();
  const [preview, setPreview] = useState();

  const form = useSelector((state) => state.forms);
  const dispatch = useDispatch();
  let elements = [];
  for (let key in form) {
    elements.push({
      id: key,
      config: form[key],
    });
  }
  const changedHandler = (event) => {
    dispatch(actionCreators.formValue(event.target.name, event.target.value));
  };

  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    console.log(file);
    fileReader.onload = () => {
      setPreview(fileReader.result);
    };
  }, [file]);
  const imageUploaded = useCallback(
    (event) => {
      console.log(event.target.files);
      if (event.target.files && event.target.files.length === 1) {
        const image = event.target.files[0];
        console.log(image, "image");
        setFile(image);
      }
    },
    [setFile]
  );
  const formSubmitted = (event) => {
    event.preventDefault();
    const form_data = new FormData();
    form_data.append(`firstName`, form.firstName.value);
    form_data.append("lasttName", form.lastName.value);
    form_data.append("email", form.email.value);
    form_data.append("image", file, file.name);
    console.log(form_data.keys());
    const userData = {
      id: "1452",
      firstName: "Junaid",
      lastName: "Ahmed",
    };
    axios
      .post(
        "https://tsrhzalmek.execute-api.ap-south-1.amazonaws.com/test/users",
        JSON.stringify(userData)
      )
      .then((response) => console.log(response.data))
      .catch((err) => console.log(err));
  };
  return (
    <>
      <form onSubmit={formSubmitted}>
        <ImageUpload preview={preview} imageUploaded={imageUploaded} />
        {elements.map((item) => {
          return (
            <Input
              key={item.id}
              type={item.config.type}
              placeholder={item.config.placeholder}
              name={item.config.name}
              value={item.config.value}
              changed={changedHandler}
            />
          );
        })}
        <ButtonDiv>
          <button className="btn btn-outline-primary" type="submit">
            Submit
          </button>
        </ButtonDiv>
      </form>
    </>
  );
};

export default Register;
