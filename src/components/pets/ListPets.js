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
  Header,
  Form,
  Select,
  Input,
  Dropdown
} from 'semantic-ui-react'

import { 
  getPets,
  getMedicines,
  getIllnesses,
  getMedicinesFromPet,
  removePet,
  addMedicineToPet,
  addIllnessToPet
} from '../../modules/Controller'

import moment from 'moment'

import Cleave from 'cleave.js'



class ListPets extends Component {

  constructor(props) {
    super(props)
    this.state = {
      pets: [],
      medicines: [],
      illnesses: [],
      fetching: false,
      error: false,
      errorRemovePet: false,
      successRemovePet: false,
      modalOpen: false,
      modalAddMedicineOpen: false
    }
    this._renderTable = this._renderTable.bind(this)
  }

  /**
   * Requisição REST de todos os Pets
   * 
   * @memberof ListPets
   */
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
      .then( () => {
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
          .then(() => {
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
            })
      })
  }

  _formatDate(date){
    return moment(date).format('DD/MM/YYYY')
  }

  _formatMedicinesList(medicines) {
    let result = []
    medicines.map(item => {
      const obj = {
        key: item.idMedicine.toString(),
        value: item.idMedicine.toString(),
        text: item.name
      }
      result.push(obj)
      return item
    });
    return result
  }

  _formatIllnessesList(illnesses) {
    let result = []
    illnesses.map(item => {
      const obj = {
        key: item.idIllness.toString(),
        value: item.idIllness.toString(),
        text: item.name
      }
      result.push(obj)
      return item
    });
    return result
  }

  _renderRow(id, name, speciesName, birthDate, clientName) {
    return (
      <Table.Row>
        <Table.Cell>{id}</Table.Cell>
        <Table.Cell>{name}</Table.Cell>
        <Table.Cell>{birthDate}</Table.Cell>        
        <Table.Cell>{speciesName}</Table.Cell>
        <Table.Cell>{clientName}</Table.Cell>
        <Table.Cell textAlign={'center'}>
          <Button positive icon='add' onClick={() => this._handleOpenAddMedicine(id)} />
        </Table.Cell>
        <Table.Cell textAlign={'center'}>
          <Button positive icon='add' onClick={() => this._handleOpenAddIllness(id)} />
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
            <Table.HeaderCell>Data de nascimento</Table.HeaderCell>
            <Table.HeaderCell>Espécie</Table.HeaderCell>
            <Table.HeaderCell>Cliente</Table.HeaderCell>
            <Table.HeaderCell width={2}>Adicionar Remédio</Table.HeaderCell>
            <Table.HeaderCell width={2}>Adicionar Doença</Table.HeaderCell>
            <Table.HeaderCell width={1}></Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {this.state.pets.map(pet => {
            return this._renderRow(pet.idPet, 
                                   pet.namePet, 
                                   pet.nameSpecies, 
                                   this._formatDate(pet.birthDate), 
                                   pet.nameClient)
          })}
        </Table.Body>

      </Table>
    )
  }

  _renderMessages(){
    return(
      <div>
        <Message
          error
          hidden={!this.state.error}
          header='Erro'
          content='Houve um erro ao tentar listar os pets'
        />
        <Message
          error
          hidden={!this.state.errorRemovePet}
          header='Erro'
          content='Houve um erro ao tentar remover um pet'
        />
        <Message
          success
          hidden={!this.state.successRemovePet}
          header='Sucesso'
          content='Pet removido com sucesso'
        />
        <Message
          success
          hidden={!this.state.successAddMedicine}
          header='Sucesso'
          content='Remédio adicionado com sucesso'
        />
        <Message
          error
          hidden={!this.state.errorAddMedicine}
          header='Erro'
          content='Houve um erro ao tentar adicionar o remédio'
        />
        <Message
          error
          hidden={!this.state.duplicateEntry}
          header='Erro'
          content='Esse pet já tem esse remédio cadastrado'
        />
        <Message
          success
          hidden={!this.state.successAddIllness}
          header='Sucesso'
          content='Doença adicionada com sucesso'
        />
        <Message
          error
          hidden={!this.state.errorAddIllness}
          header='Erro'
          content='Houve um erro ao tentar adicionar uma doença'
        />
        <Message
          error
          hidden={!this.state.duplicateEntryIllness}
          header='Erro'
          content='Esse pet já tem essa doença cadastrada'
        />
      </div>
    )
  }

  handleRemovePet = () => {
    removePet(this.state.selectedPet)
      .then(result => {
        this.setState({
          fetching: false,
          modalOpen: false
        })
        console.log(result)
        if (!result.problem) {
          this.setState({
            successRemovePet: true
          })
        } else {
          this.setState({
            errorRemovePet: true
          })
        }
      })
  }

  /**
 * Handlers do modal
 * @memberof ListPets
 */
  _handleOpen = (id) => this.setState({ selectedPet: id, modalOpen: true })

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
          <Button color='green' onClick={this.handleRemovePet} inverted>
            <Icon name='checkmark' /> Sim
              </Button>
          <Button color='red' onClick={this._handleClose} inverted>
            <Icon name='cancel' /> Não
              </Button>
        </Modal.Actions>
      </Modal>
    )
  }

  _handleChangeMedicine = (e, { name, value }) => this.setState({ idMedicine: value })

  _handleChangeQuantity = (e, { name, value }) => this.setState({ quantity: value })


  /**
* Handlers do modal de adicionar remédios
* @memberof ListPets
*/
  _handleOpenAddMedicine = (id) => this.setState({ selectedPet: id, modalAddMedicineOpen: true })

  _handleCloseAddMedicine = () => this.setState({ modalAddMedicineOpen: false })

  _renderAddMedicine() {
    const optionsQuantity = [
      { key: 'g', text: 'g', value: 'g' },
      { key: 'ml', text: 'ml', value: 'ml' },
    ]
    return (
      <Modal
        open={this.state.modalAddMedicineOpen}
        onClose={this._handleCloseAddMedicine}
        size='small'
      >
        <Header icon='add circle' content='Adicionar Remédio' />
        <Modal.Content>
          <h3>Escolha o remédio do seu Pet</h3>
          <Form
            loading={this.state.fetching}
            success={this.state.success}
            error={this.state.error}
          >
            {/* Espécie */}
            <Form.Field
              required
            >
              <Select loading={this.state.fetching} placeholder='Remédios' options={this._formatMedicinesList(this.state.medicines)} onChange={this._handleChangeMedicine} />
            </Form.Field>
            <Form.Field
              required
            >
            <Input
                label={<Dropdown defaultValue='g' options={optionsQuantity} />}
                labelPosition='right'
                onChange={this._handleChangeQuantity}
                placeholder='Quantidade'
              />
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color='green' onClick={this.handleAddMedicine} inverted>
            <Icon name='checkmark' /> Sim
              </Button>
          <Button color='red' onClick={this._handleCloseAddMedicine} inverted>
            <Icon name='cancel' /> Não
              </Button>
        </Modal.Actions>
      </Modal>
    )
  }

  handleAddMedicine = () => {
    let { idMedicine, quantity, selectedPet } = this.state
    const idPet = selectedPet.toString()
    this.setState({ fetching: true })
    addMedicineToPet(idMedicine, quantity, idPet)
      .then(result => {
        this.setState({
          fetching: false,
          modalAddMedicineOpen: false
        })
        console.log(result.data.errno)
        if (result.data.errno === 1062) {
          this.setState({
            duplicateEntry: true
          })
        } else if (!result.problem) {
          this.setState({
            successAddMedicine: true
          })
        } else {
          this.setState({
            errorAddMedicine: true
          })
        }
      })
  }

  _handleChangeIllness = (e, { name, value }) => this.setState({ idIllness: value })

  /**
* Handlers do modal de adicionar remédios
* @memberof ListPets
*/
  _handleOpenAddIllness = (id) => this.setState({ selectedPet: id, modalAddIllnessOpen: true })

  _handleCloseAddIllness = () => this.setState({ modalAddIllnessOpen: false })

  _renderAddIllness() {
    return (
      <Modal
        open={this.state.modalAddIllnessOpen}
        onClose={this._handleCloseAddIllness}
        size='small'
      >
        <Header icon='add circle' content='Adicionar Doença' />
        <Modal.Content>
          <h3>Escolha a doença do seu Pet</h3>
          <Form
            loading={this.state.fetching}
            success={this.state.success}
            error={this.state.error}
          >
            {/* Espécie */}
            <Form.Field
              required
            >
              <Select loading={this.state.fetching} placeholder='Doenças' options={this._formatIllnessesList(this.state.illnesses)} onChange={this._handleChangeIllness} />
            </Form.Field>
            <Form.Field
              required
            >
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color='green' onClick={this.handleAddIllness} inverted>
            <Icon name='checkmark' /> Sim
              </Button>
          <Button color='red' onClick={this._handleCloseAddIllness} inverted>
            <Icon name='cancel' /> Não
              </Button>
        </Modal.Actions>
      </Modal>
    )
  }

  handleAddIllness = () => {
    let { idIllness , selectedPet } = this.state
    const idPet = selectedPet.toString()
    this.setState({ fetching: true })
    addIllnessToPet(idIllness, idPet)
      .then(result => {
        this.setState({
          fetching: false,
          modalAddIllnessOpen: false
        })
        console.log(result.data.errno)
        if (result.data.errno === 1062) {
          this.setState({
            duplicateEntryIllness: true
          })
        } else if (!result.problem) {
          this.setState({
            successAddIllness: true
          })
        } else {
          this.setState({
            errorAddIllness: true
          })
        }
      })
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
        {/* Modal remover Pet */}
        {this._renderModal()}
        {this._renderAddMedicine()}
        {this._renderAddIllness()}
      </div>
    )
  }
}

export default ListPets;
