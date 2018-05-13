import React, { Component } from 'react';
import TermsInfo from './components/TermsInfo';

export default class Intro extends Component {
  static displayName = 'Intro';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="intro-page">
        <TermsInfo />
      </div>
    );
  }
}
