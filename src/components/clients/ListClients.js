import React, { Component } from 'react';
import {
  Icon,
  Label,
  Table,
  Message,
  Dimmer,
  Loader,
  Segment,
  Button,
  Modal,
  Header
} from 'semantic-ui-react'

import {
  getClients,
  removeClient
} from '../../modules/Controller'

import moment from 'moment'

class ListClients extends Component {

  constructor(props) {
    super(props)
    this.state = {
      clients: [], //Trocar depois para array vazia
      fetching: false,
      error: false,
      errorRemoveClient: false,
      successRemoveClient: false,
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
    getClients()
      .then(result => {
        if (result.problem) {
          this.setState({
            error: true,
            fetching: false
          })
        } else {
          this.setState({
            error: false,
            clients: result.data,
            fetching: false
          })
        }
      })
  }

  _formatDate(date) {
    return moment(date).format('DD/MM/YYYY')
  }

  _renderRow(id, name, birthDate) {
    return (
      <Table.Row>
        <Table.Cell>{id}</Table.Cell>
        <Table.Cell>{name}</Table.Cell>
        <Table.Cell>{birthDate}</Table.Cell>        
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
            <Table.HeaderCell>Data de nascimento</Table.HeaderCell>
            <Table.HeaderCell width={1}></Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {this.state.clients.map(client => {
            return this._renderRow(client.idClient, client.name, this._formatDate(client.birthDate))
          })}
        </Table.Body>

      </Table>
    )
  }

  /**
   * Handlers do modal
   */
  _handleOpen = (id) => this.setState({ selectedClient: id, modalOpen: true })

  _handleClose = () => this.setState({ modalOpen: false })


  handleRemoveClient = () => {
    removeClient(this.state.selectedClient)
      .then(result => {
        this.setState({
          fetching: false,
          modalOpen: false
        })
        if (!result.problem) {
          this.setState({
            successRemoveClient: true
          })
        } else {
          this.setState({
            errorRemoveClient: true
          })
        }
      })
  }

  _renderMessages() {
    return (
      <div>
        <Message
          error
          hidden={!this.state.error}
          header='Erro'
          content='Houve um erro ao tentar listar os clientes'
        />
        <Message
          error
          hidden={!this.state.errorRemoveClient}
          header='Erro'
          content='Houve um erro ao tentar remover um cliente'
        />
        <Message
          success
          hidden={!this.state.successRemoveClient}
          header='Sucesso'
          content='Cliente removido com sucesso'
        />
      </div>
    )
  }

  _renderModal() {
    return (
      <Modal
        open={this.state.modalOpen}
        onClose={this._handleClose}
        basic
        size='small'
      >
        <Header icon='remove circle' content='Remover Cliente' />
        <Modal.Content>
          <h3>Tem certeza que deseja remover esse cliente?</h3>
        </Modal.Content>
        <Modal.Actions>
          <Button color='green' onClick={this.handleRemoveClient} inverted>
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

export default ListClients;
