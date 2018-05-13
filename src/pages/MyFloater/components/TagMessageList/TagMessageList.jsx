import React, { Component } from 'react';
import { Tab, Feedback } from '@icedesign/base';
import IceContainer from '@icedesign/container';
import './TagMessageList.scss';
import NebPay from 'nebpay';

const Toast = Feedback.toast;

const nebPay = new NebPay();
const dappAddress = 'n22ynDP76M2Unb4K3NdWYf6fPE8JuvZDjky';

export default class TagMessageList extends Component {
  static displayName = 'TagMessageList';

  constructor(props) {
    super(props);
    this.state = {
      dataSourceSend: [],
      dataSourceRecv: []
    };
  }

  checkInstalledPlugin = () => {
    return typeof(webExtensionWallet) !== 'undefined';
  };

  componentDidMount() {
    if (!this.checkInstalledPlugin()) {
      Toast.error('还未安装Chrome扩展，请点击页面上方的下载按钮');
      return;
    }
    const contract = {
      function: 'getUser',
      args: `[]`,
    };
    Toast.loading("正在获取您的漂流瓶数据");
    nebPay.simulateCall(dappAddress, '0', contract.function, contract.args, {
      qrcode: {
        showQRCode: false,
      },
      listener: (resp) => {
        if (resp.execute_err !== "") {
          Toast.error("获取数据失败: " + resp.execute_err);
          return;
        }
        const item = JSON.parse(resp.result);
        console.log(item);
        this.setState({
          dataSourceSend: item.sended,
          dataSourceRecv: item.recved
        });
      },
    });
  }

  renderItem = (item, idx, type) => {
    console.log(item, idx);
    return (
      <div key={idx} style={styles.articleItem}>
        <div>
          <div style={styles.title}>
            对方：{ type === 0 ? item.to : item.from }
          </div>
          <br/>
          <div style={styles.title}>
            时间：{ new Date(item.createTime).toLocaleString() }
          </div>
        </div>
        <div>
          <p style={styles.desc}>{item.content}</p>
        </div>
      </div>
    );
  };

  render() {
    return (
      <div className="tag-message-list">
        <IceContainer>
          <Tab size="small">
            <Tab.TabPane key={0} tab="我发送的">
              {this.state.dataSourceSend.map((item, idx) => {
                return this.renderItem(item, idx, 0)
              })}
            </Tab.TabPane>
            <Tab.TabPane key={1} tab="我收到的">
              {this.state.dataSourceRecv.map((item, idx) => {
                return this.renderItem(item, idx, 1)
              })}
            </Tab.TabPane>
          </Tab>
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  allMessage: {
    marginTop: '20px',
    textAlign: 'center',
  },
  item: {
    borderBottom: '1px solid #F4F4F4',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '15px 0',
  },
  title: {
    fontSize: '14px',
    color: '#666',
  },
  date: {
    fontSize: '12px',
    color: '#666',
  },
  desc: {
    lineHeight: '24px',
    fontSize: '14px',
    color: '#999',
  },
  articleItem: {
    marginBottom: '30px',
    paddingBottom: '20px',
    borderBottom: '1px solid #f5f5f5',
  },
};
