import React, { Component } from 'react'
import { Menu, Segment } from 'semantic-ui-react'
import AddSpecie from './AddSpecie'
import ListSpecies from './ListSpecies'

class Home extends Component {
  state = {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  renderContent() {
    if (this.state.activeItem === 'list_specie'){
      return (
        <ListSpecies/>
      )
    } if (this.state.activeItem === 'add_specie'){
      return (
        <AddSpecie/>
      )
    }

  }
  render() {
    const { activeItem } = this.state

    return (
      <Segment>
        <Menu>
          <Menu.Item name='list_specie' active={activeItem === 'list_specie'} onClick={this.handleItemClick}>
            Listar Espécies
          </Menu.Item>

          <Menu.Item name='add_specie' active={activeItem === 'add_specie'} onClick={this.handleItemClick}>
            Adicionar Espécie
          </Menu.Item>

        </Menu>
        {this.renderContent()}
      </Segment>
    )
  }
}


export default Home