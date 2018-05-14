import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import {
  Input,
  Button,
  Checkbox,
  Select,
  DatePicker,
  Switch,
  Radio,
  Grid,
  Feedback
} from '@icedesign/base';

const { Row, Col } = Grid;
const Toast = Feedback.toast;


// FormBinder 用于获取表单组件的数据，通过标准受控 API value 和 onChange 来双向操作数据
const CheckboxGroup = Checkbox.Group;
const RadioGroup = Radio.Group;
const { RangePicker } = DatePicker;

// Switch 组件的选中等 props 是 checked 不符合表单规范的 value 在此做转换
const SwitchForForm = (props) => {
  const checked = props.checked === undefined ? props.value : props.checked;

  return (
    <Switch
      {...props}
      checked={checked}
      onChange={(currentChecked) => {
        if (props.onChange) props.onChange(currentChecked);
      }}
    />
  );
};

const dappAddress = "n1p2MydveNYK2QBgoyxwhPQjbSqQ1PPb5Gb";


export default class CreateActivityForm extends Component {
  static displayName = 'CreateActivityForm';

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      value: {
        address: '',
        content: '',
      },
    };
  }

  onFormChange = (value) => {
    this.setState({
      value,
    });
  };

  reset = () => {
    this.setState({
      value: {
        address: '',
        content: '',
      },
    });
  };

  checkInstalledPlugin = () => {
    return typeof(webExtensionWallet) !== 'undefined';
  };

  submit = () => {
    this.formRef.validateAll((error, value) => {
      console.log('error', error, 'value', value);
      if (error) {
        return;
      }
      if (!this.checkInstalledPlugin()) {
        Toast.error('还未安装Chrome扩展，请点击页面上方的下载按钮');
        return;
      }
      const contract = {
        function: 'sendMsg',
        args: `["${value.address}", "${value.content}"]`,
      };
      window.postMessage({
        'target': 'contentscript',
        'data': {
          'to': dappAddress,
          'value': '0',
          'contract': {
            'function': contract.function,
            'args': contract.args,
          },
        },
        'method': 'neb_sendTransaction',
      }, '*');
      Toast.success('请确认已发起的交易！');
      window.addEventListener('message', resp => {
        console.log('response of push: ', resp);
        try {
          const dat = resp.data.data;
          if (!!dat.txhash) {
            console.log('Transaction hash:\n' + JSON.stringify(dat.txhash, null, '\t'));
            if (JSON.stringify(dat).indexOf('Error') === -1) {
              Toast.success('已提交交易，交易成功后即发送成功！');
            }
          }
        } catch (e) {
        }
      });
    });
  };

  render() {
    return (
      <div className="create-activity-form">
        <IceContainer title="发送漂流瓶" style={styles.container}>
          <IceFormBinderWrapper
            ref={(formRef) => {
              this.formRef = formRef;
            }}
            value={this.state.value}
            onChange={this.onFormChange}
          >
            <div>
              <Row style={styles.formItem}>
                <Col xxs="6" s="2" l="2" style={styles.formLabel}>
                  接收地址：
                </Col>
                <Col s="18" l="18">
                  <IceFormBinder
                    name="address"
                    required
                    message="接收地址必须填写"
                  >
                    <Input style={{ width: '100%' }}/>
                  </IceFormBinder>
                  <IceFormError name="address"/>
                </Col>
              </Row>

              <Row>
                <Col xxs="6" s="2" l="2" style={styles.formLabel}>
                  内容：
                </Col>
                <Col s="18" l="18">
                  <IceFormBinder name="content" required message="写点什么吧">
                    <Input multiple style={{ width: '100%' }} rows={10}/>
                  </IceFormBinder>
                  <IceFormError name="content"/>
                </Col>
              </Row>

              <Row style={styles.btns}>
                <Col xxs="6" s="2" l="2" style={styles.formLabel}>
                  {' '}
                </Col>
                <Col s="18" l="18">
                  <Button type="primary" onClick={this.submit}>
                    扔出去
                  </Button>
                  <Button style={styles.resetBtn} onClick={this.reset}>
                    重置
                  </Button>
                </Col>
              </Row>
            </div>
          </IceFormBinderWrapper>
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  container: {
    paddingBottom: 0,
  },
  formItem: {
    height: '28px',
    lineHeight: '28px',
    marginBottom: '25px',
  },
  formLabel: {
    textAlign: 'right',
  },
  btns: {
    margin: '25px 0',
  },
  resetBtn: {
    marginLeft: '20px',
  },
};
