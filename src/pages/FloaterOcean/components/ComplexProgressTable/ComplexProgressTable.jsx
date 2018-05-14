import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Table, Pagination, Progress, Button, Feedback } from '@icedesign/base';
import DataBinder from '@icedesign/data-binder';
import EditDialog from './EditDialog';
import { Link } from 'react-router-dom';
import Clipboard from 'clipboard';

const Toast = Feedback.toast;

const dappAddress = "n1p2MydveNYK2QBgoyxwhPQjbSqQ1PPb5Gb";
const userAddress = "n1ZTecB8Tpb7X7LBL7j3ZcGLVvMrXmVfLfy";


@DataBinder({
  tableData: {
    // 详细请求配置请参见 https://github.com/axios/axios
    url: 'https://mainnet.nebulas.io/v1/user/call',
    method: 'post',
    headers: { 'content-type': 'application/json;charset=UTF-8' },
    data: {
      from: userAddress,
      to: dappAddress,
      gasLimit: '2000000',
      gasPrice: '1000000',
      nonce: 0,
      value: '0',
      contract: {
        'args': `["0", "100"]`,
        'function': 'allUsers'
      }
    },
    responseFormatter: (responseHandler, res, originResponse) => {
      console.log(res, originResponse);
      res = {
        success: res.result.execute_err === "",
        message: res.result.execute_err === "" ? "" : res.result.execute_err,
        data: {
          list: JSON.parse(res.result.result).result
        },
      };
      responseHandler(res, originResponse);
    },
    defaultBindingData: {
      list: [
        {
          "title": "如何实现前后端通信",
          "createTime": "2017/12/19",
          "progress": 10,
          "priority": "高"
        }
      ],
    },
  },
})
export default class ComplexProgressTable extends Component {
  static displayName = 'ComplexProgressTable';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    this.props.updateBindingData('tableData');
  };

  renderUpdateTime = (value, index, record) => {
    const date = new Date(value);
    return (
      <div style={styles.operations}>
        { date.toLocaleString() }
      </div>
    );
  };

  clickCopyBtn = () => {
    Toast.success('已将地址复制到剪切板');
  };

  renderTitle = (value, index, record) => {
    const clipboard = new Clipboard(`#copyBtn-${value}`);
    return (
      <div style={styles.operations}
           id={`copyBtn-${value}`}
           data-clipboard-target={`#copyBtn-${value}`}
           onClick={this.clickCopyBtn.bind(this)}
      >
        { value }
      </div>
    );
  };


  render() {
    const tableData = this.props.bindingData.tableData;

    return (
      <div className="complex-progress-table">
        <IceContainer style={styles.tableCard}>
          <Table
            dataSource={tableData.list}
            isLoading={
              tableData.__loading
            }
            className="basic-table"
            style={styles.basicTable}
            hasBorder={false}
          >
            <Table.Column
              title="地址（点击复制）"
              dataIndex="addr"
              cell={this.renderTitle}
            />
            <Table.Column
              title="交友宣言"
              dataIndex="intro"
            />
            <Table.Column
              title="宣言更新时间"
              dataIndex="createTime"
              cell={this.renderUpdateTime}
            />
          </Table>
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  tableCard: {
    padding: '10px',
  },
  subTitle: {
    marginTop: '4px',
    fontSize: '12px',
    color: '#999999',
  },
  operationButton: {
    marginRight: '10px',
  },
  priority: {
    width: '70px',
    textAlign: 'center',
  },
  operations: {
    lineHeight: '28px',
  },
  pagination: {
    textAlign: 'right',
    paddingTop: '26px',
  },
};
