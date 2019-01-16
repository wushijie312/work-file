import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { Redirect } from 'react-router-dom'
import React from 'react';
import { connect } from 'react-redux';
import './style.css'
import { login } from '../../actions'

const FormItem = Form.Item;

class NormalLoginForm extends React.Component {

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values);
        this.props.dispatch(login({
          username: values.username,
          password: values.password
        }));
      }
    });
  }

  render() {
    const { loginInfo ,form } = this.props;
    const { getFieldDecorator } = form;
    if(loginInfo.token){ //已登录
      return (
        <Redirect to="/main/queue"></Redirect>
      )
    }
    return (
      <div id="login">
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="账号" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
          )}
        </FormItem>
        <FormItem>
          {
            // getFieldDecorator('remember', { valuePropName: 'checked', initialValue: true,})(<Checkbox>Remember me</Checkbox>)
          }
          <Button type="primary" htmlType="submit" className="login-form-button">
            登录
          </Button>
        </FormItem>
      </Form>
      </div>
    );
  }

}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

function mapStateToProps(state) {
  return {
    currenQueueType: state.selectTasksMenu,
    currenQueueList: state.taskListByType,
    loginInfo:state.currentLoginInfo
  };
}
export default connect(mapStateToProps)(WrappedNormalLoginForm);