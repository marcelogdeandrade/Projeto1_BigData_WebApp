import React, { Component } from 'react';
import {
  Icon, 
  Label, 
  Menu, 
  Table, 
  Message, 
  Dimmer,
  Loader, 
  Image,
  Segment, 
  Button, 
  Modal, 
  Header 
} from 'semantic-ui-react'

import { 
  getSpecies, 
  removeSpecies 
} from '../../modules/Controller'


class ListSpecies extends Component {

  constructor(props){
    super(props)
    this.state = {
      species: [{idSpecie: '1', name: 'teste' }], //Trocar depois para array vazia
      fetching: false,
      error: false,
      errorRemoveSpecies: false,
      successRemoveSpecies: false,
      modalOpen: false
    }
  }

  /**
   * 
   * Buscar espécies
   * @memberof ListSpecies
   */
  componentDidMount() {
    this.setState({
      fetching: true
    })
    getSpecies()
      .then(result => {
        if (result.problem){
          this.setState({
            error: true,
            fetching: false
          })
        } else {
          this.setState({
            error: false,
            species: result.data,
            fetching: false
          })
        }
      })
  }
  
  _renderRow(id, name) {
    return (
    <Table.Row>
      <Table.Cell>{id}</Table.Cell>
      <Table.Cell>{name}</Table.Cell>
      <Table.Cell textAlign={'center'}>
          <Button negative icon='remove' onClick={() => this._handleOpen(id)}/>
      </Table.Cell>
    </Table.Row>
    )
  }

  _renderTable() {
    return (
     <Table celled>

        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Id</Table.HeaderCell>
            <Table.HeaderCell>Nome</Table.HeaderCell>
            <Table.HeaderCell width={1}></Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {this.state.species.map(specie => {
            return this._renderRow(specie.idSpecie, specie.name)
          })}
        </Table.Body>

      </Table>
    )
  }

  /**
   * Handlers do modal
   * @memberof ListSpecies
   */
  _handleOpen = (id) => this.setState({selectedSpecies: id, modalOpen: true })

  _handleClose = () => this.setState({ modalOpen: false })

  
  handleRemoveSpecie = () => {
    removeSpecies(this.state.selectedSpecies)
      .then(result => {
        this.setState({
          fetching: false,
          modalOpen: false
        })
        if (!result.problem) {
          this.setState({
            successRemoveSpecies: true
          })
        } else {
          this.setState({
            errorRemoveSpecies: true
          })
        }
      })
  }

  _renderMessages(){
    return(
    <div>
      <Message
        error
        hidden={!this.state.error}
        header='Erro'
        content='Houve um erro ao tentar listar as espécies'
      />
        <Message
          error
          hidden={!this.state.errorRemoveSpecies}
          header='Erro'
          content='Houve um erro ao tentar remover uma espécie'
        />
        <Message
          error
          hidden={!this.state.successRemoveSpecies}
          header='Sucesso'
          content='Espécie removida com sucesso'
        />
      </div>
    )
  }

  _renderModal(){
    return(
      <Modal
        open={this.state.modalOpen}
        onClose={this._handleClose}
        basic
        size='small'
      >
        <Header icon='remove circle' content='Remover Espécie' />
        <Modal.Content>
          <h3>Tem certeza que deseja remover essa espécie?</h3>
        </Modal.Content>
        <Modal.Actions>
          <Button color='green' onClick={this.handleRemoveSpecie} inverted>
            <Icon name='checkmark' /> Sim
              </Button>
          <Button color='red' onClick={this._handleClose} inverted>
            <Icon name='cancel' /> Não
              </Button>
        </Modal.Actions>
      </Modal>
    )
  }

  render() {
    return (
      <div>
        {this._renderMessages()}
        <Segment>
          <Dimmer 
            disabled={!this.state.fetching}
            active={this.state.fetching}
          >
            <Loader />
          </Dimmer>
          {this._renderTable()}
        </Segment>
        {/* Modal remover espécie */}
        {this._renderModal()}
      </div>
    )
  }
}

export default ListSpecies;
