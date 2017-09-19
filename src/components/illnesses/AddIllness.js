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
  addIllness,
  getPets,
  updateIllness
} from '../../modules/Controller'


class AddIllness extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fetching: false,
      success: false,
      error: false,
      isContagious: false,
      name: props.name,
      isContagious: props.isContagious
    }
  }

  /**
   * Input Handlers
   * 
   * @memberof AddMedicine
   */
  _handleChangeName = (e, { name, value }) => this.setState({ name: value })

  _handleChangeContagious = (e, data) => this.setState({ isContagious: data.checked })


  /*********/

  handleSubmit = () => {
    let { name, isContagious} = this.state
    const idIllness = this.props.id
    this.setState({ fetching: true })
    if (this.props.isEditing) {
      updateIllness(idIllness, name, + isContagious)
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
      addIllness(name, + isContagious)
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

  _renderMessages() {
    return (
      <div>
        <Message
          success
          hidden={!this.state.success}
          header='Doença Adicionada'
          content="Você adicionou uma doença com sucesso"
        />
        <Message
          error
          hidden={!this.state.error}
          header='Erro'
          content='Houve um erro ao tentar adicionar uma doença'
        />
        <Message
          success
          hidden={!this.state.successUpdate}
          header='Doença Atualizada'
          content="Você atualizou uma doença com sucesso"
        />
        <Message
          error
          hidden={!this.state.errorUpdate}
          header='Erro'
          content='Houve um erro ao tentar atualizar uma doença'
        />
      </div>
    )
  }
  _renderForm() {

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
          <Form.Input defaultValue={this.props.name} placeholder='Nome' name='name' onChange={this._handleChangeName} />
        </Form.Field>
        <Form.Field
          required
        >
          <label>Contagiosa</label>
          <Checkbox defaultChecked = {!!this.state.isContagious} toggle onChange={this._handleChangeContagious}/>
        </Form.Field>
        <Button type='submit'>{this.props.isEditing ? 'Atualizar Doença' : 'Adicionar Doença'}</Button>
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

export default AddIllness;