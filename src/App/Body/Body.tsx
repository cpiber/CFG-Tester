import React from 'react';
import Query from '../Logic/querys';

import RulesInput from './RulesInput';
import TextInput from './TextInput';
import GrammarOutput from './GrammarOutput';
import EventManager from './EventManager';


interface Props {
  className?: string;
  grid: string[];
}

const Body = (props: Props) => {
  return (
    <div
      className={props.className}
    >
      <Query.Provider>
        <EventManager />
        <RulesInput
          className={props.grid[0]}
        ></RulesInput>
        <TextInput
          className={props.grid[1]}
        ></TextInput>
        <GrammarOutput
          className={props.grid[2]}
        ></GrammarOutput>
      </Query.Provider>
    </div>
  )
}
export default Body;