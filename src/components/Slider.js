import React, { Component } from 'react'
import { Header } from 'semantic-ui-react'
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';

const marks = {
  1920: '1920',
  1930: '1930',
  1940: '1940',
  1950: '1950',
  1960: '1960',
  1970: '1970',
  1980: '1980',
  1990: '1990',
  2000: '2000',
  2010: '2010'
};

export class SlideBar extends Component {
  constructor(props) {
    super()
  }

  render() {
    return (
      <div>
        <Header as='h2'> Década </Header>
        <Slider
          min={1920}
          max={2010}
          step={10}
          dots
          marks={marks}
          onChange={this.props.valueChange}
         />
      </div>
    )
  }
} 