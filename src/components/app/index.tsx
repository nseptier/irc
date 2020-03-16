import './styles.css';
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { addMessage } from 'stores/messages/actions';
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
    console.info('oops');
  }, [messages]);

  function onMessageChange(event: ChangeEvent<HTMLInputElement>): void {
    setMessage(event.target.value);
  };

  function onMessageSubmit(event: FormEvent): void {
    event.preventDefault();
    dispatch(addMessage({ body: message }));
    setMessage('');
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
      [connected as {currentUser.name}]
      {/*messages.map(message => (
        <div>
          [{message.createdAt}]
          {' '}
          &lt;{message.author.name}&gt;
          {' '}
          {message.body}
        </div>
        ))*/}
      <form onSubmit={onMessageSubmit}>
        <input onChange={onMessageChange} value={message} />
      </form>
    </div>
  );
};

export default App;
