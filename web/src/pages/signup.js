import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useMutation, useApolloClient, gql } from '@apollo/client';

import Button from '../components/Button';

const SIGNUP_USER = gql`
  mutation signUp($email: String!, $username: String!, $password: String!) {
    signUp(email: $email, username: $username, password: $password)
  }
`;

const Wrapper = styled.div`
  border: 1px solid #f5f4f0;
  max-width: 500px;
  padding: 1em;
  margin: 0 auto;
`;

const Form = styled.form`
  label,
  input {
    display: block;
    line-height: 2em;
  }

  input {
    width: 100%;
    margin-bottom: 1em;
  }
`;

const SignUp = (props) => {
  const [values, setValues] = useState();

  // update the state when a user types in the form
  const onChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    document.title = 'Sign Up - Notedly';
  });

  //Apollo Client
  // const client = useApolloClient();

  console.log('hello');
  //Mutation hook
  const [signUp, { loading, error }] = useMutation(SIGNUP_USER, {
    onCompleted: (data) => {
      console.log('inside complete');
      //logs the JSON web token when mutation is complete
      console.log(data.signUp);

      // //store the JWT in localstorage
      // localStorage.setItem('token', data.signUp);
      // //update the local cache
      // client.writeData({ data: { isLoggedIn: true } });
      // //redirect the user to the homepage
      // props.history.push('/');
    },
  });

  return (
    <Wrapper>
      <h2>Sign Up</h2>
      <Form
        onSubmit={(event) => {
          event.preventDefault();
          console.log(values);
          signUp({
            variables: {
              ...values,
            },
          });
        }}
      >
        <label htmlFor="username">Username:</label>
        <input
          required
          type="text"
          id="username"
          name="username"
          placeholder="username"
          onChange={onChange}
        />
        <label htmlFor="email">Email:</label>
        <input
          required
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          onChange={onChange}
        />
        <label htmlFor="password">Password:</label>
        <input
          required
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          onChange={onChange}
        />
        <input type="submit" value="submit query"></input>
      </Form>
    </Wrapper>
  );
};

export default SignUp;
