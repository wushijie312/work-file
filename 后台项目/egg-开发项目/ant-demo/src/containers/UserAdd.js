import { Form, Input,Radio, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete } from 'antd';
import React, { Component } from 'react';
import { addUser} from '../actions'
import { connect } from 'react-redux';

let JOBS = {
  "1":"前端开发工程师",
  "2":"Node开发工程师",
  "3":"Android开发工程师",
  "4":"iOS开发工程师",
  "5":"运维工程师",
  "6":"Node开发工程师",
  "7":"后端开发工程师",
}

const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
  };
  handleSubmit = (e) => {
    e.preventDefault();
    let { form ,dispatch ,history} = this.props;
    console.log(this.props)
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        delete values.confirm;
        Object.assign(values,{job: JOBS[values.select]});
        delete values.select,
        // onClick={()=>{ history.goBack()}}
        console.log('Received values of form: ', values);
        dispatch(addUser(values));
        history.goBack();
      }
    });
  }

  //确认密码视图失去焦点了
  handleConfirmBlur = (e) => {
    const value = e.target.value; //取出确认密码的值
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }
  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('两次密码不一致!');
    } else {
      callback();
    }
  }
  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }
  
  render() {
    const { history } = this.props;
    const { getFieldDecorator } = this.props.form;

    //组件样式
    const formItemLayout = {
      //标题24栅格
      labelCol: {
        xs: { span: 24 },
        sm: { span: 3 },
      },
      wrapperCol: {
        xs: { span: 12 },
        sm: { span: 14 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };

    return (
      <Form style={{marginTop:'20px'}} onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label={(
            <span>用户名&nbsp;</span>
          )}
        >
          {
            getFieldDecorator('username', {
            rules: [{ required: true, message: '用户名由纯字母组成', whitespace: true }],
            initialValue:''
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="密码"
        >
          {getFieldDecorator('password', {
            rules: [{
              required: true, message: '请输入密码!',
            }, {
              validator: this.validateToNextPassword,
            }],
            initialValue:''
          })(
            <Input type="password" />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="确认密码"
        >
          {getFieldDecorator('confirm', {
            rules: [{
              required: true, message: '请再次输入密码',
            }, {
              validator: this.compareToFirstPassword,
            }],
            initialValue:''
          })(
            <Input 
              type="password"
              //在对象失去输入焦点时触发
              onBlur={this.handleConfirmBlur} />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={(
            <span>
              昵称&nbsp;
            </span>
          )}
        >
          {getFieldDecorator('nickname', {
            rules: [{ required: true, message: '请输入昵称', whitespace: true }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="性别"
        >
          {getFieldDecorator('sex',{
            initialValue:1
          })(
            <RadioGroup name="radiogroup">
              <Radio value={1}>男</Radio>
              <Radio value={0}>女</Radio>
            </RadioGroup>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="职位"
          hasFeedback
        >
          {getFieldDecorator('select', {
            rules: [
              { required: true, message: '请选择一个职位' },
            ],
          })(
            <Select placeholder="点击选择职位">
              <Option value="1">{JOBS['1']}</Option>
              <Option value="2">{JOBS['2']}</Option>
              <Option value="3">{JOBS['3']}</Option>
              <Option value="4">{JOBS['4']}</Option>
              <Option value="5">{JOBS['5']}</Option>
              <Option value="6">{JOBS['6']}</Option>
              <Option value="7">{JOBS['7']}</Option>
            </Select>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="手机号码"
        >
          {getFieldDecorator('phone', {
            rules: [{ required: false, message: '请输入手机号' }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="电子邮箱"
        >
          {getFieldDecorator('email', {
            rules: [
              {
                type: 'email', message: '请检查邮箱格式!',
              }, 
              {
                required: false, message: '请输入你的邮箱!',
              }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">添加</Button>
          <Button type="primary" onClick={()=> history.goBack()} style={{ marginLeft:30}}>取消</Button>
        </FormItem>
      </Form>
    );
  }
}

const WrappedRegistrationForm = Form.create()(RegistrationForm);

/**
 * 关于
 */
const File = ({history}) => (
  <h3>
    <button onClick={ () => {history.goBack()}}>push</button>
  </h3>
)

function mapStateToProps(state) {
  return {
    // userList:state.getUserList
  };
}
export default connect(mapStateToProps)(WrappedRegistrationForm);
