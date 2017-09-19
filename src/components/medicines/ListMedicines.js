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
  getMedicines,
  removeMedicine
} from '../../modules/Controller'

import AddMedicine from './AddMedicine'

class ListMedicines extends Component {

  constructor(props) {
    super(props)
    this.state = {
      medicines: [],
      fetching: false,
      error: false,
      errorRemoveMedicine: false,
      successRemoveMedicine: false,
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

  _renderRow(id, name, quantity) {
    return (
      <Table.Row>
        <Table.Cell>{id}</Table.Cell>
        <Table.Cell>{name}</Table.Cell>
        <Table.Cell textAlign={'center'}>
          <Button icon='edit' onClick={() => this._handleEditMedicine(id, name)} />
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
            <Table.HeaderCell width={1}>Editar</Table.HeaderCell>
            <Table.HeaderCell width={1}>Remover</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {this.state.medicines.map(medicine => {
            return this._renderRow(medicine.idMedicine, medicine.name, medicine.pets)
          })}
        </Table.Body>

      </Table>
    )
  }

  _handleEditMedicine = (id, name) => {
    this.setState({
      isEditing: true,
      name: name,
      id: id
    })
  }

  _handleBack = () => {
    this.setState({
      isEditing: false
    })
    this.componentDidMount()
  }

  _renderMessages(){
    return(
      <div>
        <Message
          error
          hidden={!this.state.error}
          header='Erro'
          content='Houve um erro ao tentar listar os remédios'
        />
        <Message
          error
          hidden={!this.state.errorRemoveMedicine}
          header='Erro'
          content='Houve um erro ao tentar remover um remédio'
        />
        <Message
          success
          hidden={!this.state.successRemoveMedicine}
          header='Sucesso'
          content='Remédio removida com sucesso'
        />
      </div>
    )
  }

  handleRemoveMedicine = () => {
    removeMedicine(this.state.selectedMedicine)
      .then(result => {
        this.setState({
          fetching: false,
          modalOpen: false
        })
        console.log(result)
        if (!result.problem) {
          this.setState({
            successRemoveMedicine: true
          })
        } else {
          this.setState({
            errorRemoveMedicine: true
          })
        }
      })
  }

  /**
* Handlers do modal
* @memberof ListSpecies
*/
  _handleOpen = (id) => this.setState({ selectedMedicine: id, modalOpen: true })

  _handleClose = () => this.setState({ modalOpen: false })

  _renderModal() {
    return (
      <Modal
        open={this.state.modalOpen}
        onClose={this._handleClose}
        basic
        size='small'
      >
        <Header icon='remove circle' content='Remover Pet' />
        <Modal.Content>
          <h3>Tem certeza que deseja remover esse Pet?</h3>
        </Modal.Content>
        <Modal.Actions>
          <Button color='green' onClick={this.handleRemoveMedicine} inverted>
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
        <AddMedicine
          isEditing={true}
          name={this.state.name}
          id={this.state.id}
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
            <Loader/>
          </Dimmer>
          {this._renderTable()}
        </Segment>
        {/* Modal remover Pet */}
        {this._renderModal()}
      </div>
    )
  }
}

export default ListMedicines;
