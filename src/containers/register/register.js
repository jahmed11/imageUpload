import React, { useState, useEffect, useCallback } from "react";
import Input from "../../components/input.js";
import { useSelector, useDispatch } from "react-redux";
import ImageUpload from "../../components/addImage";
import styled from "styled-components";
import * as actionCreators from "../../store/actions/form";
import { uploadFile } from "react-s3";
const config = {
  bucketName: "my-bucket147",
  dirName: "media",
  region: "ap-south-1",
  accessKeyId: accessKeyId,
  secretAccessKey: secretAccessKey,
};
const ButtonDiv = styled.div`
  text-align: center;
  margin-top: 10px;
  button: {
    width: 350px;
  }
`;
const Form = styled.div`
  margin-top: 100px;
`;
const Register = () => {
  const [file, setFile] = useState();
  const [preview, setPreview] = useState();

  const form = useSelector((state) => state.forms);
  const dispatch = useDispatch();
  const postRequest = useDispatch();
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
    fileReader.onload = () => {
      setPreview(fileReader.result);
    };
  }, [file]);
  const imageUploaded = useCallback(
    (event) => {
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

    //uplaoding file to S3 bucket
    uploadFile(file, config)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    //sending data to dynamoDB using lambda function
    postRequest(
      actionCreators.formSubmit(
        form.firstName.value,
        form.lastName.value,
        form.email.value
      )
    );
  };
  return (
    <>
      <Form onSubmit={formSubmitted}>
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
      </Form>
    </>
  );
};

export default Register;
