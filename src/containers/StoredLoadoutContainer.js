import React from 'react';
import StoredLoadout from "../components/DPS-ui/StoredLoadout";

export default class StoredLoadoutContainer extends React.Component {
  
  
  renderLoadouts(loadouts) {
    return loadouts.map((loadout, i) => {
      return (
          <StoredLoadout
            key={"loadout-" + i}
            
          />
        )
    })
  }
  
  render() {
    
    return (
      <div className={"loadout__stored--container"}>
        {this.props.loadouts.length
          ? this.renderLoadouts(this.props.loadouts)
          : (
              <div className={"loadout__no-loadouts"}>
                You don't have any loadouts stored
              </div>
            )
        }
        <StoredLoadout />
      </div>
    )
  }
  
}