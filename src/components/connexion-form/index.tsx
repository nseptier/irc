import './styles.css';

import React, { FormEvent, useState } from 'react';

type ConnexionFormProps ={
  onSubmit: (nickname: string) => void,
};

const ConnexionForm = ({ onSubmit }: ConnexionFormProps) => {
  const [nickname, setNickname] = useState('');

  function onNicknameSubmit(event: FormEvent): void {
    event.preventDefault();
    onSubmit(nickname);
  }

  return (
    <form className="connexion-form" onSubmit={onNicknameSubmit}>
      <input
        autoFocus
        className="connexion-form__input"
        onChange={event => setNickname(event.target.value)}
        placeholder="Choose a nickname"
        value={nickname}
      />
    </form>
  );
};

export default ConnexionForm;
