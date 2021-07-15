import React from 'react';
import Query from '../Logic/querys';
import styles from './Body.module.scss';

import RulesInput from './RulesInput';
import TextInput from './TextInput';
import GrammarOutput from './GrammarOutput';


interface Props {
  className?: string;
}

const Body = (props: Props) => {
  return (
    <div
      className={`${props.className || ''} ${styles.grid}`}
    >
      <Query.Provider initialState={window.location.hash}>
        <RulesInput
          className={styles.left}
        ></RulesInput>
        <TextInput
          className={styles.rightTop}
        ></TextInput>
        <GrammarOutput
          className={styles.rightBottom}
        ></GrammarOutput>
      </Query.Provider>
    </div>
  )
}
export default Body;