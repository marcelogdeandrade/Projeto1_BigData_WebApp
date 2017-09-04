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
  addSpecies 
} from '../../modules/Controller'


class AddSpecies extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fetching: false,
      success: false,
      error: false
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
    this.setState({ submittedName: name, fetching: true })
    addSpecies(name)
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

  _renderMessages() {
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
        <Form.Input placeholder='Nome' name='name' onChange={this._handleChangeName} />
      </Form.Field>
      {this._renderMessages()}
      <Button type='submit'>Adicionar Espécie</Button>
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

export default AddSpecies;