import React, { Component } from 'react';
import {
  Button,
  Checkbox,
  Form,
  Message,
  Dimmer,
  Loader,
  Segment,
  Grid,
  Select
} from 'semantic-ui-react'

import moment from 'moment';

import {
  addFoodLog,
  getPets,
  getClients,
  getFoods,
  updateFoodLog
}from '../../modules/Controller'


class AddFoodLog extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fetching: false,
      fetchingFoods: false,
      fetchingPets: false,
      fetchingClients: false,
      success: false,
      error: false,
      errorSpecies:false,
      isIn: props.isIn || true,
      pets:[],
      clients:[],
      foods: [],
      idFood: props.idFood,
      idPet: props.idPet,
      idClient: props.idClient,
      quantity: props.quantity
    }
    this._renderForm = this._renderForm.bind(this)
  }

  componentDidMount() {
    this.setState({
      fetchingSpecies: true
    })
    getPets()
      .then(result => {
        if (result.problem) {
          this.setState({
            errorPets: true,
            fetchingPets: false
          })
        } else {
          this.setState({
            errorSpecies: false,
            pets: result.data,
            fetchingSpecies: false
          })
        }
      })
    this.setState({
      fetchingClients: true
    })
    getClients()
      .then(result => {
        if (result.problem) {
          this.setState({
            errorClients: true,
            fetchingClients: false
          })
        } else {
          this.setState({
            errorClients: false,
            clients: result.data,
            fetchingClients: false
          })
        }
      })
    this.setState({
      fetchingFoods: true
    })
    getFoods()
      .then(result => {
        if (result.problem) {
          this.setState({
            errorFoods: true,
            fetchingFoods: false
          })
        } else {
          this.setState({
            errorFoods: false,
            foods: result.data,
            fetchingFoods: false
          })
        }
      })
  }

  _formatPetsList(pets){
    let result = []
    pets.map(item => {
      const obj = {
        key: item.idPet.toString(),
        value: item.idPet.toString(),
        text: item.namePet
      }
      result.push(obj)
      return item
    });
    return result
  }

  _formatFoodsList(foods) {
    let result = []
    foods.map(item => {
      const obj = {
        key: item.idFood.toString(),
        value: item.idFood.toString(),
        text: item.nameFood
      }
      result.push(obj)
      return item
    });
    return result
  }

  _formatClientsList(clients) {
    let result = []
    clients.map(item => {
      const obj = {
        key: item.idClient.toString(),
        value: item.idClient.toString(),
        text: item.name
      }
      result.push(obj)
      return item
    });
    return result
  }

  /**
   * Input Handlers
   *
   * @memberof addFoodLog
   */

   _handleChangeFood = (e, { idFood, value }) => this.setState({ idFood: value })
   _handleChangeisIn = (e, { isIn, value }) => this.setState({ isIn: value })
   _handleChangeClient = (e, { idClient, value }) => this.setState({ idClient: value })
   _handleChangePet = (e, { idPet, value }) => this.setState({ idPet: value })
   _handleChangeQuantity = (e, { quantity, value }) => this.setState({ quantity: value })


   /**
    *
    * Adiciona um FoodLog
    */
   handleSubmit = () => {
     let{ idFood, isIn, idClient, idPet, quantity} = this.state
     const idFoodlog = this.props.id
     if (this.props.isEditing) {
       updateFoodLog(idFoodlog, String(idFood), + isIn, String(idClient), String(idPet), quantity)
         .then(result => {
           this.setState({
             fetching: false
           })
           console.log(result)
           if (!result.problem) {
             this.setState({
               success: true
             })
           } else {
             this.setState({
               error: true
             })
           }
         })
     } else {
      addFoodLog(idFood, isIn, idClient, idPet, quantity)
        .then(result => {
          this.setState({
            fetching: false
          })
          console.log(result)
          if (!result.problem) {
            this.setState({
              success: true
            })
          } else {
            this.setState({
              error: true
            })
          }
        })
      }
   }

   _renderMessages(){
     return(
       <div>
         <Message
           success
           hidden={!this.state.success}
           header='Historico Adicionada'
           content="Você adicionou uma histórico com sucesso"
        />
         <Message
           error
           hidden={!this.state.error}
           header='Erro'
           content='Houve um erro ao tentar adicionar um histórico'
         />
         <Message
           success
           hidden={!this.state.successUpdate}
           header='Espécie Atualizada'
           content="Você atualizou uma espécie com sucesso"
         />
         <Message
           error
           hidden={!this.state.errorUpdate}
           header='Erro'
           content='Houve um erro ao tentar atualizar uma espécie'
         />
       </div>
     )
   }

   _renderForm() {
     const { idFood, isIn, idClient, idPet } = this.state
     const pets = this._formatPetsList(this.state.pets)
     const foods = this._formatFoodsList(this.state.foods)
     const clients = this._formatClientsList(this.state.clients)
     return (
       <Form
         loading={this.state.fetching}
         onSubmit={this.handleSubmit}
       >
         <Form.Field
           required
         >
           <label>Comida</label>
           <Select defaultValue={String(this.props.idFood)} loading={this.state.fetchingFoods} placeholder='Comida' options={foods} onChange={this._handleChangeFood} />
         </Form.Field>
         <Form.Field>
            A comida está: <b>{this.state.value}</b>
        </Form.Field>
        <Form.Field>
          <Checkbox
            radio
            label='Entrada'
            name='isInEntrada'
            value={true}
            checked = {this.state.isIn}
            onChange={this._handleChangeisIn}
          />
        </Form.Field>
        <Form.Field>
          <Checkbox
            radio
            label='Saida'
            name='isInSaida'
            checked={!this.state.isIn}
            value={false}
            onChange={this._handleChangeisIn}
          />
        </Form.Field>
         <Form.Field
         >
           <label>Pet</label>
           <Select defaultValue={String(this.props.idPet)} loading={this.state.fetchingPets} placeholder='Pet' options={pets} onChange={this._handleChangePet} />
         </Form.Field>
         <Form.Field
         >
           <label>Cliente</label>
           <Select defaultValue={String(this.props.idClient)} loading={this.state.fetchingClients} placeholder='Cliente' options={clients} onChange={this._handleChangeClient} />
         </Form.Field>
         <Form.Field
           required
         >
           <label>Quantidade(g)</label>
           <Form.Input defaultValue={this.props.quantity} placeholder='Quantidade(g)' name='quantidade' onChange={this._handleChangeQuantity} />
         </Form.Field>
         <Button type='submit'>{this.props.isEditing ? 'Atualizar Histórico' : 'Adicionar Histórico'}</Button>
       </Form>
     )
   }

   render() {
     return (
       <Grid>
         <Grid.Row>
           <Grid.Column width={4}>
             <Segment>
               {this._renderForm()}
             </Segment>
             {this._renderMessages()}
             {this.props.isEditing ? <Button onClick={this.props.back}>Voltar</Button> : ''}
           </Grid.Column>
         </Grid.Row>
       </Grid>
     )
   }
 }

 export default AddFoodLog;
