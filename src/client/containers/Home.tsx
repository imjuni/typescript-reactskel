import * as React from 'react';
import { Navbar } from '../components/navbar/Navbar';

export class Home extends React.Component<any, any> {
  render() {
    return (
      <div className="navbar-with-content-container">
        <h1>Home</h1>
        <p>TypeScript + React + Webpack Test</p>
      </div>
    );
  }
}
