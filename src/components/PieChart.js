import React, { Component } from 'react'
import { Pie } from 'react-chartjs-2'
import { Header, Card } from 'semantic-ui-react'


const data = {
  labels: [
    'Red',
    'Green',
    'Yellow'
  ],
  datasets: [{
    data: [300, 50, 100],
    backgroundColor: [
      '#FF6384',
      '#36A2EB',
      '#FFCE56'
    ],
    hoverBackgroundColor: [
      '#FF6384',
      '#36A2EB',
      '#FFCE56'
    ]
  }]
};

export class PieChart extends Component {
  constructor(props) {
    super()
    this.state = {
      data: data
    }
  }
  render() {
    return (
      <Card centered fluid>
        <Card.Content>
          <Card.Header>
            <Header>
              Loudness médio por década
            </Header>
          </Card.Header>
        </Card.Content>
        <Card.Content>
          <Pie data={this.state.data} width={100} height={40}  />
        </Card.Content>
      </Card>
    )
  }
} 