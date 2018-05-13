import React, { Component } from 'react';
import ProductInfo from './components/ProductInfo/ProductInfo';
import ReleaseIntro from './components/ReleaseIntro/ReleaseIntro';

export default class Home extends Component {
  static displayName = 'Home';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="home-page">
        <ReleaseIntro/>
        <ProductInfo/>
      </div>
    );
  }
}
