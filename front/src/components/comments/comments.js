import React from 'react';
import './comments.scss';
import Item from './item';
import {
  getComments,
  postComments,
  deleteComment,
  putComment
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

  actionSave = async (id, text, parent, edited) => {
    if (this.state.userLogin) {
      const autorID = this.state.userLogin.id;
      let resData = {};
      this.setState({ spinerState: true });
      if (edited && id !== 0) {
        // TODO: putComments
        resData = await putComment({ id, text, parent, autorID });
        resData = await getComments();
      } else {
        resData = await postComments({ id, text, parent, autorID });
      }
      this.setState({ spinerState: false });
      this.setState({ errors: resData.error });
      // Q: update all or only new
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
    // TODO: req to server
  };

  render() {
    return (
      <>
        <section id="comments" className="container">
          {this.state.loginPopup && (
            <Login close={this.actionLoginPopUp}></Login>
            // TODO: Show LoginPopUp in  current screen location
            /*Q: index.js:1375 Warning: Can't perform a React state update
             on an unmounted component. This is a no-op, but it indicates 
             a memory leak in your application. To fix, cancel all 
             subscriptions and asynchronous tasks in the 
             componentWillUnmount method.
             in Login (at comments.js:131)*/
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
              {/* FIXME: */}
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
              {/* TODO: if all is OK show something */}
            </div>
          )}
          {this.state.errors && (
            <span className="errors">{this.state.errors}</span>
            //FIXME: ? place where error to show
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
