import React, { Component } from 'react';
import './Gift.css';

class Gift extends Component {
  constructor(props){
    super(props);
    this.remove = this.remove.bind(this);
  }

  remove() {
    this.props.api('delete', { key: Number(this._reactInternalFiber.key) });
  }

  render() {
    return (
      <div>
        {this.props.name}
        <button className="remove" onClick={this.remove}>X</button>
      </div>
    );
  }
}

export default Gift;
