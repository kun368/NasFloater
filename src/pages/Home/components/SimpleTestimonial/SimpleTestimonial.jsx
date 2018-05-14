import React, { Component } from 'react';
import IceContainer from '@icedesign/container';

export default class SimpleTestimonial extends Component {
  static displayName = 'SimpleTestimonial';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="simple-testimonial" style={styles.simpleTestimonial}>
        <IceContainer>
          <div style={styles.item}>
            <p style={styles.description}>
              “
              我喜欢在星云漂流瓶交友平台认识朋友的感觉，感觉这个网站能给年轻人带来有趣、浪漫的独特体验。
              此外星云漂流瓶的安全、防骚扰、信息无法篡改的特点使其成为一款非常受女性受众欢迎的社交应用。
              我能根据她的宣言找到我们之间共同兴趣爱好、曾经共同的经历。
              最重要的一点是，星云漂流瓶交友平台个个都是人才，而且妹子还多，真的要推荐给大家使用！
              ”
            </p>
            <div style={styles.infoBox}>
              <img
                style={styles.avatar}
                src="https://img.alicdn.com/tfs/TB1cUfViZrI8KJjy0FhXXbfnpXa-450-456.png"
                alt="图像"
              />
              <h5 style={styles.name}>李荣金</h5>
              <p style={styles.company}>山东某知名大学学生</p>
            </div>
          </div>
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  item: {
    width: '100%',
    maxWidth: '1080px',
    margin: '0 auto',
    textAlign: 'center',
  },
  description: {
    lineHeight: '28px',
    color: '#999',
  },
  infoBox: {
    display: 'flex',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '40px',
  },
  avatar: {
    width: '64px',
    height: '64px',
  },
  name: {
    margin: '0 15px',
    fontSize: '15px',
    fontWeight: 'bold',
  },
  company: {
    margin: 0,
  },
  simpleTestimonial: {},
};
