import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Search, Grid, Feedback } from '@icedesign/base';

const Toast = Feedback.toast;
const dappAddress = "n1p2MydveNYK2QBgoyxwhPQjbSqQ1PPb5Gb";

const { Row, Col } = Grid;

export default class TextSearchList extends Component {
  static displayName = 'TextSearchList';

  checkInstalledPlugin = () => {
    return typeof(webExtensionWallet) !== "undefined";
  };

  onSearch(value) {
    if (!value.key || value.key === "") {
      Toast.error("说句交友宣言吧，让大家了解下你");
      return;
    }
    if (value.key.length > 20) {
      Toast.error("宣言太长了，最长20个字哦");
      return;
    }
    if (!this.checkInstalledPlugin()) {
      Toast.error("还未安装Chrome扩展，请点击页面上方的下载按钮");
      return;
    }
    const contract = {
      function: 'addUser',
      args: `["${value.key}"]`
    };
    window.postMessage({
      "target": "contentscript",
      "data": {
        "to": dappAddress,
        "value": "0",
        "contract": {
          "function": contract.function,
          "args": contract.args
        }
      },
      "method": "neb_sendTransaction",
    }, "*");
    Toast.success("请确认已发起的交易！");
    window.addEventListener('message', resp => {
      console.log("response of push: ", resp);
      try {
        const dat = resp.data.data;
        if (!!dat.txhash) {
          console.log("Transaction hash:\n" + JSON.stringify(dat.txhash, null, '\t'));
          if (JSON.stringify(dat).indexOf("Error") === -1) {
            Toast.success("已提交交易，交易成功后即为加入星云漂流世界！");
          }
        }
      } catch (e) {}
    });
  }

  render() {
    return (
      <div className="text-search-list">
        <IceContainer>
          <Row>
            <Col>
              <Search
                onSearch={this.onSearch.bind(this)}
                autoWidth
                hasIcon={false}
                size="large"
                searchText="加入星云漂流瓶/更新宣言"
                placeholder="输入您的个人宣言"
              />
            </Col>
          </Row>
        </IceContainer>
      </div>
    );
  }
}
