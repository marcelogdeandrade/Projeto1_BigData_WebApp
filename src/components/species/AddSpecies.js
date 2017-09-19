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

import { 
  addSpecies,
  updateSpecies
} from '../../modules/Controller'


class AddSpecies extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fetching: false,
      success: false,
      error: false,
      name: props.name
    }
  }

  _handleChangeName = (e, { name, value }) => this.setState({ [name]: value })
  /**
   * 
   * Adiciona uma espécie
   * @memberof AddSpecies
   */
  handleSubmit = () => {
    const { name } = this.state
    const idSpecies = this.props.id
    if (this.props.isEditing){
      updateSpecies(name, idSpecies)
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
      addSpecies(name)
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
    return(
      <div>
        <Message
          success
          hidden={!this.state.success}
          header='Espécie Adicionada'
          content="Você adicionou uma espécie com sucesso"
        />
        <Message
          error
          hidden={!this.state.error}
          header='Erro'
          content='Houve um erro ao tentar adicionar uma espécie'
        />
        <Message
          success
          hidden={!this.state.successUpdate}
          header='Espécie Atualizada'
          content="Você atualizou uma espécie com sucesso"
        />
        <Message
          error
          hidden={!this.state.errorUpdate}
          header='Erro'
          content='Houve um erro ao tentar atualizar uma espécie'
        />
      </div>
    )
  }


  _renderForm() {
    const { name } = this.state
    return(
    <div>
      <Form
          loading = {this.state.fetching}
          onSubmit={this.handleSubmit}
        >
        <Form.Field 
          required
          >
          <label>Nome</label>
          <Form.Input defaultValue={this.state.name} placeholder='Nome' name='name' onChange={this._handleChangeName} />
        </Form.Field>
        <Button type='submit'>{this.props.isEditing ? 'Atualizar Espécie' : 'Adicionar Espécie'}</Button>
      </Form>
      {this._renderMessages()}
    </div>
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
            {this.props.isEditing ? <Button onClick={this.props.back}>Voltar</Button> : ''}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

export default AddSpecies;