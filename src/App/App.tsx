import React from 'react';
import './App.scss';
import styles from './App.module.scss';

import Header from './Header/Header';
import Body   from './Body/Body';
import Footer from './Footer/Footer';

function App() {
  return (
    <div className="App">
      <Header></Header>
      <Body
        className={styles.grid}
        grid={[styles.grid1, styles.grid2, styles.grid3]}
      ></Body>
      <Footer></Footer>
    </div>
  );
}

export default App;
