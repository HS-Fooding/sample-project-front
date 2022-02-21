import React, { useEffect, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import Header from "./Header";
import { Link } from "react-router-dom";
import GlobalStyle from "../GlobalStyle";

const Container = styled.div`
  border: 1px solid black;
  width: 350px;
  height: 600px;
  position: relative;
  box-sizing: border-box;
  display:flex;
  justify-content:center;
  align-items:flex-start;
`;

const FormContainer = styled.div`
  margin-top:70px;
  width:350px;
  height:300px;
  display:flex;
  flex-direction:column;
  align-items:center;
  & form{
    display:flex;
    flex-direction:column;
    align-items:center;
    width:100%;
  }
  & input{
    width:80%;
    padding-bottom:10px;
    font-size:18px;
    outline:none;
    border:none;
    border-bottom:solid 3px gray;
    margin-bottom:30px;
  }
  & input:focus,:hover{
    outline:none;
  }
`;
const Icon = styled.div`
  font-size:80px;
  width:110px;
  height:90px;
  margin-bottom:10px;
`;
const Title = styled.div`
  font-size:10px;
`;
const LoginBut = styled.button`
  width:80%;
  height:35px;
  font-size:15px;
  border:none;
  border-radius:10px;
  color:white;
  background-color: ${(props) => props.theme.mainColor};
  &:focus,:hover{
    cursor:pointer;
  }
`;
const SignUpBut = styled.button`
width:280px;
height:35px;
font-size:15px;
border:none;
border-radius:10px;
color:white;
background-color: ${(props) => props.theme.subColor};
&:focus,:hover{
  cursor:pointer;
}
`;
const Login=()=>{
const [id,setId] = useState();
const [ps,setPs] = useState();

const changeId=(e)=>{setId(e.target.value);}
const changePs=(e)=>{setPs(e.target.value);}
const submitLogin=(e)=>{
  e.preventDefulat();


}
    return(
      <Container>
      <Link to={"/"}>
      <Header title={"로그인"} />
    </Link>
    <FormContainer>
    <Icon>🍮</Icon>

    <form>
      {/* <Title>Id</Title> */}
      <input type="text" onChange={changeId} placeholder="ID" />
      {/* <Title>Password</Title> */}
      <input type="text" onChange={changePs} placeholder="Password" />
      <LoginBut onClick={submitLogin}>Log in</LoginBut>
      <br />OR <br /> <br />
      <Link to="/sign"><SignUpBut>Sign Up</SignUpBut>
      </Link>
    </form>
    
    </FormContainer>
    </Container>
    );
}
export default Login;