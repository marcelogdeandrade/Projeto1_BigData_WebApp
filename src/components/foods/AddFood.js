import React, { Component } from 'react';
import {
  Button,
  Checkbox,
  Form,
  Message,
  Dimmer,
  Loader,
  Segment,
  Grid
} from 'semantic-ui-react'

import moment from 'moment';

import {
  addFood
} from '../../modules/Controller'


class AddFood extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fetching: false,
      success: false,
      error: false,
    }
  }

  _handleChangeName = (e, { name, value }) => this.setState({ name: value })
  _handleChangeidSpecies = (e, { idSpecies, value }) => this.setState({ idSpecies: value })
  _handleChangeQuantity = (e, { quantity, value }) => this.setState({ quantity: value })

  /**
   *
   * Adiciona um cliente
   */
  handleSubmit = () => {
    let{ name, idSpecies, quantity} = this.state
    addFood(name,idSpecies,quantity)
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
          header='Comida Adicionada'
          content="Você adicionou uma comida com sucesso"
        />
        <Message
          error
          header='Erro'
          content='Houve um erro ao tentar adicionar uma comida'
        />
      </div>
    )
  }

  _renderForm() {
    const { name, idSpecies, quantity } = this.state
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
          <label>Nome</label>
          <Form.Input placeholder='Nome' name='name' onChange={this._handleChangeName} />
        </Form.Field>
        <Form.Field
        >
          <label>Espécie</label>
          <Form.Input placeholder='Espécie' name='idSpecies' onChange={this._handleChangeidSpecies} />
        </Form.Field>
        <Form.Field
          required
        >
          <label>Quantidade</label>
          <Form.Input placeholder='Quantidade' name='quantidade' onChange={this._handleChangeQuantity} />
        </Form.Field>
        {this._renderMessages()}
        <Button type='submit'>Adicionar Comida</Button>
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
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

export default AddFood;
