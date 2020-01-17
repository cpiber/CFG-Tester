import React from 'react';

import styles from './GrammarOutput.module.scss';
import stylesBody from './bodyComponent.module.scss';
import textarea from './textarea.module.scss';

class GrammarOutput extends React.Component {
  state = {
    strings: [],
    buttonDisabled: false
  }

  constructor(props) {
    super(props);
    this.clickGenerate = this.clickGenerate.bind(this);

    let initialStrings = [
      "some extra long string to test some things lorem ipsum and whatever... this is still the first line actually\nnewline"
    ];
    for (let i = 0; i < 20; i++) initialStrings.push(i);
    this.state.strings = initialStrings;
  }

  clickGenerate(e) {
    if (e.target.tagName === "INPUT") return;

    e.target.blur();
    this.setState({strings: [...this.state.strings, "new"]});
  }

  render() {
    let strings = this.state.strings.map((str, ind) => (
      <li key={ind} className="monospace">
        {str.toString().split('\n').map((val, key) => (
          <span key={key}>{val}<br /></span>
        ))}
      </li>
    ));

    return (
      <div className={`${this.props.className} App-bodyComponent`}>
        <div className={`${textarea.area} ${stylesBody.textarea}`}>
          <h2 className={textarea.title}>Strings</h2>
          <div className={styles.strings}>
            <ul>
              {strings}
            </ul>
          </div>
          <div className="children">
            <button
              className="button secondary"
              onClick={this.clickGenerate}
              disabled={this.state.buttonDisabled}
              aria-label="Get more strings"
            >
              Get <input
                type="number"
                className="input secondary"
                size="5"
                aria-label="Number of strings to get"
                /> more
            </button>
          </div>
        </div>
      </div>
    )
  }
}
export default GrammarOutput;