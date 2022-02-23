import React from 'react';

import logo from '../img/logo.svg';

const Header = () => {
  return (
    <header>
      <img src={logo} alt="Notedly logo" height="40" />
      <h1>Notedly</h1>
    </header>
  );
};

export default Header;
