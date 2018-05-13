import React, { Component } from 'react';
import TextSearchList from './components/TextSearchList';
import ComplexProgressTable from './components/ComplexProgressTable/ComplexProgressTable';

export default class FloaterOcean extends Component {
  static displayName = 'FloaterOcean';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="floater-ocean-page">
        <TextSearchList />
        <ComplexProgressTable/>
      </div>
    );
  }
}
