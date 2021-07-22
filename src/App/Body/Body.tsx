import React from 'react';
import Query from '../Logic/querys';
import styles from './Body.module.scss';
import GrammarOutput from './GrammarOutput';
import RulesInput from './RulesInput';
import TextInput from './TextInput';


interface Props {
  className?: string;
}

const Body = ({ className }: Props) => {
  return (
    <div
      className={`${className || ''} ${styles.grid} App-body`}
      data-testid="body"
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
};
export default Body;