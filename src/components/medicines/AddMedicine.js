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
  Input, 
  Grid 
} from 'semantic-ui-react'

import { 
  addMedicine, 
  getPets,
  updateMedicine
} from '../../modules/Controller'


class AddMedicine extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fetching: false,
      success: false,
      error: false,
      name: props.name
    }
  }

  /**
   * Input Handlers
   * 
   * @memberof AddMedicine
   */
  _handleChangeName = (e, { name, value }) => this.setState({ name: value })


  /*********/

  handleSubmit = () => {
    let { name } = this.state
    const idMedicine = this.props.id
    this.setState({ fetching: true })
    if (this.props.isEditing) {
      updateMedicine(idMedicine, name)
        .then(result => {
          this.setState({
            fetching: false
          })
          console.log(result)
          if (!result.problem) {
            this.setState({
              successUpdate: true
            })
          } else {
            this.setState({
              errorUpdate: true
            })
          }
        })
    } else {
      addMedicine(name)
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

  _renderMessages(){
    return(
      <div>
        <Message
          success
          hidden={!this.state.success}
          header='Remédio Adicionado'
          content="Você adicionou um remédio com sucesso"
        />
        <Message
          error
          hidden={!this.state.error}
          header='Erro'
          content='Houve um erro ao tentar adicionar um remédio'
        />
        <Message
          success
          hidden={!this.state.successUpdate}
          header='Remédio Atualizado'
          content="Você atualizou um remédio com sucesso"
        />
        <Message
          error
          hidden={!this.state.errorUpdate}
          header='Erro'
          content='Houve um erro ao tentar atualizar um remédio'
        />
      </div>
    )
  }
  _renderForm() {

    // Options de teste
    const units = [
      { key: 'ml', text: 'ml', value: 'ml' },
      { key: 'g', text: 'g', value: 'g' },
    ]
    return (
      <Form
        loading={this.state.fetching}
        onSubmit={this.handleSubmit}
      >
        {/* Nome */}
        <Form.Field
          required
        >
          <label>Nome</label>
          <Form.Input defaultValue = {this.props.name} placeholder='Nome' name='name' onChange={this._handleChangeName} />
        </Form.Field>
        <Button type='submit'>{this.props.isEditing ? 'Atualizar Remédio' : 'Adicionar Remédio'}</Button>
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

export default AddMedicine;