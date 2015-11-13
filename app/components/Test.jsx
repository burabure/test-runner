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

  const statusColor = (resultStatus) => {
    if (!hasStarted) {
      return 'initial';
    }
    if (isRunning) {
      return '#eeeeFF';
    }
    if (resultStatus) {
      return '#eeFFee';
    }
    return '#FFeeee';
  };

  const styles = {
    border    : '1px solid #eee',
    padding   : '0 10px 20px 10px',
    background: statusColor(result)
  };

  return (
    <div style={styles}>
      <h3>{description}</h3>
      Status: {getStatus()}
    </div>
  );
};

export default Test;
