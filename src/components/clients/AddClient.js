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

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

import {
  addClient,
  updateClient
} from '../../modules/Controller'


class AddClient extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fetching: false,
      success: false,
      error: false,
      name: this.props.name
    }
    if (props.birthDate) {
      this.state.birthDate = moment(props.birthDate, "DD/MM/YYYY")
    } else {
      this.state.birthDate = moment()
    }
    this._handleChangeDate = this._handleChangeDate.bind(this)
  }

  _handleChangeName = (e, { name, value }) => this.setState({ name: value })

  _handleChangeDate(date) {
    this.setState({
      birthDate: date
    });
  }

  /**
   * 
   * Adiciona um cliente
   */
  handleSubmit = () => {
    let { name, birthDate } = this.state
    birthDate = moment(birthDate).format('YYYY-MM-DD')
    const idClient = this.props.id
    if (this.props.isEditing) {
      updateClient(idClient, name, birthDate)
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
      addClient(name, birthDate)
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
  }

  _renderMessages() {
    return (
      <div>
        <Message
          success
          hidden={!this.state.success}
          header='Cliente Adicionado'
          content="Você adicionou um cliente com sucesso"
        />
        <Message
          error
          hidden={!this.state.error}
          header='Erro'
          content='Houve um erro ao tentar adicionar um clientes'
        />
        <Message
          success
          hidden={!this.state.successUpdate}
          header='Cliente Atualizado'
          content="Você atualizou um cliente com sucesso"
        />
        <Message
          error
          hidden={!this.state.errorUpdate}
          header='Erro'
          content='Houve um erro ao tentar atualizar um cliente'
        />
      </div>
    )
  }


  _renderForm() {
    const { name } = this.state
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
        {/* Data de Nascimento */}
        <Form.Field
        >
          <label>Data de nascimento</label>
          <DatePicker
            selected={this.state.birthDate}
            onChange={this._handleChangeDate}
            dateFormat={'DD/MM/YYYY'}
          />
        </Form.Field>
        <Button type='submit'>{this.props.isEditing ? 'Atualizar Cliente' : 'Adicionar Cliente'}</Button>
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

export default AddClient;