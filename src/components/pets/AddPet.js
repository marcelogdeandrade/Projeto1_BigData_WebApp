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
  getMedicines,
  getSpecies,
  getClients
} from '../../modules/Controller'


class AddPet extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fetching: false,
      fetchingSpecies: false,
      fetchingClients: false,
      success: false,
      error: false,
      errorSpecies: false,
      errorClients: false,
      species: [],
      clients: [],
      birthDate: moment()
    }
    this._handleChangeDate = this._handleChangeDate.bind(this)
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

  /******/

  handleSubmit = () => {
    let { name, idSpecies, idClient, birthDate } = this.state
    birthDate = moment(birthDate).format('YYYY-MM-DD')
    this.setState({ fetching: true })
    addPet(name, idSpecies, idClient, birthDate)
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

  _renderMessages(){
    return(
      <div>
        <Message
          success
          header='Pet Adicionado'
          content="Você adicionou um pet com sucesso"
        />
        <Message
          error
          header='Erro'
          content='Houve um erro ao tentar adicionar um pet'
        />
        <Message
          error
          hidden={!this.state.errorSpecies}
          header='Erro'
          content='Houve um erro ao listar as espécies'
        />
        <Message
          error
          hidden={!this.state.errorClients}
          header='Erro'
          content='Houve um erro ao listar os clientes'
        />
      </div>
    )
  }

  _renderForm() {
    // Options de teste
    let species = this._formatSpeciesList(this.state.species)
    const clients = this._formatClientsList(this.state.clients)
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
          <Select loading={this.state.fetchingSpecies}placeholder='Espécie' options={species} onChange={this._handleChangeSpecies} />
        </Form.Field>
        {/* Cliente */}
        <Form.Field
        >
          <label>Cliente</label>
          <Select loading={this.state.fetchingClients} placeholder='Cliente' options={clients} onChange={this._handleChangeClient}/>
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