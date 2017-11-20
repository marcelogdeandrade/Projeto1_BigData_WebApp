import React, { Component } from "react"

import $ from 'jquery'

export class WorldMapChart extends Component {

  constructor(props){
    super()
    this.state = {
      data1 : [],
      data2 : []
    }
  }

  getData(state, url){
    const component = this
    $.getJSON(url, function (data) {
      component.setState({
        [state]: data
      })
      component.createMap(component.props.year)
    })
  }
  
  componentDidMount(){
    this.getData('data1', 'https://api.myjson.com/bins/1har7j')
    this.getData('data2', 'https://api.myjson.com/bins/h1ggv')
    this.createMap(this.props.year)
  }

  componentWillReceiveProps(nextProps){
    this.getData('data1', 'https://api.myjson.com/bins/1har7j')
    this.getData('data2', 'https://api.myjson.com/bins/h1ggv')
  }

  createMap(year){
      // Correct UK to GB in data
      Highcharts.mapChart('container', {
        chart: {
          borderWidth: 1,
          map: 'custom/world'
        },

        title: {
          text: `Número de músicas por país em ${year}`
        },

        legend: {
          enabled: false
        },

        mapNavigation: {
          enabled: true,
          buttonOptions: {
            verticalAlign: 'bottom'
          }
        },      
        series: [{
          name: 'Países',
          color: '#E0E0E0',
          enableMouseTracking: false
        }, {
          type: 'mapbubble',
          name: 'Population 2013',
          joinBy: ['iso-a2', 'code'],
          data: this.state.data1,
          minSize: 4,
          maxSize: '12%',
          tooltip: {
            pointFormat: '{point.code}: {point.z} músicas'
          },
        }, {
            type: 'mapbubble',
            name: 'Population 2014',
            joinBy: ['iso-a2', 'code'],
            data: this.state.data2,
            minSize: 4,
            maxSize: '12%',
            tooltip: {
              pointFormat: '{point.code}: {point.z} músicas'
            },
          }
      ]
      });
  }
  render() {
    return (
      <div id="container" style={{"height": "500px", "minWidth": "310px", "maxWidth": "800px", "margin": "0 auto"}}></div>
    )
  }
}