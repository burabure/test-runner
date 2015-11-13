import React from 'react';

const Test = ({description, hasStarted, isRunning, result}) => {
  // getStatus is completely tied to implementation detail
  // so I feel like declaring params would be too verbose and
  // also MIGHT confuse some people because of same name declarations
  const getStatus = () => {
    if (!hasStarted) {
      return 'Not Started Yet';
    }

    if (isRunning) {
      return 'Running...';
    }

    if (result !== undefined && !isRunning) {
      return result ? 'Passed!' : 'Failed!';
    }
  };

  return (
    <div>
      <h2>{description}</h2>
      Status: {getStatus()}
    </div>
  );
};

export default Test;
