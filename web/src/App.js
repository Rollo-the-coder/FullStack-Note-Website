import React from 'react';
import ReactDOM from 'react-dom';

import Pages from '/pages';

//for some reason the v6 of react-router-dom was breaking my program

const App = () => {
  return (
    <div>
      <Pages />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
