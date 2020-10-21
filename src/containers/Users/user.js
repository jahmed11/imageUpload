import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

const UserWrapper = styled.div`
  margin-top: 100px;
`;
const Heading = styled.h1`
  margin: 0 auto;
  text-align: center;
`;

const Users = () => {
  const [data, setData] = useState();
  useEffect(() => {
    //getting user data from dynamoDB
    axios
      .get(
        "https://tsrhzalmek.execute-api.ap-south-1.amazonaws.com/test/users/1122"
      )
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <UserWrapper>
      <Heading>Users</Heading>
      {data ? data : <p style={{ textAlign: "center" }}>no users available</p>}
    </UserWrapper>
  );
};

export default Users;
