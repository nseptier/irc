import './styles.css';
import moment from 'moment';
import React, {
  ChangeEvent,
  FormEvent,
  Fragment,
  useEffect,
  useState,
} from 'react';
import {
  addMessage,
  getMessages,
  listenToAddedMessages,
} from 'stores/messages/actions';
import { connect, getCurrentUser } from 'stores/users/actions';
import { useAllMessages } from 'stores/messages/selectors';
import { useCurrentUser } from 'stores/users/selectors';
import { useDispatch } from 'react-redux';

const App = () => {
  const currentUser = useCurrentUser();
  const messages = useAllMessages();
  const dispatch = useDispatch();
  const [message, setMessage] = useState('');
  const [nickname, setNickname] = useState('');

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  useEffect(() => {
    if (currentUser) {
      dispatch(getMessages());
      dispatch(listenToAddedMessages());
    }
  }, [currentUser, dispatch]);

  useEffect(() => {
    setMessage('');
  }, [messages]);

  function onMessageChange(event: ChangeEvent<HTMLInputElement>): void {
    setMessage(event.target.value);
  };

  function onMessageSubmit(event: FormEvent): void {
    event.preventDefault();
    dispatch(addMessage({ body: message }));
  }

  function onNicknameChange(event:ChangeEvent<HTMLInputElement>): void {
    setNickname(event.target.value);
  }

  function onNicknameSubmit(event: FormEvent): void {
    event.preventDefault();
    dispatch(connect({ name: nickname }));
  }

  if (!currentUser) return (
    <form onSubmit={onNicknameSubmit}>
      <input
        onChange={onNicknameChange}
        placeholder="Nickname"
        value={nickname}
      />
    </form>
  );

  return (
    <div className="app">
      <div className="messages-thread">
        {messages.map(message => (
          <Fragment key={message.id}>
            <span className="timestamp">
              {moment(+message.createdAt).format('HH:mm:ss')}
            </span>
            <span className="author">{message.author.name}</span>
            <span className="body">{message.body}</span>
          </Fragment>
        ))}
        <form className="text-field" onSubmit={onMessageSubmit}>
          <input
            className="text-field__input"
            onChange={onMessageChange}
            value={message}
          />
        </form>
      </div>
    </div>
  );
};

export default App;
