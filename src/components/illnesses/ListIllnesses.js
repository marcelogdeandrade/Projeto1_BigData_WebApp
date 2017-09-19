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
  getIllnesses,
  removeIllness
} from '../../modules/Controller'

import AddIllness from './AddIllness'

class ListIllnesses extends Component {

  constructor(props) {
    super(props)
    this.state = {
      illnesses: [],
      fetching: false,
      error: false,
      errorRemoveIllness: false,
      successRemoveIllness: false,
      modalOpen: false
    }
  }

  /**
   * Requisição REST de todos remédios
   * 
   * @memberof ListMedicines
   */
  componentDidMount() {
    this.setState({
      fetching: true
    })
    getIllnesses()
      .then(result => {
        if (result.problem) {
          this.setState({
            error: true,
            fetching: false
          })
        } else {
          this.setState({
            error: false,
            illnesses: result.data,
            fetching: false
          })
        }
      })
  }

  _formatIsContagious(isContagious){
    if (isContagious){
      return 'Sim'
    } else {
      return 'Não'
    }
  }
  
  _renderRow(id, name, isContagious) {
    return (
      <Table.Row>
        <Table.Cell>{id}</Table.Cell>
        <Table.Cell>{name}</Table.Cell>
        <Table.Cell>{this._formatIsContagious(isContagious)}</Table.Cell>
        <Table.Cell textAlign={'center'}>
          <Button icon='edit' onClick={() => this._handleEditIllness(id, name, isContagious)} />
        </Table.Cell>
        <Table.Cell textAlign={'center'}>
          <Button negative icon='remove' onClick={() => this._handleOpen(id)} />
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
            <Table.HeaderCell>Contagiosa</Table.HeaderCell>
            <Table.HeaderCell width={1}>Editar</Table.HeaderCell>
            <Table.HeaderCell width={1}>Remover</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {this.state.illnesses.map(illness => {
            return this._renderRow(illness.idIllness, illness.name, illness.isContagious)
          })}
        </Table.Body>

      </Table>
    )
  }


  _handleEditIllness = (id, name, isContagious) => {
    this.setState({
      isEditing: true,
      name: name,
      id: id,
      isContagious: isContagious
    })
  }

  _handleBack = () => {
    this.setState({
      isEditing: false
    })
    this.componentDidMount()
  }


  _renderMessages() {
    return (
      <div>
        <Message
          error
          hidden={!this.state.error}
          header='Erro'
          content='Houve um erro ao tentar listar as doenças'
        />
        <Message
          error
          hidden={!this.state.errorRemoveIllness}
          header='Erro'
          content='Houve um erro ao tentar remover uma doença'
        />
        <Message
          success
          hidden={!this.state.successRemoveIllness}
          header='Sucesso'
          content='Doença removida com sucesso'
        />
      </div>
    )
  }

  handleRemoveIllness = () => {
    removeIllness(this.state.selectedIllness)
      .then(result => {
        this.setState({
          fetching: false,
          modalOpen: false
        })
        console.log(result)
        if (!result.problem) {
          this.setState({
            successRemoveIllness: true
          })
        } else {
          this.setState({
            errorRemoveIllness: true
          })
        }
      })
  }

  /**
* Handlers do modal
* @memberof ListSpecies
*/
  _handleOpen = (id) => this.setState({ selectedIllness: id, modalOpen: true })

  _handleClose = () => this.setState({ modalOpen: false })

  _renderModal() {
    return (
      <Modal
        open={this.state.modalOpen}
        onClose={this._handleClose}
        basic
        size='small'
      >
        <Header icon='remove circle' content='Remover Doença' />
        <Modal.Content>
          <h3>Tem certeza que deseja remover essa doença?</h3>
        </Modal.Content>
        <Modal.Actions>
          <Button color='green' onClick={this.handleRemoveIllness} inverted>
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
    if (this.state.isEditing) {
      return (
        <AddIllness
          isEditing={true}
          name={this.state.name}
          id={this.state.id}
          isContagious={this.state.isContagious}
          back={this._handleBack}
        />
      )
    }
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
        {/* Modal remover Pet */}
        {this._renderModal()}
      </div>
    )
  }
}

export default ListIllnesses;
