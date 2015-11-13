import React, { Component } from 'react';
import { map, update } from 'ramda';
import tests from '../utils/tests';
import Test from '../components/Test.jsx';
import TestsStats from '../components/TestsStats.jsx';

export class App extends Component {
  constructor() {
    super();

    const initialTestsState =
      map(({description}) => {
        return {
          description,
          hasStarted: null,
          isRunning : null,
          result    : null
        };
      })(tests);

    this.state = {
      tests: initialTestsState,
      stats: {
        running: 0,
        failed : 0,
        passed : 0
      }
    };
  }

  updateTestState(index, result) {
    const testsResult =
      update( index,
        Object.assign({}, this.state.tests[index], { result, isRunning: false })
      )(this.state.tests);

    const testsStats =
      Object.assign({}, this.state.stats,
        {
          running: this.state.stats.running - 1,
          passed : this.state.stats.passed + (result ? 1 : 0),
          failed : this.state.stats.failed + (result ? 0 : 1)
        }
      );

    this.setState({tests: testsResult, stats: testsStats});
  }

  runTests() {
    const allStartedAndRunning =
      map( test => {
        return Object.assign({}, test, { hasStarted: true, isRunning: true });
      })(this.state.tests);

    const allRunningStats =
      Object.assign({}, this.state.stats,
        {
          running: this.state.tests.length,
          passed : 0,
          failed : 0
        }
      );

    this.setState({tests: allStartedAndRunning, stats: allRunningStats});

    for (let index = 0; index < this.state.tests.length; index++) {
      tests[index].run(this.updateTestState.bind(this, index));
    }
  }

  render() {
    const displayTests =
      map(test =>
        <Test key={test.description}
              description={test.description}
              hasStarted={test.hasStarted}
              isRunning={test.isRunning}
              result={test.result}/>
      );

    const isRunning =
      this.state.stats.running > 0;

    return (
      <div>
        <button disabled={isRunning}
                onClick={::this.runTests}>Run all tests</button>
        <TestsStats stats={this.state.stats}
                    totalTests={this.state.tests.length}/>
        <h2>Tests:</h2>
        {displayTests(this.state.tests)}
      </div>
    );
  }
}
