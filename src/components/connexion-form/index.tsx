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
    <form onSubmit={onNicknameSubmit}>
      <input
        onChange={event => setNickname(event.target.value)}
        value={nickname}
      />
    </form>
  );
};

export default ConnexionForm;
