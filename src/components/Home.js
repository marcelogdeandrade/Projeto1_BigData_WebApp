import React, { Component } from 'react'
import { Menu, Segment } from 'semantic-ui-react'
import AddSpecies from './species/AddSpecies'
import ListSpecies from './species/ListSpecies'
import ListPets from './pets/ListPets'
import AddPet from './pets/AddPet'
import ListMedicies from './medicines/ListMedicines'
import AddMedicine from './medicines/AddMedicine'

class Home extends Component {
  state = {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  renderContent() {
    if (this.state.activeItem === 'list_species'){
      return (
        <ListSpecies/>
      )
    } if (this.state.activeItem === 'add_species'){
      return (
        <AddSpecies/>
      )
    } if (this.state.activeItem === 'list_pets') {
      return (
        <ListPets />
      )
    } if (this.state.activeItem === 'add_pet') {
      return (
        <AddPet />
      )
    } if (this.state.activeItem === 'list_medicines') {
      return (
        <ListMedicies />
      )
    } if (this.state.activeItem === 'add_medicine') {
      return (
        <AddMedicine />
      )
    } 

  }
  render() {
    const { activeItem } = this.state

    return (
      <Segment>
        <Menu>
          <Menu.Item name='list_species' active={activeItem === 'list_species'} onClick={this.handleItemClick}>
            Listar Espécies
          </Menu.Item>

          <Menu.Item name='add_species' active={activeItem === 'add_species'} onClick={this.handleItemClick}>
            Adicionar Espécie
          </Menu.Item>

          <Menu.Item name='list_pets' active={activeItem === 'list_pets'} onClick={this.handleItemClick}>
            Listar Pets
          </Menu.Item>

          <Menu.Item name='add_pet' active={activeItem === 'add_pet'} onClick={this.handleItemClick}>
            Adicionar Pet
          </Menu.Item>

          <Menu.Item name='list_medicines' active={activeItem === 'list_medicines'} onClick={this.handleItemClick}>
            Listar Remédios
          </Menu.Item>

          <Menu.Item name='add_medicine' active={activeItem === 'add_medicine'} onClick={this.handleItemClick}>
            Adicionar Remédio
          </Menu.Item>

        </Menu>
        {this.renderContent()}
      </Segment>
    )
  }
}


export default Home