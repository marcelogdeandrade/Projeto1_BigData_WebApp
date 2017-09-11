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
  getPets
} from '../../modules/Controller'


class AddIllness extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fetching: false,
      success: false,
      error: false,
      isContagious: false,
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
    console.log(isContagious)
    this.setState({ fetching: true })
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

  _renderMessages() {
    return (
      <div>
        <Message
          success
          header='Doença Adicionada'
          content="Você adicionou uma doença com sucesso"
        />
        <Message
          error
          header='Erro'
          content='Houve um erro ao tentar adicionar uma doença'
        />
      </div>
    )
  }
  _renderForm() {

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
        <Form.Field
          required
        >
          <label>Contagiosa</label>
          <Checkbox toggle onChange={this._handleChangeContagious}/>
        </Form.Field>
        {this._renderMessages()}
        <Button type='submit'>Adicionar Doença</Button>
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

export default AddIllness;