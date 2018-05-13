import React, { Component } from 'react';
import TagMessageList from './components/TagMessageList';
import TextSearchList from '../FloaterOcean/components/TextSearchList/TextSearchList';

export default class MyFloater extends Component {
  static displayName = 'MyFloater';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="my-floater-page">
        <TextSearchList/>
        <TagMessageList />
      </div>
    );
  }
}
