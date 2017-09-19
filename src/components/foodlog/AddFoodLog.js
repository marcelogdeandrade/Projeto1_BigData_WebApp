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
  getClients
}from '../..modules/Controller'


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
      pets:[],
      clients:[],
      food: []
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
            species: result.data,
            fetchingSpecies: false
          })
        }
      })
  }

  _formatPetsList(pets){
    let result = []
    pets.map(item => {
      const obj = {
        key: item.idPets.toString(),
        value: item.idPets.toString(),
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

   /**
    *
    * Adiciona um FoodLog
    */
   handleSubmit = () => {
     let{ idFood, isIn, idClient, idPet} = this.state
     addFoodLog(idFood, isIn, idClient, idPet)
       .then(result => {
         this.setState({
           fetching: false
         })
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

   _renderMessages(){
     return(
       <div>
         <Message
           success
           header='Historico Adicionada'
           content="Você adicionou uma histórico com sucesso"

         <Message
           error
           header='Erro'
           content='Houve um erro ao tentar adicionar um histórico'
         />
       </div>
     )
   }

   _renderForm() {
     const { idFood, isIn, idClient, idPet } = this.state
     const pets = this._formatPetsList(this.state.species)
     return (
       <Form
         loading={this.state.fetching}
         success={this.state.success}
         error={this.state.error}
         onSubmit={this.handleSubmit}
       >
         <Form.Field
           required
         >
           <label>Comida</label>
           <Select loading={this.state.fetchingFoods}placeholder='Comida' options={foods} onChange={this._handleChangeFood} />
         </Form.Field>
         <Form.Field>
            A comida está:: <b>{this.state.value}</b>
        </Form.Field>
        <Form.Field>
          <Checkbox
            radio
            label='Entrada'
            name='isInEntrada'
            value={true}
            checked={true}
            onChange={this._handleChangeisIn}
          />
        </Form.Field>
        <Form.Field>
          <Checkbox
            radio
            label='Sainda'
            name='isInSaida'
            value={falses}
            onChange={this._handleChangeisIn}
          />
        </Form.Field>
         <Form.Field
          required
         >
           <label>Pet</label>
           <Select loading={this.state.fetchingPets}placeholder='Pet' options={pets} onChange={this._handleChangePet} />
         </Form.Field>
         <Form.Field
         >
           <label>Cliente</label>
           <Form.Input placeholder='Cliente' name='client' onChange={this._handleChangeClient} />
         </Form.Field>
         {this._renderMessages()}
         <Button type='submit'>Adicionar Comida</Button>
       </Form>
     )
   }

   render() {
     console.log(this.state)
     return (
       <Grid>
         <Grid.Row>
           <Grid.Column width={4}>
             <Segment>
               {this._renderForm()}
             </Segment>
           </Grid.Column>
         </Grid.Row>
       </Grid>
     )
   }
 }

 export default AddFoodLog;
