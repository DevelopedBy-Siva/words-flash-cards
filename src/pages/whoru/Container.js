import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import FontSize from "../../assets/styles/FontSizes.json";
import { isUsernameValid } from "../../utils/Validate";
import { createUser } from "../../utils/User";
import Spinner from "../../components/loader/Spinner";
import Wrapper from "../../components/wrapper";

export default function Container() {
  const inputRef = useRef(null);
  const [name, setName] = useState({
    value: "",
    error: null,
    status: false,
    loading: false,
  });

  const navigate = useNavigate();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.status) return;

    setName({ ...name, loading: true });
    inputRef.current.disabled = true;

    try {
      createUser(name.value);
      return navigate("/");
    } catch (ex) {
      inputRef.current.disabled = false;
      setName({ ...name, loading: false });
    }
  }

  function handleInputChange(e) {
    const val = e.target.value;
    const newVal = val.replace(/  +/g, " ");

    const isValid = /^[A-Za-z\s]*$/.test(newVal);
    if (!isValid) return;

    const error = isUsernameValid(newVal);
    if (error) {
      setName({ status: false, error, value: newVal });
      return;
    }
    setName({ status: true, error: null, value: newVal });
  }

  return (
    <Wrapper stretch contain spaceAround center>
      <Content>
        <Prefix>I'm</Prefix>
        <InputContainer user={name} onSubmit={handleSubmit}>
          <Input
            value={name.value}
            onChange={handleInputChange}
            spellCheck="false"
            type="text"
            ref={inputRef}
            user={name}
          />
          {name.error && <Error>{name.error}</Error>}
        </InputContainer>
      </Content>
      {name.loading && <Spinner top="20px" left="50%" size={2} />}
    </Wrapper>
  );
}

const Content = styled.div`
  width: 80%;
  margin: auto;
  @media screen and (max-width: 800px) {
    width: 100%;
  }
`;

const Prefix = styled.span`
  display: block;
  font-weight: 700;
  color: white;
  letter-spacing: 4px;
  font-size: ${FontSize.WRU.PRF};
  @media screen and (max-width: 800px) {
    font-size: ${FontSize.WRU.PRF_800};
  }
`;

const InputContainer = styled.form`
  padding-bottom: 5px;
  border-bottom: ${(props) =>
    `1px solid ${
      props.user.error ? props.theme.border.error : props.theme.border.light
    }`};
  margin-top: 15px;
  position: relative;
`;

const Error = styled.span`
  color: ${(props) => props.theme.text.error};
  font-size: 0.7rem;
  position: absolute;
  bottom: -18px;
  left: 0;
`;

const Input = styled.input`
  background: none;
  border: none;
  outline: none;
  font-weight: 700;
  text-transform: uppercase;
  color: ${(props) =>
    props.user.error ? props.theme.text.error : props.theme.text.wru};
  font-size: ${FontSize.WRU.VAL};
  width: 100%;
  letter-spacing: 2px;
  @media screen and (max-width: 500px) {
    font-size: ${FontSize.WRU.VAL_800};
  }
`;
