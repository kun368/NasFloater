import React, { Component } from 'react';
import CreateActivityForm from './components/CreateActivityForm';
import TextSearchList from '../FloaterOcean/components/TextSearchList/TextSearchList';

export default class SendMsg extends Component {
  static displayName = 'SendMsg';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="send-msg-page">
        <TextSearchList/>
        <CreateActivityForm />
      </div>
    );
  }
}
