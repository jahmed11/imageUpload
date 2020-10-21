import React from "react";
import Register from "./containers/register/register";
import Users from "./containers/Users/user";
import { BrowserRouter, Route, Switch, NavLink } from "react-router-dom";
import styled from "styled-components";

const Header = styled.div`
  width: 100%;
  background-color: black;
  height: 70px;
  position: fixed;
  top: 0;
  left: 0;
`;
const NAV = styled.div`
  text-align: center;
  margin-top: 22px;
  a {
    margin: 0 15px;
    font-size: 20px;
    color: white;
    :hover {
      text-decoration: none;
      color: green;
    }
    .active {
      color: green;
    }
  }
`;
const Ul = styled.ul`
  padding: 0;
  margin: 0;
`;

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Header>
          <NAV>
            <Ul>
              <NavLink to="/users">Users</NavLink>
              <NavLink exact to="/">
                Registration
              </NavLink>
            </Ul>
          </NAV>
        </Header>
        <Switch>
          <Route exact path="/" component={Register} />
          <Route path="/users" component={Users} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
