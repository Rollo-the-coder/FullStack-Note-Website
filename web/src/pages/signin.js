import React, { useEffect } from 'react';
import { useMutation, useApolloClient, gql } from '@apollo/client';

import UserForm from '../components/UserForms';

const SIGNIN_USER = gql`
  mutation signIn($email: String, $password: String!) {
    signIn(email: $email, password: $password)
  }
`;

const SignIn = (props) => {
  useEffect(() => {
    //update the doc title
    document.title = 'Sign In - Notedly';
  });

  const client = useApolloClient();
  const [signIn, { loading, error }] = useMutation(SIGNIN_USER, {
    onCompleted: (data) => {
      // //store the JWT in localstorage
      localStorage.setItem('token', data.signIn);

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
      <UserForm action={signIn} formType="signIn" />
      {loading && <p>Loading...</p>}
      {error && <p>Error Signing IN!</p>}
    </React.Fragment>
  );
};

export default SignIn;
