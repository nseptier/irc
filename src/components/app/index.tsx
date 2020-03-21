import './styles.css';
import moment from 'moment';
import React, {
  ChangeEvent,
  FC,
  FormEvent,
  Fragment,
  KeyboardEvent,
  useEffect,
  useState,
} from 'react';
import {
  addMessage,
  getMessages,
  listenToAddedMessages,
} from 'stores/messages/actions';
import {
  connect,
  getCurrentUser,
  listenToConnectedUsers,
} from 'stores/users/actions';
import { Message } from 'stores/messages/types';
import { useAllMessages } from 'stores/messages/selectors';
import { useCurrentUser } from 'stores/users/selectors';
import { useDispatch } from 'react-redux';

const App = () => {
  const currentUser = useCurrentUser();
  const messages = useAllMessages();
  const dispatch = useDispatch();
  const [message, setMessage] = useState('');
  const [nickname, setNickname] = useState('');
  let form: HTMLElement | null;

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  useEffect(() => {
    if (currentUser) {
      dispatch(getMessages());
      dispatch(listenToAddedMessages());
      dispatch(listenToConnectedUsers());
    }
  }, [currentUser, dispatch]);

  useEffect(() => {
    setMessage('');
  }, [messages]);

  function buildAnnouncement(message: Message): string {
    switch (message.event) {
      case 'USER_CONNECTED': return `${message.author.name} has joined.`;

      default: return '';
    }
  }

  function onMessageChange(event: ChangeEvent<HTMLTextAreaElement>): void {
    setMessage(event.target.value);
  };

  function onMessageKeyDown(event: KeyboardEvent<HTMLTextAreaElement>): void {
    if (event.key !== 'Enter' || event.shiftKey) return;
    event.preventDefault();
    form!.dispatchEvent(new Event(
      'submit',

      // Firefox will ignore event.preventDefault() without this
      { cancelable: true },
    ));
  }

  function onMessageSubmit(event: FormEvent): void {
    const body = message.trim();

    event.preventDefault();
    if (!body) return;
    dispatch(addMessage({ body }));
  }

  function onNicknameChange(event:ChangeEvent<HTMLInputElement>): void {
    setNickname(event.target.value);
  }

  function onNicknameSubmit(event: FormEvent): void {
    event.preventDefault();
    dispatch(connect({ name: nickname }));
  }

  function formRef(this: FC, node: HTMLElement | null) {
    if (!node) return;
    form = node;
  };

  const textareaRef = (node: HTMLElement | null) => {
    if (!node) return;
    node.style.height = '1px';
    node.style.height = `${node.scrollHeight}px`;
  };

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
            {message.system
              ? <>
                <span className="announcement">
                  *** {buildAnnouncement(message)}
                </span>
              </>
              : <>
                <span className="author">{message.author.name}</span>
                <span className="body">{message.body}</span>
              </>
            }
          </Fragment>
        ))}
        <form className="text-field" onSubmit={onMessageSubmit} ref={formRef}>
          <textarea
            className="text-field__input"
            onChange={onMessageChange}
            onKeyDown={onMessageKeyDown}
            ref={textareaRef}
            value={message}
          />
        </form>
      </div>
    </div>
  );
};

export default App;
