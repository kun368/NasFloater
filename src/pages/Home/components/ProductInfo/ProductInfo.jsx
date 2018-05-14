import React, { Component } from 'react';
import { Grid } from '@icedesign/base';

const { Row, Col } = Grid;

const dataSource = [
  {
    title: '漂流世界',
    pic: 'https://img.alicdn.com/tfs/TB1ALecicrI8KJjy0FhXXbfnpXa-210-210.png',
    desc: '穿越广阔大海 探索未知领域',
  },
  {
    title: '海量会员',
    pic: 'https://img.alicdn.com/tfs/TB1i7OMif6H8KJjSspmXXb2WXXa-210-210.png',
    desc: '每颗真诚的心都在等待您的漂流瓶',
  },
  {
    title: '相信缘分',
    pic: 'https://img.alicdn.com/tfs/TB1wA5KinvI8KJjSspjXXcgjXXa-210-210.png',
    desc: '根据宣言找到共同兴趣爱好',
  },
  {
    title: '区块链',
    pic: 'https://img.alicdn.com/tfs/TB1laelicjI8KJjSsppXXXbyVXa-210-210.png',
    desc: '基于NAS智能合约 放心使用',
  },
  {
    title: '见证奇迹',
    pic: 'https://img.alicdn.com/tfs/TB1EfLYfOqAXuNjy1XdXXaYcVXa-207-210.png',
    desc: '告白失败？十动然拒？这里不会发生！',
  },
  {
    title: '浪漫社交',
    pic: 'https://img.alicdn.com/tfs/TB1a31mignH8KJjSspcXXb3QFXa-210-210.png',
    desc: '在星云漂流瓶上更有浪漫的感觉',
  },
];

export default class ProductInfo extends Component {
  static displayName = 'ProductInfo';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="product-info" style={styles.container}>
        <Row wrap>
          {dataSource.map((item, index) => {
            return (
              <Col xxs="12" s="8" l="8" key={index} style={styles.item}>
                <img src={item.pic} style={styles.pic} alt="" />
                <h3 style={styles.title}>{item.title}</h3>
                <p style={styles.desc}>{item.desc}</p>
              </Col>
            );
          })}
        </Row>
      </div>
    );
  }
}

const styles = {
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%',
    maxWidth: '1080px',
    margin: '0 auto',
    padding: '80px 0',
  },
  item: {
    textAlign: 'center',
    padding: '10px 22px',
    marginBottom: '20px',
  },
  pic: {
    width: 100,
    height: 100,
  },
  title: {
    fontWeight: 'bold',
  },
  desc: {
    lineHeight: '22px',
    color: '#999',
  },
};
