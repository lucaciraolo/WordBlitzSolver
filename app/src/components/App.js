import React from 'react';
import BoggleBoardInput from './BoggleBoardInput';

class App extends React.Component {
  state = {
    letters: ""
  }


  handleBoardInputChange = (event) => {
    console.log('input change:', event.target.value);
    this.setState({letters: event.target.value})
  }

  render() {
    return (
      <React.Fragment>
        <BoggleBoardInput onChange={this.handleBoardInputChange}></BoggleBoardInput>
        {this.state.letters}
      </React.Fragment>
      
    );
  }
  
}

export default App;
