import React from 'react';
import './App.scss';
import styles from './App.module.scss';

import Header from './Header/Header';
import Footer from './Footer/Footer';

function App() {
  return (
    <div className="App">
      <Header></Header>

      <div className={styles.grid}>
      </div>
      
      <Footer></Footer>
    </div>
  );
}

export default App;
