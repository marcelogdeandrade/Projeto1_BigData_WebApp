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
  addFood,
  getSpecies,
  updateFood
} from '../../modules/Controller'


class AddFood extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fetching: false,
      fetchingSpecies: false,
      success: false,
      error: false,
      errorSpecies:false,
      species:[],
      name: props.name,
      idSpecies: props.idSpecies,
      quantity: props.quantity
    }
    this._renderForm = this._renderForm.bind(this)
  }

  componentDidMount() {
    this.setState({
      fetchingSpecies: true
    })
    getSpecies()
      .then(result => {
        if (result.problem) {
          this.setState({
            errorSpecies: true,
            fetchingSpecies: false
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

  _formatSpeciesList(species){
    let result = []
    species.map(item => {
      const obj = {
        key: item.idSpecies.toString(),
        value: item.idSpecies.toString(),
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
   * @memberof addFood
   */

  _handleChangeName = (e, { name, value }) => this.setState({ name: value })
  _handleChangeSpecies = (e, { idSpecies, value }) => this.setState({ idSpecies: value })
  _handleChangeQuantity = (e, { quantity, value }) => this.setState({ quantity: value })

  /**
   *
   * Adiciona um cliente
   */
  handleSubmit = () => {
    let{ name, idSpecies, quantity} = this.state
    const idFood = this.props.id
    if (this.props.isEditing) {
      updateFood(idFood, name, idSpecies, quantity)
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
    } else {
    addFood(name,idSpecies,quantity)
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
          header='Comida Adicionada'
          content="Você adicionou uma comida com sucesso"
        />
        <Message
          error
          hidden={!this.state.error}
          header='Erro'
          content='Houve um erro ao tentar adicionar uma comida'
        />
        <Message
          success
          hidden={!this.state.successUpdate}
          header='Comida Atualizada'
          content="Você atualizou uma comida com sucesso"
        />
        <Message
          error
          hidden={!this.state.errorUpdate}
          header='Erro'
          content='Houve um erro ao tentar atualizar uma comida'
        />
      </div>
    )
  }

  _renderForm() {
    const { name, idSpecies, quantity } = this.state
    const species = this._formatSpeciesList(this.state.species)
    return (
      <Form
        loading={this.state.fetching}
        onSubmit={this.handleSubmit}
      >
        <Form.Field
          required
        >
          <label>Nome</label>
          <Form.Input defaultValue={this.props.name} placeholder='Nome' name='name' onChange={this._handleChangeName} />
        </Form.Field>
        <Form.Field>
          <label>Espécie</label>
          <Select defaultValue={String(this.props.idSpecies)} loading={this.state.fetchingSpecies}placeholder='Espécie' options={species} onChange={this._handleChangeSpecies} />
        </Form.Field>
        <Form.Field
          required
        >
          <label>Quantidade</label>
          <Form.Input defaultValue={this.props.quantity} placeholder='Quantidade' name='quantidade' onChange={this._handleChangeQuantity} />
        </Form.Field>
        <Button type='submit'>{this.props.isEditing ? 'Atualizar Comida' : 'Adicionar Comida'}</Button>
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
            {this._renderMessages()}
            {this.props.isEditing ? <Button onClick={this.props.back}>Voltar</Button> : ''}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

export default AddFood;
