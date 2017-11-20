import React, { Component } from 'react'
import {Grid, Image, Segment, Header, Icon, Container } from 'semantic-ui-react'
import { LineChart } from './LineChart'
import { BarChart } from './BarChart'
import { PieChart } from './PieChart'
import { SlideBar } from './Slider'
import { Summary } from './Summary'
import { WorldMapChart } from './WorldMap'


class Home extends Component {
  constructor(props){
    super()
    this.state = {
      year:  1920
    }
    this.sliderChange = this.sliderChange.bind(this)
  }
  sliderChange(value){
    this.setState({
      year : value
    })
  }
  render() {
    return (
      <div>
      <Segment clearing>
          <Header as='h2' textAlign='center'>
            Million Song
        </Header>
      </Segment>
        <Grid>
          {/* Primeira linha */}
          <Grid.Row>
            <Grid.Column width={8} textAlign='center' stretched>
              <Summary/>
            </Grid.Column>
            <Grid.Column width={8} verticalAlign='middle' textAlign='center'>
              <Summary/>
            </Grid.Column>
          </Grid.Row>

          {/* Segunda linha */}
          <Grid.Row>
            <Grid.Column width={4} verticalAlign='middle' textAlign='center'>
              <BarChart />
            </Grid.Column>
            <Grid.Column width={8}>
              <Grid>
                <Grid.Row>
                  <Grid.Column width={16} verticalAlign='middle' textAlign='center'>
                    <SlideBar
                      valueChange = {this.sliderChange}
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column width={16} verticalAlign='middle' textAlign='center'>
                    <WorldMapChart
                      year = {this.state.year}
                    />
=                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Grid.Column>
            <Grid.Column width={4} verticalAlign='middle' textAlign='center'>
              <LineChart />
            </Grid.Column>
          </Grid.Row>

          {/* Terceira linha */}
          <Grid.Row>
            <Grid.Column width={8} verticalAlign='middle' textAlign='center'>
              <PieChart />
            </Grid.Column>
            <Grid.Column width={8} verticalAlign='middle' textAlign='center'>
              <PieChart/>
            </Grid.Column>
          </Grid.Row>
        </Grid>

      </div>
    )
  }
}


export default Home
