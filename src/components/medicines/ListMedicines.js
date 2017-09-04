import React, { Component } from 'react';
import { Icon, Label, Menu, Table, Message, Dimmer, Loader, Image, Segment  } from 'semantic-ui-react'

import { getMedicines } from '../../modules/Controller'


class ListMedicines extends Component {

  constructor(props) {
    super(props)
    this.state = {
      medicines: [],
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
    getMedicines()
      .then(result => {
        if (result.problem) {
          this.setState({
            error: true,
            fetching: false
          })
        } else {
          this.setState({
            error: false,
            medicines: result.data,
            fetching: false
          })
        }
      })
  }

  renderRow(id, name, quantity, pets) {
    return (
      <Table.Row>
        <Table.Cell>{id}</Table.Cell>
        <Table.Cell>{name}</Table.Cell>
        <Table.Cell>{quantity}</Table.Cell>
        <Table.Cell>{pets}</Table.Cell> {/*Mudar isso para um dropdown*/}
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
            <Table.HeaderCell>Quantidade</Table.HeaderCell>
            <Table.HeaderCell>Pets</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {this.state.medicines.map(medicine => {
            return this.renderRow(medicine.idMedicine, medicine.name, medicine.pets)
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
          content='Houve um erro ao tentar listar os remédios'
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

export default ListMedicines;
