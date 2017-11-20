import React, { Component } from 'react'
import { Bar } from 'react-chartjs-2'
import { Header, Card} from 'semantic-ui-react'


const data = {
  labels: ['1920', '1930', '1940', '1950', '1960', '1970', '1980', '1990', '2000', '2010'],
  datasets: [
    {
      label: 'Pop',
      backgroundColor: 'rgba(99,255,222,0.2)',
      borderColor: 'rgba(99,255,222,1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(99,255,222,0.4)',
      hoverBorderColor: 'rgba(99,255,222,1)',
      data: [65, 59, 80, 81, 56, 55, 40, 30, 55, 70]
    },
    {
      label: 'Rock',
      backgroundColor: 'rgba(255,99,132,0.2)',
      borderColor: 'rgba(255,99,132,1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
      hoverBorderColor: 'rgba(255,99,132,1)',
      data: [30, 40, 87, 60, 50, 80, 78, 28, 60, 81]
    }
  ]
};

export class BarChart extends Component {
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
          <Bar
            data={this.state.data}
            width={500}
            height={300}
          />
        </Card.Content>
      </Card>
    )
  }
} 