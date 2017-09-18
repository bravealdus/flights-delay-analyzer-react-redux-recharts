import React from 'react';
import { Route, Link } from 'react-router-dom'
import Home from '../components/home'
import About from '../components/about'

export default class App extends React.Component {

  render(){
    return (
      <div>
        <header>
          {/* <Link to="/">Home</Link> */}
          {/* <Link to="/about-us">About</Link> */}
        </header>

        <main>
          <Route exact path="/" component={Home} />
          <Route exact path="/about-us" component={About} />
        </main>
      </div>
    )
  }

}
