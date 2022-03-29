import React from 'react';

import { useQuery, gql } from '@apollo/client';
import { Link, withRouter } from 'react-router-dom';

import logo from '../img/logo.svg';
import styled from 'styled-components';

import ButtonAsLink from './ButtonAsLink';

const HeaderBar = styled.header`
  width: 100%;
  padding: 0.5em 1em;
  display: flex;
  height: 64px;
  position: fixed;
  align-items: center;
  background-color: #fff;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.25);
  z-index: 1;
`;

const LogoText = styled.h1`
  margin: 0;
  padding: 0;
  display: inline;
`;

const UserState = styled.div`
  margin-left: auto;
`;

const Header = (props) => {
  const IS_LOGGED_IN = gql`
    query IsUserLoggedIn {
      isLoggedIn @client
    }
  `;

  //query hook for user logged in state
  const { loading, data: { isLoggedIn } = {}, client } = useQuery(IS_LOGGED_IN);
  console.log(isLoggedIn, client, loading);
  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <HeaderBar>
      <img src={logo} alt="Notedly logo" height="40" />
      <LogoText>Notedly</LogoText>
      <UserState>
        {isLoggedIn ? (
          <ButtonAsLink
            onClick={() => {
              //remove the token for logout
              localStorage.removeItem('token');
              //console.log('tea time');
              //clear the applications cache
              client.resetStore();
              //console.log('reset time');
              //update local state this is most likely where the error is
              client.writeQuery({
                query: IS_LOGGED_IN,
                data: {
                  isLoggedIn: false,
                },
              });
              //console.log('logout time');
              //redirect the user to the home page
              props.history.push('/');
              console.log('last time');
            }}
          >
            Log Out
          </ButtonAsLink>
        ) : (
          <p>
            <Link to={'/signin'}>Sign In</Link> or{' '}
            <Link to={'/signup'}>Sign Up</Link>
          </p>
        )}
      </UserState>
    </HeaderBar>
  );
};

export default withRouter(Header);
