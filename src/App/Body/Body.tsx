import React from 'react';
import Query from '../Logic/providers/querys';
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
        />
        <TextInput
          className={styles.rightTop}
        />
        <GrammarOutput
          className={styles.rightBottom}
        />
      </Query.Provider>
    </div>
  )
};
export default Body;