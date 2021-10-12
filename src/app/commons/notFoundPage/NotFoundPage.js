import React from 'react';
import './NotFoundPage.scss';

const NotFoundPage = ({errorMsg, onGoBackClick}) => {

  return (
    <div className="container not-found-page">
      <p className="error-title">Oops !</p>
      { errorMsg?.map(msg => <p key={msg} className="error-msg"> {msg}</p>)}
      <button className="go-back-btn" onClick={onGoBackClick}>Go back</button>
    </div>
  );
};

export default NotFoundPage;
