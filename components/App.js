import React from 'react';

export class App extends React.Component {
  render() {
    return (
      <div className="container-fluid app">
        {this.props.children}
      </div>
    );
  }
}
