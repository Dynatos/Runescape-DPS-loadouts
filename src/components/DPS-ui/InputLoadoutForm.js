import React from 'react';

function getUniversalInput() {
  return [
    getPotions(),
    getPrayer(),
    getVoidBonus(),
    getSlayerBonus(),
    getSalveAmulet()
  ]
}

function getPotions() {
  const potions = [ 'attack','strength', 'magic', 'ranged'];
  const potionTypes = ['normal', 'super'];
  return (
    <fieldset>
      <legend>Potions</legend>
      {potions.map(e => {
        return (
          <fieldset>
            <legend>{e}</legend>
            <select id={'potion-'+e}>
              <option value={"None"}>None</option>
              {potionTypes.map(type => {
                return (
                  <option value={type}>
                    {type + ' ' + e}
                  </option>
                )
              })}
          </select>
          </fieldset>
        )
      })}
    </fieldset>
  )
}

function getPrayer() {
  return (
    <select>
      <option value={""} ></option>
    </select>
  )
}

function getVoidBonus() {
  return (
    <select>
      <option value={""} ></option>
    </select>
  )
}

function getSlayerBonus() {
  return (
    <input placeholder={"Slayer Task & Helm"} type={"checkbox"}/>
  )
}

function getSalveAmulet() {
  return (
    <input placeholder={"Salve Amulet"} type={"checkbox"}/>
  )
}

export default class InputLoadoutForm extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      hidden: false
    }
  }
  
  toggleHidden() {
    console.log('this.state', this.state);
    this.setState({hidden: !this.state.hidden});
  }
  
  
  render() {
    
    return (
      <>
        <div className={"loadout__toggle-hide"} onClick={this.toggleHidden.bind(this)}>
          X
        </div>
        <div className={`loadout__input ${this.state.hidden ? "hide" : ""}`}>
          Input loadout
          <form>
            {getUniversalInput()}
          </form>
        </div>
      </>
    )
  }
  
}