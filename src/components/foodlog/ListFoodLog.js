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
  getFoodLog,
  removeFoodLog
} from '../../modules/Controller'

import AddFoodLog from './AddFoodLog'

import moment from 'moment'

class ListFoodLog extends Component {

  constructor(props) {
    super(props)
    this.state = {
      foodlog: [],
      fetching: false,
      error: false,
      errorRemoveFoodLog: false,
      successRemoveFoodLog: false,
      modalOpen: false
    }
}

/**
 *
 * Buscar espécies
 * @memberof ListFoodLog
 */
 componentDidMount() {
   this.setState({
     fetching: true
   })
   getFoodLog()
     .then(result => {
       if (result.problem) {
         this.setState({
           error: true,
           fetching: false
         })
       } else {
         this.setState({
           error: false,
           foodlog: result.data,
           fetching: false
         })
       }
     })
 }

 _formatIsIn(isIn){
   if (isIn){
     return 'Entrou'
   } else {
     return 'Saiu'
   }
 }

 _renderRow(id, nameFood, isIn, nameClient, namePet, quantity, idClient, idPet, idFood) {
   return (
     <Table.Row>
       <Table.Cell>{id}</Table.Cell>
       <Table.Cell>{nameFood}</Table.Cell>
       <Table.Cell>{this._formatIsIn(isIn)}</Table.Cell>
       <Table.Cell>{nameClient}</Table.Cell>
       <Table.Cell>{namePet}</Table.Cell>
       <Table.Cell>{quantity}</Table.Cell>
       <Table.Cell textAlign={'center'}>
         <Button icon='edit' onClick={() => this._handleEditFoodlog(id, nameFood, idFood, isIn, idClient, idPet, quantity)} />
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
           <Table.HeaderCell>Nome Comida</Table.HeaderCell>
           <Table.HeaderCell>Entrada ou Saída</Table.HeaderCell>
           <Table.HeaderCell>Nome Doador</Table.HeaderCell>
           <Table.HeaderCell>Pet Consumidor</Table.HeaderCell>
           <Table.HeaderCell>Quantidade(g)</Table.HeaderCell>
           <Table.HeaderCell width={1}>Editar</Table.HeaderCell>
           <Table.HeaderCell width={1}>Remover</Table.HeaderCell>
         </Table.Row>
       </Table.Header>

       <Table.Body>
         {this.state.foodlog.map(foodlog => {
           return this._renderRow(foodlog.idFoodlog, foodlog.nameFood, foodlog.isIn, foodlog.nameClient, foodlog.namePet, foodlog.quantity, foodlog.idClient, foodlog.idPet, foodlog.idFood)
         })}
       </Table.Body>

     </Table>
   )
 }

 _handleEditFoodlog = (id, name, idFood, isIn, idClient, idPet, quantity) => {
   this.setState({
     isEditing: true,
     name: name,
     id: id,
     isIn: isIn,
     idClient: idClient,
     idPet: idPet,
     quantity: quantity,
     idFood: idFood
   })
 }

 _handleBack = () => {
   this.setState({
     isEditing: false
   })
   this.componentDidMount()
 }


 /**
  * Handlers do modal
  */
 _handleOpen = (id) => this.setState({ selectedFoodLog: id, modalOpen: true })

 _handleClose = () => this.setState({ modalOpen: false })


 handleRemoveFoodLog = () => {
   removeFoodLog(this.state.selectedFoodLog)
     .then(result => {
       this.setState({
         fetching: false,
         modalOpen: false
       })
       console.log(result)
       if (!result.problem) {
         this.setState({
           successRemoveFoodLog: true
         })
       } else {
         this.setState({
           errorRemoveFoodLog: true
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
           content='Houve um erro ao tentar listar o Historico de Comida'
         />
         <Message
           error
           hidden={!this.state.errorRemoveFoodLog}
           header='Erro'
           content='Houve um erro ao tentar remover um Historico'
         />
         <Message
           success
           hidden={!this.state.successRemoveFoodLog}
           header='Sucesso'
           content='Comida removida com sucesso'
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
         <Header icon='remove circle' content='Remover Historico' />
         <Modal.Content>
           <h3>Tem certeza que deseja remover esse Historico?</h3>
         </Modal.Content>
         <Modal.Actions>
           <Button color='green' onClick={this.handleRemoveFoodLog} inverted>
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
         <AddFoodLog
           isEditing={true}
           idClient={this.state.idClient}
           idPet={this.state.idPet}
           idFood={this.state.idFood}
           quantity={this.state.quantity}
           isIn={!!this.state.isIn}
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
             <Loader />
           </Dimmer>
           {this._renderTable()}
         </Segment>
         {/* Modal remover foodlog */}
         {this._renderModal()}
       </div>
     )
   }
 }

 export default ListFoodLog;
