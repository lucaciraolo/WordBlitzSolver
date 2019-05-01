import React from 'react';
import BoggleBoardInput from './BoggleBoardInput';
import Solution from './Solution';

import boggle from 'node-boggle-solver';
import util from 'util';
class App extends React.Component {
  state = {
    letters: "koloddnessgouwva",
    solutions: [],
    solution: {}
  }

  componentDidMount = async () => {
    console.log('loading');
    // Fetch the dictionary
    const response = await fetch('sowpods.txt');
    const text = await response.text();
    const dict = text.split('\n');

    // Set up the solver and make it support promises
    const solver = boggle(dict);
    const solve = util.promisify(solver.solve);

    this.solve = solve;
    this.findSolutions();
    console.log('loaded');
  }


  handleBoardInputChange = (event) => {
    // console.log('input change:', event.target.value);
    this.setState({letters: event.target.value})
  }

  handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      // console.log('Enter key pressed');
      this.findSolutions();
    }
  }

  nextSolution = (event) => {
    console.log("key pressed");
    this.setState(({solutions}) => {
      const solution = solutions.shift();
      return {
        solutions,
        solution
      }
    })
  }

  findSolutions = async () => {
    // Get the solution words
    const result = await this.solve(this.state.letters);
    const solutions = result.full;
    solutions.sort((a, b) => b.word.length - a.word.length);
    const solution = solutions.shift();

    this.setState({solutions, solution});
  }


  render() {
    const solutions = this.state.solutions.map(solution => (<li>{solution.word}</li>));
    const { word, coords} = this.state.solution;

    let showSolutionGrid;
    if (this.state.solutions.length > 0) {
      showSolutionGrid = <Solution word={word} coords={coords} letters={this.state.letters} onClick={this.nextSolution}/>;
    }

    return (
      <React.Fragment>
        <BoggleBoardInput value={this.state.letters} onChange={this.handleBoardInputChange} onKeyDown={this.handleKeyDown}></BoggleBoardInput>
        <ul onClick={this.nextSolution}>{solutions}</ul>

        {showSolutionGrid}
        
      </React.Fragment>
    );
  }
  
}

export default App;
