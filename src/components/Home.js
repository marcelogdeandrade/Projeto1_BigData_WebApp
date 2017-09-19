import React, { Component } from 'react'
import { Menu, Segment, Dropdown } from 'semantic-ui-react'
import AddSpecies from './species/AddSpecies'
import ListSpecies from './species/ListSpecies'
import ListPets from './pets/ListPets'
import AddPet from './pets/AddPet'
import ListMedicies from './medicines/ListMedicines'
import AddMedicine from './medicines/AddMedicine'
import MedicinesPets from './relmedicinespets/MedicinesPets'
import AddIllness from './illnesses/AddIllness'
import ListIllnesses from './illnesses/ListIllnesses'
import IllnessesPets from './relillnessespets/IllnessesPets'
import AddClient from './clients/AddClient'
import ListClients from './clients/ListClients'
import AddFood from './foods/AddFood'

class Home extends Component {
  state = {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  _renderContent() {
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
    } if (this.state.activeItem === 'list_medicines_pets') {
      return (
        <MedicinesPets />
      )
    } if (this.state.activeItem === 'add_illness') {
      return (
        <AddIllness />
      )
    } if (this.state.activeItem === 'list_illnesses') {
      return (
        <ListIllnesses />
      )
    } if (this.state.activeItem === 'list_illnesses_pets') {
      return (
        <IllnessesPets />
      )
    } if (this.state.activeItem === 'add_client') {
      return (
        <AddClient />
      )
    } if (this.state.activeItem === 'list_clients') {
      return (
        <ListClients />
      )
    } if (this.state.activeItem === 'add_food') {
      return (
        <AddFood />
      )
    } if (this.state.activeItem === 'add_foodlog') {
      return (
        <AddFoodLog />
      )
    } if (this.state.activeItem === 'list_foodlog') {
      return (
        <ListFoodLog />
      )
    }
  }

  render() {
    const { activeItem } = this.state

    return (
      <Segment>
        <Menu>
          <Dropdown item text='Espécies'>
            <Dropdown.Menu>
              <Dropdown.Item name='list_species' onClick={this.handleItemClick}>Listar Espécies</Dropdown.Item>
              <Dropdown.Item name='add_species' onClick={this.handleItemClick}>Adicionar Espécie</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown item text='Pets'>
            <Dropdown.Menu>
              <Dropdown.Item name='list_pets' onClick={this.handleItemClick}>Listar Pets</Dropdown.Item>
              <Dropdown.Item name='add_pet' onClick={this.handleItemClick}>Adicionar Pet</Dropdown.Item>
              <Dropdown.Item name='list_medicines_pets' onClick={this.handleItemClick}>Cartela de Remédios</Dropdown.Item>
              <Dropdown.Item name='list_illnesses_pets' onClick={this.handleItemClick}>Cartela de Doenças</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown item text='Remédios'>
            <Dropdown.Menu>
              <Dropdown.Item name='list_medicines' onClick={this.handleItemClick}>Listar Remédios</Dropdown.Item>
              <Dropdown.Item name='add_medicine' onClick={this.handleItemClick}>Adicionar Remédio</Dropdown.Item>
              <Dropdown.Item name='list_medicines_pets' onClick={this.handleItemClick}>Cartela de Remédios</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown item text='Doenças'>
            <Dropdown.Menu>
              <Dropdown.Item name='add_illness' onClick={this.handleItemClick}>Adicionar Doença</Dropdown.Item>
              <Dropdown.Item name='list_illnesses' onClick={this.handleItemClick}>Listar Doenças</Dropdown.Item>
              <Dropdown.Item name='list_illnesses_pets' onClick={this.handleItemClick}>Cartela de Doenças</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown item text='Clientes'>
            <Dropdown.Menu>
              <Dropdown.Item name='list_clients' onClick={this.handleItemClick}>Listar Clientes</Dropdown.Item>
              <Dropdown.Item name='add_client' onClick={this.handleItemClick}>Adicionar Cliente</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown item text='Comidas'>
            <Dropdown.Menu>
              <Dropdown.Item name='add_food' onClick={this.handleItemClick}>Adicionar Comida</Dropdown.Item>
              <Dropdown.Item name='list_food' onClick={this.handleItemClick}>Listar Comidas</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown item text='Histórico de Comida'>
            <Dropdown.Menu>
              <Dropdown.Item name='add_foodlog' onClick={this.handleItemClick}>Adicionar Comida</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

        </Menu>
        {this._renderContent()}
      </Segment>
    )
  }
}


export default Home
