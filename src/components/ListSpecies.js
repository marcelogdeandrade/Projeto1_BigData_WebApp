import React, { Component } from 'react';
import { Icon, Label, Menu, Table } from 'semantic-ui-react'
import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react'
import { getSpecies } from '../modules/Controller'


class ListSpecies extends Component {

  constructor(props){
    super(props)
    this.state = {
      species: [],
      fetching: false
    }
    this.renderTable = this.renderTable.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
  }

  componentDidMount() {
    this.setState({
      fetching: true
    })
    getSpecies()
      .then(result => {
        this.setState({
          species: result.data,
          fetching: false
        })
      })
  }
  
  renderRow(id, name) {
    return (
    <Table.Row>
      <Table.Cell>{id}</Table.Cell>
      <Table.Cell>{name}</Table.Cell>
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
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {this.state.species.map(specie => {
            return this.renderRow(specie.idSpecie, specie.name)
          })}
        </Table.Body>

      </Table>
    )
  }

  renderLoading(){

  }

  render() {
    return (
      <Segment>
        <Dimmer 
          disabled={!this.state.fetching}
          active={this.state.fetching}
        >
          <Loader />
        </Dimmer>
        {this.renderTable()}
      </Segment>
    )
  }
}

export default ListSpecies;
