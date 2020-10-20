import React, { useRef } from "react";
import styled from "styled-components";

const WrapperImg = styled.div`
  text-align: center;
`;
const ImageUploaded = styled.img`
  display: block;
  width: 350px;
  height: 300px;
  border: 1px solid;
  text-align: center;
  margin: 10px auto;
`;

const ImageUpload = (props) => {
  console.log(props);
  const filePicker = useRef();

  return (
    <WrapperImg>
      <input
        ref={filePicker}
        type="file"
        accept=".jpg,.png,.jpeg"
        onChange={props.imageUploaded}
        style={{ display: "none" }}
      />
      <ImageUploaded src={props.preview} alt="preview" />

      <button
        className="btn btn-outline-secondary"
        type="button"
        onClick={() => filePicker.current.click()}
      >
        upload
      </button>
    </WrapperImg>
  );
};

export default React.memo(ImageUpload);
