import React, { Component } from 'react'
import { Card, Statistic, Dropdown } from 'semantic-ui-react'


const options = [
  {
    text: 'Pop',
    value: 'Pop'
  },
  {
    text: 'Rock',
    value: 'Rock'
  },
  {
    text: 'Funk',
    value: 'Funk'
  }
]
export class Summary extends Component {
  constructor(props) {
    super()
  }
  render() {
    return (
      <Card centered fluid raised>
        <Card.Content>
          <Card.Header>
            <Dropdown defaultValue={'Pop'} options={options}/>
        </Card.Header>
        </Card.Content>
        <Card.Content>
          <Statistic color='red' size='mini'>
            <Statistic.Label>Número de músicas</Statistic.Label>
            <Statistic.Value>230</Statistic.Value>
          </Statistic>
          <Statistic color='orange' size='mini'>
            <Statistic.Label>Duração média(s)</Statistic.Label>
            <Statistic.Value>230</Statistic.Value>
          </Statistic>
          <Statistic color='blue' size='mini'>
            <Statistic.Label>Frequência média</Statistic.Label>
            <Statistic.Value>230</Statistic.Value>
          </Statistic>
          <Statistic color='green'size='mini'>
            <Statistic.Label>Loudness médio</Statistic.Label>
            <Statistic.Value>230</Statistic.Value>
          </Statistic>
        </Card.Content>
      </Card>
    )
  }
}