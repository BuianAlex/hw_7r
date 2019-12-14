import React from 'react';
import './comments.scss';
import Item from './item';
import {
  getComments,
  postComments,
  deleteComment
} from '../../services/api.js';
import Spiner from '../spiner/spiner';
import Login from '../login/login';

class Comments extends React.Component {
  constructor() {
    super();

    this.state = {
      userLogin: JSON.parse(localStorage.getItem('userSID')) || false,
      replyBtn: false,
      loginPopup: false,
      spinerState: true,
      errors: '',
      startItem: {
        id: 0,
        autor: JSON.parse(localStorage.getItem('userSID')),
        text: '',
        ctime: '',
        utime: '',
        parent: 0
      },
      commentData: []
    };
    this.actionDelete = this.actionDelete.bind(this);
  }

  nestedComment(data) {
    let toRender = data.map(item => {
      if (item.children.length === 0) {
        return (
          <Item
            key={item.id}
            onDelete={this.actionDelete}
            onSave={this.actionSave}
            commentData={item}
            editable={item.autor.autorID === this.state.userLogin.id}
          ></Item>
        );
      }
      return (
        <Item
          key={item.id}
          commentData={item}
          onDelete={this.actionDelete}
          onSave={this.actionSave}
          editable={item.autor.autorID === this.state.userLogin.id}
        >
          {this.nestedComment(item.children)}
        </Item>
      );
    });
    return toRender;
  }

  actionSave = async (id, text, parent) => {
    if (this.state.userLogin) {
      const autorID = this.state.userLogin.id;
      this.setState({ spinerState: true });
      const resData = await postComments({ id, text, parent, autorID });
      this.setState({ spinerState: false });
      this.setState({ errors: resData.error });
      this.setState({ commentsData: resData.result });
    } else {
      this.setState({ loginPopup: true });
    }
  };

  async actionDelete(id) {
    const resData = await deleteComment(id);
    if (!resData.error) {
      const resData = await getComments();
      this.setState({ spinerState: false });
      this.setState({ errors: resData.error });
      this.setState({ commentsData: resData.result });
    } else {
      this.setState({ spinerState: false });
      this.setState({ errors: resData.error });
    }
  }

  async componentDidMount() {
    const resData = await getComments();
    this.setState({ spinerState: false });
    this.setState({ errors: resData.error });
    this.setState({ commentsData: resData.result });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.loginPopup !== this.state.loginPopup) {
      if (localStorage.hasOwnProperty('userSID')) {
        this.setState({
          userLogin: JSON.parse(localStorage.getItem('userSID'))
        });
      }
    }
  }

  actionLoginPopUp = () => {
    this.setState({ loginPopup: !this.state.loginPopup });
  };

  actionLogOut = () => {
    localStorage.removeItem('userSID');
    this.setState({ userLogin: false });
    //ToDo req to server
  };

  render() {
    return (
      <>
        <section id="comments" className="container">
          {this.state.loginPopup && (
            <Login close={this.actionLoginPopUp}></Login>
          )}

          <h2>Comments</h2>

          {!this.state.userLogin ? (
            <div>
              <button
                className="action-btn action-btn_link"
                onClick={this.actionLoginPopUp}
              >
                Log in
              </button>{' '}
              to leave a comment.
              <hr />
            </div>
          ) : (
            <>
              <button
                className="action-btn action-btn_link"
                onClick={this.actionLogOut}
              >
                Log Out
              </button>{' '}
              <hr />
              <Item
                start={true}
                commentData={{
                  id: 0,
                  autor: this.state.userLogin,
                  text: '',
                  ctime: '',
                  utime: '',
                  parent: 0
                }}
                onSave={this.actionSave}
              />
            </>
          )}
          {this.state.spinerState && (
            <div className="comment-spiner">
              <Spiner />
            </div>
          )}
          {this.state.errors && (
            <span className="errors">{this.state.errors}</span>
          )}
          <ul>
            {this.state.commentsData &&
              this.nestedComment(this.state.commentsData)}
          </ul>
        </section>
      </>
    );
  }
}
export default Comments;
