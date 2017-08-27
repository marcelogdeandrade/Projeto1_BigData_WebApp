import React, { Component } from 'react';
import { Button, Checkbox, Form, Message } from 'semantic-ui-react'
import { Dimmer, Loader, Segment } from 'semantic-ui-react'
import { addSpecie } from '../modules/Controller'


class AddSpecie extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fetching: false,
      success: false,
      error: false
    }
    this.renderForm = this.renderForm.bind(this)
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })


  handleSubmit = () => {
    const { name } = this.state
    this.setState({ submittedName: name, fetching: true })
    addSpecie(name)
      .then(result => {
        this.setState({
          fetching: false
        })
        if (!result.problem){
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
    const { name } = this.state
    return(
    <Form
        loading = {this.state.fetching}
        success = {this.state.success}
        error = {this.state.error}
        onSubmit={this.handleSubmit}
      >
      <Form.Field 
        required
        >
        <label>Nome</label>
        <Form.Input placeholder='Name' name='name' onChange={this.handleChange} />
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
      <Button type='submit'>Adicionar Espécie</Button>
    </Form>
    )
  }

  render() {
    return (
      <Segment>
       {this.renderForm()}
      </Segment>
    )
  }
}

export default AddSpecie;