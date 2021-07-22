import React from 'react';
import './App.scss';
import Body from './Body/Body';
import Footer from './Footer/Footer';
import Header from './Header/Header';


const App = () => {
  return (
    <div className="App" data-testid="app">
      <Header />
      <Body />
      <Footer />
    </div>
  );
};
export default App;