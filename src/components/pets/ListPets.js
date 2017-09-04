import React, { Component } from 'react';
import { Icon, Label, Menu, Table, Message, Dimmer, Loader, Image, Segment } from 'semantic-ui-react'

import { getPets } from '../../modules/Controller'


class ListPets extends Component {

  constructor(props) {
    super(props)
    this.state = {
      pets: [],
      fetching: false,
      error: false
    }
    this.renderTable = this.renderTable.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
  }

  componentDidMount() {
    this.setState({
      fetching: true
    })
    getPets()
      .then(result => {
        if (result.problem) {
          this.setState({
            error: true,
            fetching: false
          })
        } else {
          this.setState({
            error: false,
            pets: result.data,
            fetching: false
          })
        }
      })
  }

  renderRow(id, name, speciesName, birthDate, clientName, medicines) {
    return (
      <Table.Row>
        <Table.Cell>{id}</Table.Cell>
        <Table.Cell>{name}</Table.Cell>
        <Table.Cell>{birthDate}</Table.Cell>        
        <Table.Cell>{speciesName}</Table.Cell>
        <Table.Cell>{clientName}</Table.Cell>
        <Table.Cell>{medicines}</Table.Cell> {/*Mudar isso para um dropdown*/}
      </Table.Row>
    )
  }

  renderTable() {
    return (
      <Table celled>

        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Id</Table.HeaderCell>
            <Table.HeaderCell>Nome</Table.HeaderCell>
            <Table.HeaderCell>Data de nascimento</Table.HeaderCell>
            <Table.HeaderCell>Espécie</Table.HeaderCell>
            <Table.HeaderCell>Cliente</Table.HeaderCell>
            <Table.HeaderCell>Remédios</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {this.state.pets.map(pet => {
            return this.renderRow(pet.idPet, pet.name, pet.speciesName, pet.birthDate, pet.clientName, pet.medicines)
          })}
        </Table.Body>

      </Table>
    )
  }

  renderLoading() {

  }

  render() {
    return (
      <div>
        <Message
          error
          visible={this.state.error}
          header='Erro'
          content='Houve um erro ao tentar listar os pets'
        />
        <Segment>
          <Dimmer
            disabled={!this.state.fetching}
            active={this.state.fetching}
          >
            <Loader />
          </Dimmer>
          {this.renderTable()}
        </Segment>
      </div>
    )
  }
}

export default ListPets;
