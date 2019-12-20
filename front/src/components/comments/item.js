import React from 'react';
import './comments.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faReply,
  faEdit,
  faTrashAlt,
  faSave,
  faTimes
} from '@fortawesome/free-solid-svg-icons';

// Q: function toDate better put in a separate file or it's normal
function toDate(time) {
  let datastring = '';
  const monthsName = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];
  if (time) {
    const d = new Date(time);
    const minutes =
      d.getMinutes().toString().length < 2
        ? '0' + d.getMinutes()
        : d.getMinutes();
    const months = monthsName[d.getMonth()];
    datastring = `${d.getHours()}:${minutes} ${d.getDate()} ${months} ${d.getFullYear()}`;
  }
  return datastring;
}

class Component extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      commentText: this.props.commentData.text || '',
      textAreaState: this.props.start || false,
      autorEdit: this.props.start || false,
      textEdited: false,
      textAreaVal: ''
    };
    this.textArea = React.createRef();
  }

  handleTextChange = event => {
    if (this.state.textAreaVal.length < 300) {
      this.setState({ textAreaVal: event.target.value });
    } else {
      this.setState({
        textAreaVal: event.target.value.slice(0, event.target.value.length - 1)
      });
    }
    if (this.state.textAreaVal.length > 2 && this.state.textAreaState) {
      this.setState({ textEdited: true });
    } else {
      this.setState({ textEdited: false });
    }
  };

  componentDidUpdate() {
    if (this.state.textAreaState) {
      this.textArea.current.focus();
    }
  }

  actiontextAreaState = () => {
    this.setState({ textAreaState: !this.state.textAreaState });
  };

  actionCloseBtn = () => {
    // Q: setState like this it's OK?
    this.setState({
      textAreaState: !this.state.textAreaState,
      textAreaVal: ' ',
      textEdited: false,
      autorEdit: false
    });
  };

  actionEditBtn = () => {
    this.setState({
      autorEdit: !this.state.autorEdit,
      textAreaVal: this.state.commentText,
      textAreaState: true
    });
  };

  actionSaveBtn = () => {
    this.props.onSave(
      this.props.commentData.id,
      this.state.textAreaVal,
      this.props.commentData.parent,
      this.state.autorEdit
    );
    this.setState({
      textAreaVal: ' ',
      textEdited: false,
      autorEdit: false
    });
    if (this.state.textAreaState && !this.props.start) {
      this.setState({ textAreaState: false });
    }
  };

  render() {
    // FIXME: blocks doesn’t look very cool
    return (
      <li
        className="comment"
        id={this.props.commentData.id}
        key={this.props.commentData.id}
      >
        {this.props.commentData.autor.photo && (
          <div className="avatar">
            <img
              src={`/img/${this.props.commentData.autor.photo}`}
              alt="user-avatar"
            />
          </div>
        )}
        <div className="post-body">
          <header className="post-header">
            <div className="post-meta">
              <span className="autor">
                {!this.props.commentData.start &&
                  this.props.commentData.autor.login}
              </span>
              <span className="post-time">
                {this.props.commentData.ctime === this.props.commentData.utime
                  ? toDate(this.props.commentData.utime)
                  : toDate(this.props.commentData.utime) + ' edited'}
              </span>
            </div>
          </header>

          {!this.state.autorEdit && !this.props.start && (
            <div className="message">
              <p>{this.props.commentData.text}</p>
            </div>
          )}

          {this.state.textAreaState ? (
            <>
              <div className="textArea-wraper">
                {this.state.textAreaState && !this.props.start && (
                  <button className="action-btn  action-btn_close">
                    <FontAwesomeIcon
                      icon={faTimes}
                      size="lg"
                      onClick={this.actionCloseBtn}
                    />
                  </button>
                )}
                {/* TODO: 
                  text area auto height
                  if copy\paste
                */}
                <textarea
                  className="reply-text"
                  placeholder="Write a response..."
                  value={this.state.textAreaVal}
                  onChange={this.handleTextChange}
                  ref={this.textArea}
                  onFocus={function(e) {
                    var val = e.target.value;
                    e.target.value = '';
                    e.target.value = val;
                  }}
                />
                <span className="calcChar">
                  {this.state.textAreaVal.length} of 300
                </span>
              </div>
            </>
          ) : (
            false
          )}

          <footer className="post-footer">
            <div className="btn-menu">
              {!this.props.start &&
                !this.props.editable &&
                !this.state.textAreaState && (
                  <button className="action-btn">
                    <FontAwesomeIcon
                      icon={faReply}
                      size="lg"
                      onClick={this.actiontextAreaState}
                    />
                  </button>
                )}

              {this.state.textEdited && (
                <button
                  className="action-btn action-btn_hidden"
                  onClick={this.actionSaveBtn}
                >
                  <FontAwesomeIcon icon={faSave} size="lg" />
                </button>
              )}
              {this.props.editable && !this.props.start && (
                <>
                  {!this.state.textAreaState && (
                    <button
                      className="action-btn action-btn_hidden"
                      onClick={this.actionEditBtn}
                    >
                      <FontAwesomeIcon icon={faEdit} size="lg" />
                    </button>
                  )}

                  <button
                    className="action-btn action-btn_hidden"
                    onClick={() => {
                      this.props.onDelete(this.props.commentData.id);
                    }}
                  >
                    <FontAwesomeIcon icon={faTrashAlt} size="lg" />
                  </button>
                </>
              )}
            </div>
          </footer>
        </div>
        <ul className="child-message">{this.props.children}</ul>
      </li>
    );
  }
}

export default Component;
