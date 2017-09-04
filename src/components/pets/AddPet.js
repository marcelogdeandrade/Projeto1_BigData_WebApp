import React, { Component } from 'react';
import { 
  Button, 
  Checkbox, 
  Form, 
  Message, 
  Dimmer, 
  Loader, 
  Segment, 
  Select, 
  Dropdown, 
  Grid 
} from 'semantic-ui-react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

import { 
  addPet, 
  getMedicines
} from '../../modules/Controller'


class AddPet extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fetching: false,
      success: false,
      error: false,
      birthDate: moment()
    }
  }

  /**
   * Input Handlers
   * 
   * @memberof AddPet
   */
  _handleChangeName = (e, { name, value }) => this.setState({ name: value })

  _handleChangeDate(date) {
    this.setState({
      birthDate: date
    });
  }

  _handleChangeSpecies = (e, { name, value }) => this.setState({ idSpecies: value })

  _handleChangeClient = (e, { name, value }) => this.setState({ idClient: value })

  _handleChangeMedicines = (e, { name, value }) => this.setState({ medicines: value })

  /******/

  handleSubmit = () => {
    let { name, idSpecies, idClient, birthDate, medicines } = this.state
    birthDate = moment(birthDate).format('DD-MM-YYYY')
    this.setState({ fetching: true })
    addPet(name, idSpecies, idClient, birthDate)
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
          header='Espécie Adicionada'
          content="Você adicionou uma espécie com sucesso"
        />
        <Message
          error
          header='Erro'
          content='Houve um erro ao tentar adicionar uma espécie'
        />
      </div>
    )
  }
  _renderForm() {
    
    // Options de teste
    const species = [{ key: 'Cachorro', value: 'Cachorro', text: 'Cachorro' }, { key: 'Gato', value: 'Gato', text: 'Gato' }]
    const clients = [{ key: 'Marcelo', value: 'Marcelo', text: 'Marcelo' }, { key: 'Gabi', value: 'Gabi', text: 'Gabi' }]
    const medicines = [{ key: 'Vacina', value: 'Vacina', text: 'Vacina' }, { key: 'Pilula', value: 'Pilula', text: 'Pilula' }]
    //
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
          <Form.Input placeholder='Nome' name='name' onChange={this._handleChangeName} />
        </Form.Field>
        {/* Espécie */}
        <Form.Field
          required
        >
          <label>Espécie</label>
          <Select placeholder='Espécie' options={species} onChange={this._handleChangeSpecies} />
        </Form.Field>
        {/* Cliente */}
        <Form.Field
        >
          <label>Cliente</label>
          <Select placeholder='Cliente' options={clients} onChange={this._handleChangeClient}/>
        </Form.Field>
        {/* Remédios */}
        <Form.Field
        >
          <label>Remédios</label>
          <Dropdown placeholder='Remédios' onChange={this._handleChangeMedicines} fluid multiple selection options={medicines} />
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
        <Button type='submit'>Adicionar Pet</Button>
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

export default AddPet;