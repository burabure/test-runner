import React, { Component } from 'react';
import { map, update } from 'ramda';
import tests from '../utils/tests';
import Test from '../components/Test.jsx';

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
      tests: initialTestsState
    };
  }

  runTests() {
    const allStartedAndRunning =
      map( test => {
        return Object.assign({}, test, { hasStarted: true, isRunning: true });
      })(this.state.tests);

    this.setState({tests: allStartedAndRunning});

    for (let i = 0; i < this.state.tests.length; i++) {
      tests[i].run(result => {
        const testsResult =
          update( i,
            Object.assign({}, this.state.tests[i], { result, isRunning: false })
          )(this.state.tests);

        this.setState({tests: testsResult});
      });
    }
  }

  render() {
    console.log(this.state);

    const displayTests =
      map(test =>
        <Test description={test.description}
              hasStarted={test.hasStarted}
              isRunning={test.isRunning}
              result={test.result}/>
      );

    return (
      <div>
        <button onClick={::this.runTests}>Run all tests</button>
        {displayTests(this.state.tests)}
      </div>
    );
  }
}
