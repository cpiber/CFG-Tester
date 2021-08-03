import React from 'react';
import ReactTooltip from 'react-tooltip';
import './App.scss';
import Body from './Body/Body';
import Footer from './Footer/Footer';
import Header from './Header/Header';
import Syntax from './Logic/providers/syntaxes';


const App = () => {

  return (
    <Syntax.Provider>
      <div className="App" data-testid="app">
        <Header />
        <Body />
        <Footer />
        <ReactTooltip effect="solid" />
      </div>
    </Syntax.Provider>
  );
};
export default App;