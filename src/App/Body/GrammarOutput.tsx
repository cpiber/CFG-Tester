import React from 'react';

import styles from './GrammarOutput.module.scss';
import stylesBody from './bodyComponent.module.scss';
import textarea from './textarea.module.scss';

import { vars } from '../Logic/querys';
import grammar from '../Logic/grammar';


interface Props {
  className?: string;
  initialStrings?: string[];
}

const NUM_KEY = 'cfg_gen_number';
class GrammarOutput extends React.Component<Props, {}> {
  state = {
    stringEls: [] as JSX.Element[],
    buttonDisabled: false,
    number: 0,
    status: ["",""],
  };
  stringnum = 0;
  stringGen: Generator | undefined = undefined;

  constructor(props: Props) {
    super(props);
    this.grammarUpdated = this.grammarUpdated.bind(this);
    this.updateGenerator = this.updateGenerator.bind(this);
    this.clickGenerate = this.clickGenerate.bind(this);
    this.clickClear = this.clickClear.bind(this);
    this.updateNum = this.updateNum.bind(this);
    this.updateStrings = this.updateStrings.bind(this);
    this.resetStrings = this.resetStrings.bind(this);

    let n = +(window.localStorage.getItem(NUM_KEY) || 15);
    this.state.number = n >= 1 ? n : 1;

    vars.grammarUpdateCB = this.grammarUpdated;
  }

  componentDidMount() {
    let initialStrings: string[] = [
      //"some extra long string to test some things lorem ipsum and whatever... this is still the first line actually\nnewline"
    ];
    //for (let i = 0; i < 20; i++) initialStrings.push(i.toString());
    this.updateStrings(this.props.initialStrings || initialStrings);
  }

  grammarUpdated() {
    this.resetStrings();
    this.updateGenerator();
  }

  updateGenerator() {
    let gen = grammar.expandGenerator();
    if (gen.error) {
      console.error(gen.error);
      this.setState({status: ["error", "Error: "+gen.error]});
      return;
    }
    this.setState({state: ["",""]});
    this.stringGen = gen.gen;
  }

  clickGenerate(e: React.MouseEvent) {
    if (!e.target) return;
    let target = e.target as HTMLElement;
    
    if (target.tagName === "INPUT") return;
    target.blur();

    if (!this.stringGen) return;

    let newstrings = [] as string[];
    for (let i = 0; i < this.state.number; i++) {
      let str = this.stringGen.next();
      if (str.done) break;
      newstrings.push(str.value as string);
    }

    if (!newstrings.length) {
      this.setState({status: ["info", "Grammmar exhausted"]});
      return;
    }
    
    this.updateStrings(newstrings);
  }

  clickClear(e: React.MouseEvent) {
    if (!e.target) return;
    (e.target as HTMLElement).blur();

    this.resetStrings();
    this.updateGenerator();
  }

  updateNum(e: React.ChangeEvent) {
    let val = +(e.target as HTMLInputElement).value;
    this.setState({number: val >= 1 ? val : 1});
    window.localStorage.setItem(NUM_KEY, val.toString());
  }

  updateStrings(newstrings: string[]) {
    let strings = newstrings.map((str, ind) => (
      <li key={this.stringnum++} className="monospace">
        {str.toString().split(/\r\n|\r|\n|\\n/g).map((val, key) => (
          <span key={key}>{val}</span>
        ))}
      </li>
    ));
    this.setState({stringEls: [...this.state.stringEls, ...strings]});
  }

  resetStrings() {
    this.stringnum = 0;
    this.setState({stringEls: []});
  }

  render() {
    return (
      <div
        className={`${this.props.className?this.props.className:''} status-${this.state.status[0]} App-bodyComponent`}
      >
        <div className={`${textarea.area} ${stylesBody.textarea}`}>
          <h2 className={textarea.title}>Strings</h2>
          <div className={styles.strings}>
            <ul>
              {this.state.stringEls}
            </ul>
          </div>
          <div className="children">
            <div className="row1">
              <span className="status">
                {this.state.status[1]}
              </span>
            </div>
            <div className="row2">
              <button
                className="button secondary"
                onClick={this.clickGenerate}
                disabled={this.state.buttonDisabled}
                aria-label="Get more strings"
              >
                Get <input
                  type="number"
                  className="input secondary_alt"
                  size={4}
                  value={this.state.number}
                  onChange={this.updateNum}
                  aria-label="Number of strings to get"
                  /> more
              </button>
              <button
                className="button secondary"
                onClick={this.clickClear}
                aria-label="Clear strings"
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default GrammarOutput;