import React, { Component } from 'react';
import Gift from './Gift';
import logo from './logo.png';
import './App.css';

const toJSON = async res => {
  if (res.ok) return res.json()
  const body = await res.text()
  const err = Error('request failed')
  err.body = body
  err.res = res
  throw err
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gifts: [],
    };

    const updateState = gifts => this.setState({ gifts });
    this.api = async (method, body) => fetch('//localhost:3232/', {
      method: method || 'get',
      headers: { 'Content-Type': 'application/json' },
      body: body && JSON.stringify(body)
    }).then(toJSON)
      .then(updateState);

    this.api();

    this.createGift = this.createGift.bind(this);
  }

  createGift(event) {
    event.preventDefault();
    const input = event.target[0];
    const name = input.value;
    const previous = this.state.gifts[this.state.gifts.length - 1];

    this.setState({
      gifts: this.state.gifts.concat([
        {
          name,
          api: this.api,
          key: previous ? previous.key + 1 : 0,
        }
      ])
    });
    this.api('post', { name });
  }

  notify() {
    fetch('//localhost:3232/notify');
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">It's Christmas !</h1>
        </header>

        <img alt="gif" src="https://media.giphy.com/media/JltOMwYmi0VrO/giphy.gif" />

        <form onSubmit={this.createGift}>
          <input type="text" />
          <button type="submit"> Ajouter </button>
        </form>

        <div className="GiftWrapper">
          {
            this.state.gifts
              .map(props => <Gift api={this.api} {...props}></Gift>)
          }
        </div>

        <button onClick={this.notify} type="button" className="mail">
          Dear Santa Florian, send me my gifts
        </button>

      </div>
    );
  }
}

export default App;
