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
  getIllnessesPets,
  removeIllnessPet
} from '../../modules/Controller'


class IllnessesPets extends Component {

  constructor(props) {
    super(props)
    this.state = {
      illnessesPets: [], //Trocar depois para array vazia
      fetching: false,
      error: false,
      errorRemoveIllnessPet: false,
      successRemoveIllnessPet: false,
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
    getIllnessesPets()
      .then(result => {
        if (result.problem) {
          this.setState({
            error: true,
            fetching: false
          })
        } else {
          this.setState({
            error: false,
            illnessesPets: result.data,
            fetching: false
          })
        }
      })
  }

  _renderRow(idIllnessPet, idPet, idIllness, namePet, nameIllness) {
    return (
      <Table.Row>
        <Table.Cell>{idPet}</Table.Cell>
        <Table.Cell>{idIllness}</Table.Cell>
        <Table.Cell>{namePet}</Table.Cell>
        <Table.Cell>{nameIllness}</Table.Cell>
        <Table.Cell textAlign={'center'}>
          <Button negative icon='remove' onClick={() => this._handleOpen(idIllnessPet, idPet, idIllness)} />
        </Table.Cell>
      </Table.Row>
    )
  }

  _renderTable() {
    return (
      <Table celled>

        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>IdPet</Table.HeaderCell>
            <Table.HeaderCell>idIllness</Table.HeaderCell>
            <Table.HeaderCell>Nome Pet</Table.HeaderCell>
            <Table.HeaderCell>Nome Doença</Table.HeaderCell>
            <Table.HeaderCell width={1}></Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {this.state.illnessesPets.map(illnessPet => {
            return this._renderRow(illnessPet.idIllnessPet, illnessPet.idPet, illnessPet.idIllness, illnessPet.namePet, illnessPet.nameIllness)
          })}
        </Table.Body>

      </Table>
    )
  }

  /**
   * Handlers do modal
   */
  _handleOpen = (idIllnessPet, idPet, idIllness) => this.setState({ selectedIllnessPet: idIllnessPet, selectedIllness: idIllness, selectedPet: idPet, modalOpen: true })

  _handleClose = () => this.setState({ modalOpen: false })


  handleRemoveIllnessPet = () => {
    console.log(this.state)
    removeIllnessPet(this.state.selectedIllnessPet, this.state.selectedIllness, this.state.selectedPet)
      .then(result => {
        this.setState({
          fetching: false,
          modalOpen: false
        })
        console.log(result)
        if (!result.problem) {
          this.setState({
            successRemoveMedicinePet: true
          })
        } else {
          this.setState({
            errorRemoveIllnessPet: true
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
          content='Houve um erro ao tentar listas a cartela de doenças dos pets'
        />
        <Message
          error
          hidden={!this.state.errorRemoveMedicinePet}
          header='Erro'
          content='Houve um erro ao tentar remover um Pet/Doença'
        />
        <Message
          success
          hidden={!this.state.successRemoveMedicinePet}
          header='Sucesso'
          content='Pet/Doença removido com sucesso'
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
        <Header icon='remove circle' content='Remover Pet/Remédio' />
        <Modal.Content>
          <h3>Tem certeza que deseja remover essa Pet/Doença?</h3>
        </Modal.Content>
        <Modal.Actions>
          <Button color='green' onClick={this.handleRemoveIllnessPet} inverted>
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

export default IllnessesPets;
