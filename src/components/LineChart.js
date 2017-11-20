import React, { Component } from 'react'
import { Line } from 'react-chartjs-2'
import { Header, Card } from 'semantic-ui-react'


const data = {
  labels: ['1920', '1930', '1940', '1950', '1960', '1970', '1980', '1990', '2000', '2010'],
  datasets: [
    {
      label: 'Pop',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [65, 59, 80, 81, 56, 55, 40, 55, 20, 30]
    },
    {
      label: 'Rock',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(192,75,75,0.4)',
      borderColor: 'rgba(192,75,75,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(192,75,75,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(192,75,75,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [35, 80, 30, 28, 40, 50, 67, 40, 55, 70]
    }
  ]
};

export class LineChart extends Component {
  constructor(props){
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
              Hotness médio por década
            </Header>
          </Card.Header>
        </Card.Content>
        <Card.Content>
          <Line data={this.state.data} width={500} height={300} />
        </Card.Content>
      </Card>
    )
  }
} 