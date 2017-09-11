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
  addClient
} from '../../modules/Controller'


class AddClient extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fetching: false,
      success: false,
      error: false,
      birthDate: moment()
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

  _renderMessages() {
    return (
      <div>
        <Message
          success
          header='Cliente Adicionado'
          content="Você adicionou um cliente com sucesso"
        />
        <Message
          error
          header='Erro'
          content='Houve um erro ao tentar adicionar um clientes'
        />
      </div>
    )
  }


  _renderForm() {
    const { name } = this.state
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
        {this._renderMessages()}
        <Button type='submit'>Adicionar Cliente</Button>
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

export default AddClient;