import React, { useEffect, useState } from 'react';
import { useMutation, useApolloClient, gql } from '@apollo/client';

import UserForm from '../components/UserForms';

const SIGNUP_USER = gql`
  mutation signUp($email: String!, $username: String!, $password: String!) {
    signUp(email: $email, username: $username, password: $password)
  }
`;

const SignUp = (props) => {
  useEffect(() => {
    document.title = 'Sign Up - Notedly';
  });

  //Apollo Client
  const client = useApolloClient();

  //Mutation hook
  const [signUp, { loading, error }] = useMutation(SIGNUP_USER, {
    onCompleted: (data) => {
      //logs the JSON web token when mutation is complete
      //console.log(data.signUp);

      // //store the JWT in localstorage
      localStorage.setItem('token', data.signUp);
      // //update the local cache

      const IS_LOGGED_IN = gql`
        query IsUserLoggedIn {
          isLoggedIn @client
        }
      `;

      client.writeQuery({
        query: IS_LOGGED_IN,
        data: {
          isLoggedIn: true,
        },
      });
      // //redirect the user to the homepage
      props.history.push('/');
    },
  });

  return (
    <React.Fragment>
      <UserForm action={signUp} formType="signup"></UserForm>

      {loading && <p>Loading...</p>}
      {error && <p>Error creating an account!</p>}
    </React.Fragment>
  );
};

export default SignUp;
