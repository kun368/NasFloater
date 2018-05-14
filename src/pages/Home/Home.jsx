import React, { Component } from 'react';
import ProductInfo from './components/ProductInfo/ProductInfo';
import SimpleTestimonial from './components/SimpleTestimonial/SimpleTestimonial';

export default class Home extends Component {
  static displayName = 'Home';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="home-page">
        <SimpleTestimonial/>
        <ProductInfo/>
      </div>
    );
  }
}
