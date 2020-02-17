import React from 'react';

import InputLoadoutForm from "./components/DPS-ui/InputLoadoutForm";
import StoredLoadoutContainer from "./containers/StoredLoadoutContainer";
import EnemyStatDisplay from "./components/DPS-ui/EnemyStatDisplay";

import './App.css';

export default class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      loadouts: []
    }
  }
  
  addLoadout(loadout) {
    this.setState({
      loadouts: [
        ...this.state.loadouts,
        loadout
      ]
    })
  }
  
  
  
  render() {
    
    return (
      <div className="App">
        <header className="App-header">
          Header
        </header>
        <div className={"Main"}>
          <EnemyStatDisplay />
          <InputLoadoutForm />
          <StoredLoadoutContainer loadouts={this.state.loadouts} addLoadout={this.addLoadout.bind(this)} />
        </div>
      </div>
    )
  }
  
}

