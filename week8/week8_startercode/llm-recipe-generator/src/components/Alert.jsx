import React from 'react';

const Alert = ({ message, type }) => (
  <div className={`alert alert-${type} mt-3`} role="alert">
    {message}
  </div>
);

export default Alert;