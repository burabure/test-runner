import React from 'react';

const TestsStats = ({stats, totalTests}) => {
  const hasFinished = (stats.passed + stats.failed === totalTests);

  const displayRunnerBar = `[${String(
                            ' . '.repeat(totalTests) +
                            ' · '.repeat(stats.passed + stats.failed))
                          .slice(-(totalTests * 3))
                          .split('')
                          .reverse()
                          .join('')
                          }]`;

  return (
    <div>
      <h3>Stats:</h3>
      <h4>{displayRunnerBar} {hasFinished ? 'Finished!' : null}</h4>
      Running: {stats.running} / {totalTests}
      {' | '}
      Passed: {stats.passed} / {totalTests}
      {' | '}
      Failed: {stats.failed} / {totalTests}
    </div>
  );
};

export default TestsStats;
