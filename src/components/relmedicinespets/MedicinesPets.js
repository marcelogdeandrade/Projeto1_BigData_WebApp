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
  getSpecies,
  getMedicinesPets,
  removeMedicinePet
} from '../../modules/Controller'


class MedicinesPets extends Component {

  constructor(props) {
    super(props)
    this.state = {
      medicinesPets: [], //Trocar depois para array vazia
      fetching: false,
      error: false,
      errorRemoveMedicinePet: false,
      successRemoveMedicinePet: false,
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
    getMedicinesPets()
      .then(result => {
        if (result.problem) {
          this.setState({
            error: true,
            fetching: false
          })
        } else {
          this.setState({
            error: false,
            medicinesPets: result.data,
            fetching: false
          })
        }
      })
  }

  _renderRow(idMedicinePet, idPet, idMedicine, namePet, nameMedicine, quantity) {
    return (
      <Table.Row>
        <Table.Cell>{idPet}</Table.Cell>
        <Table.Cell>{idMedicine}</Table.Cell>
        <Table.Cell>{namePet}</Table.Cell>
        <Table.Cell>{nameMedicine}</Table.Cell>
        <Table.Cell>{quantity}</Table.Cell>
        <Table.Cell textAlign={'center'}>
          <Button negative icon='remove' onClick={() => this._handleOpen(idMedicinePet, idPet, idMedicine)} />
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
            <Table.HeaderCell>IdMedicine</Table.HeaderCell>
            <Table.HeaderCell>Nome Pet</Table.HeaderCell>
            <Table.HeaderCell>Nome Remédio</Table.HeaderCell>
            <Table.HeaderCell>Quantidade(g)</Table.HeaderCell>
            <Table.HeaderCell width={1}></Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {this.state.medicinesPets.map(medicinePet => {
            return this._renderRow(medicinePet.idMedicinePet, medicinePet.idPet, medicinePet.idMedicine, medicinePet.namePet, medicinePet.nameMedicine, medicinePet.quantity)
          })}
        </Table.Body>

      </Table>
    )
  }

  /**
   * Handlers do modal
   */
  _handleOpen = (idMedicinePet, idPet, idMedicine) => this.setState({ selectedMedicinePet: idMedicinePet, selectedMedicine: idMedicine, selectedPet: idPet, modalOpen: true })

  _handleClose = () => this.setState({ modalOpen: false })


  handleRemoveMedicinePet = () => {
    console.log(this.state)
    removeMedicinePet(this.state.selectedMedicinePet, this.state.selectedMedicine, this.state.selectedPet)
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
            errorRemoveMedicinePet: true
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
          content='Houve um erro ao tentar listas a cartela de remédios dos pets'
        />
        <Message
          error
          hidden={!this.state.errorRemoveMedicinePet}
          header='Erro'
          content='Houve um erro ao tentar remover um Pet/Remédio'
        />
        <Message
          success
          hidden={!this.state.successRemoveMedicinePet}
          header='Sucesso'
          content='Pet/Remédio removido com sucesso'
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
          <h3>Tem certeza que deseja remover essa Pet/Remédio?</h3>
        </Modal.Content>
        <Modal.Actions>
          <Button color='green' onClick={this.handleRemoveMedicinePet} inverted>
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

export default MedicinesPets;
