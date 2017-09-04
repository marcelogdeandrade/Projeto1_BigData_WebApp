import React, { Component } from 'react';
import { Button, Checkbox, Form, Message, Dimmer, Loader, Segment, Select, Dropdown, Input, Grid } from 'semantic-ui-react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

import { addMedicine, getPets } from '../../modules/Controller'


class AddMedicine extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fetching: false,
      success: false,
      error: false,
    }
    this.renderForm = this.renderForm.bind(this)
  }

  handleChangeName = (e, { name, value }) => this.setState({ name: value })

  handleChangeQuantity = (e, { name, value }) => this.setState({ quantity: value })

  handleChangePets = (e, { name, value }) => this.setState({ pets: value })

  handleSubmit = () => {
    let { name, quantity, pets } = this.state
    this.setState({ fetching: true })
    addMedicine(name, quantity, pets)
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


  renderForm() {

    // Options de teste
    const pets = [{ key: 'Boris', value: 'Boris', text: 'Boris' }, { key: 'Nala', value: 'Nala', text: 'Nala' }]
    const { name } = this.state
    const units = [
      { key: 'ml', text: 'ml', value: 'ml' },
      { key: 'g', text: 'g', value: 'g' },
    ]
    return (
      <Form
        loading={this.state.fetching}
        success={this.state.success}
        error={this.state.error}
        onSubmit={this.handleSubmit}
      >
        {/* Nome */}
        <Form.Field
          required
        >
          <label>Nome</label>
          <Form.Input placeholder='Nome' name='name' onChange={this.handleChangeName} />
        </Form.Field>
        {/* Quantidade */}
        <Form.Field
        >
          <label>Quantidade</label>
          <Input
            label={<Dropdown defaultValue='ml' options={units} />}
            labelPosition='right'
            placeholder='Quantidade'
            onChange={this.handleChangeQuantity}
          />
        </Form.Field>
        {/* Pets */}
        <Form.Field
        >
          <label>Pets</label>
          <Dropdown placeholder='Pets' onChange={this.handleChangePets} fluid multiple selection options={pets} />
        </Form.Field>
        <Message
          success
          header='Espécie Adicionada'
          content="Você adicionou uma espécie com sucesso"
        />
        <Message
          error
          header='Erro'
          content='Houve um erro ao tentar adicionar uma espécie'
        />
        <Button type='submit'>Adicionar Remédio</Button>
      </Form>
    )
  }

  render() {
    return (
      <Grid>
        <Grid.Row>
          <Grid.Column width={4}>
            <Segment>
              {this.renderForm()}
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

export default AddMedicine;