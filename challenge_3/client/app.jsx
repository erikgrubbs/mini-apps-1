import React from 'react';
import ReactDOM from 'react-dom';

/*----------Components-----------*/
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
    <div>
      React working
    </div>
    )
  }
}

/*-------Starting----------*/
ReactDOM.render(<App />, document.getElementById('app'));
