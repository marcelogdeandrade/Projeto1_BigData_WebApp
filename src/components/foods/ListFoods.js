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
  getFoods,
  removeFood
} from '../../modules/Controller'

import AddFood from './AddFood'
import moment from 'moment'

class ListFoods extends Component {

  constructor(props) {
    super(props)
    this.state = {
      foods: [],
      fetching: false,
      error: false,
      errorRemoveFood: false,
      successRemoveFood: false,
      modalOpen: false
    }
}

/**
 *
 * Buscar espécies
 * @memberof ListFoods
 */
 componentDidMount() {
   this.setState({
     fetching: true
   })
   getFoods()
     .then(result => {
       if (result.problem) {
         this.setState({
           error: true,
           fetching: false
         })
       } else {
         this.setState({
           error: false,
           foods: result.data,
           fetching: false
         })
       }
     })
 }

 _renderRow(id, nameFood, nameSpecies, quantity, idSpecies) {
   return (
     <Table.Row>
       <Table.Cell>{id}</Table.Cell>
       <Table.Cell>{nameFood}</Table.Cell>
       <Table.Cell>{nameSpecies}</Table.Cell>
       <Table.Cell>{quantity}</Table.Cell>
       <Table.Cell textAlign={'center'}>
         <Button icon='edit' onClick={() => this._handleEditFood(id, nameFood, idSpecies, quantity)} />
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
           <Table.HeaderCell>Espécie</Table.HeaderCell>
           <Table.HeaderCell>Quantidade(g)</Table.HeaderCell>
           <Table.HeaderCell width={1}>Editar</Table.HeaderCell>
           <Table.HeaderCell width={1}>Remover</Table.HeaderCell>
         </Table.Row>
       </Table.Header>

       <Table.Body>
         {this.state.foods.map(food => {
           return this._renderRow(food.idFood, food.nameFood, food.nameSpecies, food.quantity, food.idSpecies)
         })}
       </Table.Body>

     </Table>
   )
 }

 _handleEditFood = (id, name, idSpecies, quantity) => {
   this.setState({
     isEditing: true,
     name: name,
     id: id,
     idSpecies: idSpecies,
     quantity: quantity
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
 _handleOpen = (id) => this.setState({ selectedFood: id, modalOpen: true })

 _handleClose = () => this.setState({ modalOpen: false })


 handleRemoveFood = () => {
   removeFood(this.state.selectedFood)
     .then(result => {
       this.setState({
         fetching: false,
         modalOpen: false
       })
       if (!result.problem) {
         this.setState({
           successRemoveFood: true
         })
       } else {
         this.setState({
           errorRemoveFood: true
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
           content='Houve um erro ao tentar listar as comidas'
         />
         <Message
           error
           hidden={!this.state.errorRemoveFood}
           header='Erro'
           content='Houve um erro ao tentar remover uma comida'
         />
         <Message
           success
           hidden={!this.state.successRemoveFood}
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
         <Header icon='remove circle' content='Remover Comida' />
         <Modal.Content>
           <h3>Tem certeza que deseja remover essa comida?</h3>
         </Modal.Content>
         <Modal.Actions>
           <Button color='green' onClick={this.handleRemoveFood} inverted>
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
         <AddFood
           isEditing={true}
           name={this.state.name}
           id={this.state.id}
           idSpecies={this.state.idSpecies}
           quantity={this.state.quantity}
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
         {/* Modal remover comida */}
         {this._renderModal()}
       </div>
     )
   }
 }

 export default ListFoods;
