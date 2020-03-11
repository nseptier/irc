import './styles.css';
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { addMessage } from 'stores/messages/actions';
import { connect, getCurrentUser } from 'stores/users/actions';
import { RootState } from 'stores/types';
import { useDispatch, useSelector } from 'react-redux';

const App = () => {
  const currentUser = useSelector((state: RootState) => state.users.current);
  const dispatch = useDispatch();
  const [nickname, setNickname] = useState('');

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

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
    </div>
  );
};

export default App;
