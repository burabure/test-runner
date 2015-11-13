import React from 'react';

const TestsStats = ({stats, totalTests}) => {
  const hasFinished = (stats.passed + stats.failed === totalTests);
  
  return (
    <div>
      <h3>Stats:</h3>
      Running: {stats.running} / {totalTests}
      {' | '}
      Passed: {stats.passed} / {totalTests}
      {' | '}
      Failed: {stats.failed} / {totalTests}

      {hasFinished ? ' | Finished!' : null}
    </div>
  );
};

export default TestsStats;
