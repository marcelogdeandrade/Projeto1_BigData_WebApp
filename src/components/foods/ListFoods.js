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

 _renderRow(idFood, nameFood, nameSpecies, quantity) {
   return (
     <Table.Row>
       <Table.Cell>{id}</Table.Cell>
       <Table.Cell>{nameFood}</Table.Cell>
       <Table.Cell>{nameSpecies}</Table.Cell>
       <Table.Cell>{quantity}</Table.Cell>
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
           <Table.HeaderCell>Quantidade</Table.HeaderCell>
           <Table.HeaderCell width={1}></Table.HeaderCell>
         </Table.Row>
       </Table.Header>

       <Table.Body>
         {this.state.foods.map(food => {
           return this._renderRow(food.idFood, food.nameFood, species.nameSpecies, food.quantity)
         })}
       </Table.Body>

     </Table>
   )
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
           <Button color='green' onClick={this.handleRemoveComida} inverted>
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

 export default ListFoods;
