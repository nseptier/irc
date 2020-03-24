import './styles.css';

import moment from 'moment';
import React, {
  ChangeEvent,
  FormEvent,
  Fragment,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useDispatch } from 'react-redux';

import {
  addMessage,
  getMessages,
  listenToAddedMessages,
} from 'stores/messages/actions';
import {
  getCurrentUser,
  listenToConnectedUsers,
} from 'stores/users/actions';
import { Message } from 'stores/messages/types';
import { useAllMessages } from 'stores/messages/selectors';
import { useCurrentUser } from 'stores/users/selectors';

const App = () => {
  const currentUser = useCurrentUser();
  const messages = useAllMessages();
  const dispatch = useDispatch();
  const formNode = useRef<HTMLFormElement | null>(null);
  const scrollEndNode = useRef<HTMLDivElement | null>(null);
  const [message, setMessage] = useState('');
  const [didInitMessages, setDidInitMessages] = useState(false);

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
    scrollToBottom(didInitMessages);
    if (messages.length && !didInitMessages) {
      setDidInitMessages(true);
    }
  }, [didInitMessages, messages]);

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
    formNode.current!.dispatchEvent(new Event(
      'submit',

      // Firefox will ignore event.preventDefault() without this
      { cancelable: true },
    ));
  }

  function onMessageSubmit(event: FormEvent): void {
    let body = message.trim();

    event.preventDefault();
    if (!body) return;
    if (body === '/shrug') body = '¯\\_(ツ)_/¯';
    dispatch(addMessage({ body }));
  }

  function scrollToBottom(isSmooth: boolean): void {
    if (!scrollEndNode.current) return;
    scrollEndNode.current.scrollIntoView({
      behavior: isSmooth ? 'smooth' : 'auto',
    });
  }

  const textareaRef = (node: HTMLElement | null) => {
    if (!node) return;
    node.style.height = '1px';
    node.style.height = `${node.scrollHeight}px`;
    node.focus();
  };

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
        <div ref={scrollEndNode} />
      </div>
      <form className="text-field" onSubmit={onMessageSubmit} ref={formNode}>
        <textarea
          className="text-field__input"
          onChange={onMessageChange}
          onKeyDown={onMessageKeyDown}
          ref={textareaRef}
          value={message}
        />
      </form>
    </div>
  );
};

export default App;
