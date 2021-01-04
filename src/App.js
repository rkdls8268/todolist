import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: null
    }
  }

  // componentDidMount() 사용해서 서버 사이드로 접근
  componentDidMount() {
    //fetch 말고 Axios 사용 가능?
    // fetch를 통해서 서버 사이드로의 url 요청 가능
    fetch('http://localhost:3001/api')
      .then(res => res.json())
      .then(data => this.setState({title: data.title}));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <div>
            {this.state.title? <h1>{this.state.title}</h1>:<h1>loading...</h1>}
          </div>
        </header>
      </div>
    );
  }
}

export default App;
