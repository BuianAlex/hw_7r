import React from 'react';
import './login.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TextField from './textFild';
import { userRegister, userLogIn } from '../../services/api.js';
import '../../services/inputValidate';
import Spiner from '../spiner/spiner';
import {
  faReply,
  faEdit,
  faTrashAlt,
  faSave,
  faTimes
} from '@fortawesome/free-solid-svg-icons';
console.log("sdss".maxLength(1));

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      formState: false, //False  log
      loginFild: ' ',
      errLoginFild: true,
      passwordFild: '',
      errPasswordFild: true,
      cPasswordFild: '',
      errcPasswordFild: false,
      emailFild: '',
      errEmailFild: false,
      phoneFild: '38',
      errPhoneFild: false,
      confirmBtn: false,
      formErrors: [],
      spiner: false
    };
    this.actionFormSubmit = this.actionFormSubmit.bind(this);
  }
  actionCloseBtn = () => {
    this.props.close();
    this.setState({
      loginFild: ' ',
      errLoginFild: false,
      passwordFild: '',
      errPasswordFild: true,
      cPasswordFild: true,
      errcPasswordFild: '',
      emailFild: '',
      errEmailFild: '',
      // TODO: ADD "+"
      phoneFild: '38',
      errPhoneFild: '',
      confirmBtn: false,
      formErrors: [],
      spiner: false
    });
  };

  actionFormState = () => {
    this.setState({ formState: !this.state.formState });
  };

  handleTextFildChange = e => {
    if (!/[-\/\\^$*+?()|[\]{}]/g.test(e.target.value)) {
      if (e.target.name === 'login') {
        this.setState({ loginFild: e.target.value });
        if (e.target.value.length < 3) {
          this.setState({
            errLoginFild: 'Too Short!',
            confirmBtn: false
          });
        } else {
          if (e.target.value.length > 50) {
            this.setState({
              errLoginFild: 'Too Long!',
              confirmBtn: false
            });
          } else {
            this.setState({ errLoginFild: false });
          }
        }
      }
      if (e.target.name === 'password') {
        // const strongRegex = new RegExp(
        //   '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'
        // );
        const mediumRegex = new RegExp(
          '^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})'
        );
        this.setState({ passwordFild: e.target.value });

        if (!mediumRegex.test(e.target.value)) {
          this.setState({ errPasswordFild: 'password is not secure' });
        } else {
          this.setState({ errPasswordFild: false });
        }
      }

      if (e.target.name === 'cPassword') {
        this.setState({ cPasswordFild: e.target.value });
        for (let i = 0; i < e.target.value.length; i++) {
          if (this.state.passwordFild[i] !== e.target.value[i]) {
            this.setState({
              errcPasswordFild: 'Confirm not match'
            });
            break;
          }
        }
        if (this.state.passwordFild.length === e.target.value.length) {
          this.setState({
            errcPasswordFild: false
          });
        } else {
          this.setState({
            errcPasswordFild: 'Confirm not match'
          });
        }
      }

      if (e.target.name === 'email') {
        this.setState({ emailFild: e.target.value });
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(e.target.value)) {
          this.setState({ errEmailFild: 'Email Address not valid' });
        } else {
          this.setState({ errEmailFild: '' });
        }
      }

      if (e.target.name === 'phone') {
        const addPlus = "+";

        this.setState({ phoneFild: e.target.value });
        if (/38[0-9]{10,}/.test(e.target.value)) {
          this.setState({ errPhoneFild: '' });
        } else {
          this.setState({ errPhoneFild: 'Phone number is not valid' });
        }
      }
    } else {
      switch (e.target.name) {
        case 'login':
          this.setState({
            errLoginFild: 'not allowed special characters'
          });
          break;
        case 'password':
          this.setState({
            errLoginFild: 'not allowed special characters'
          });
          break;
        case 'password':
          this.setState({
            errPasswordFild: 'not allowed special characters'
          });
          break;
        case 'cPassword':
          this.setState({
            errcPasswordFild: 'not allowed special characters'
          });
          break;
        case 'email':
          this.setState({
            errEmailFild: 'not allowed special characters'
          });
          break;
        case 'phone':
          this.setState({
            errPhoneFild: 'not allowed special characters'
          });
          break;

        default:
          break;
      }
    }
  };

  async actionFormSubmit() {
    if (this.state.confirmBtn) {
      this.setState({ spiner: true });
      if (this.state.formState) {
        const {
          loginFild: login,
          passwordFild: password,
          emailFild: email,
          phoneFild: phone
        } = this.state;
        let dataToSend = {
          login,
          password,
          email,
          phone
        };
        for (const key in dataToSend) {
          dataToSend[key] = dataToSend[key].trim();
        }
        const res = await userRegister(dataToSend);
        if (res.errors.length === 0) {
          this.actionCloseBtn();
        } else {
          this.setState({ 
            formErrors: res.errors,
            spiner: false
           });
        }
      } else {
        this.setState({ spiner: true });
        const { loginFild: login, passwordFild: password } = this.state;
        const trLogin = login.trim();
        const trPassword = password.trim();
        const res = await userLogIn({
          login: trLogin,
          password: trPassword
        });
        if (res.errors.length === 0) {
          this.actionCloseBtn();
        } else {
          this.setState({ 
            formErrors: res.errors,
            spiner: false
           });
        }
      }
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.formState !== this.state.formState) {
      this.setState({ passwordFild: '' });
      this.setState({ errPasswordFild: true });
      if (!this.state.formState) {
        this.setState({ errcPasswordFild: false });
      } else {
        this.setState({ errcPasswordFild: true });
      }
    }

    if (
      prevState.errLoginFild !== this.state.errLoginFild ||
      prevState.errPasswordFild !== this.state.errPasswordFild ||
      prevState.errcPasswordFild !== this.state.errcPasswordFild
    ) {
      if (
        !this.state.errLoginFild &&
        !this.state.errPasswordFild &&
        !this.state.errcPasswordFild
      ) {
        this.setState({ confirmBtn: true });
      } else {
        this.setState({ confirmBtn: false });
      }
    }
  }

  render() {
    // FIXME: ref to react router
    return (
      <div className="background">
        <div className="dialog">
          <div className="header">
            Welcome
            <button className="action-btn dialog-close">
              <FontAwesomeIcon
                icon={faTimes}
                size="lg"
                onClick={this.actionCloseBtn}
              />
            </button>
          </div>
          <div className="content">
            <button
              className={`content-navBtn ${!this.state.formState &&
                ' content-navBtn__active'}`}
              onClick={this.actionFormState}
            >
              login
            </button>
            <button
              className={`content-navBtn ${this.state.formState &&
                ' content-navBtn__active'}`}
              onClick={this.actionFormState}
            >
              register
            </button>
            <TextField
              type="text"
              classes="fild"
              label="Login*"
              onChangeFild={this.handleTextFildChange}
              value={this.state.loginFild}
              name="login"
              error={this.state.errLoginFild}
            />
            <TextField
              type="password"
              classes="fild"
              label="Password*"
              onChangeFild={this.handleTextFildChange}
              value={this.state.passwordFild}
              name="password"
              error={this.state.formState && this.state.errPasswordFild}
            />
            {this.state.formState && (
              <>
                <TextField
                  type="password"
                  classes="fild"
                  label="Confirm Password*"
                  onChangeFild={this.handleTextFildChange}
                  value={this.state.cPasswordFild}
                  name="cPassword"
                  error={this.state.errcPasswordFild}
                />
                {/* TODO: ADD show pass */}
                <TextField
                  type="text "
                  classes="fild"
                  label="E-mail ss@ss.com"
                  onChangeFild={this.handleTextFildChange}
                  value={this.state.emailFild}
                  name="email"
                  error={this.state.errEmailFild}
                />
                <TextField
                  type="text"
                  classes="fild"
                  label="Phone 380998887766"
                  onChangeFild={this.handleTextFildChange}
                  value={this.state.phoneFild}
                  name="phone"
                  error={this.state.errPhoneFild}
                />
                {/* TODO: field for upload photo */}
              </>
            )}
            {this.state.spiner && (
              <div className="spiner-wrap">
                {' '}
                <Spiner></Spiner>
              </div>
            )}
            <button
              className={`confirmBtn ${!this.state.confirmBtn &&
                ' confirmBtn_disabled'}`}
              onClick={this.actionFormSubmit}
            >
              {this.state.formState ? 'register' : 'log in'}
            </button>
            {this.state.formErrors.length !== 0 &&
              this.state.formErrors.map((item, i) => {
                return (
                  <span key="i" className="formErr">
                    {item}
                  </span>
                );
              })}
          </div>
        </div>
      </div>
    );
  }
}
export default Login;
