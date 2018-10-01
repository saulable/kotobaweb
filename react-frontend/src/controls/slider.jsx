import React, { Component } from 'react'
import Slider from 'react-rangeslider'
import 'react-rangeslider/lib/index.css';
import './slider.css';

class VolumeSlider extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      value: props.defaultValue,
    }
  }

  handleOnChange = (value) => {
    this.setState({
      value,
    });
  }

  handleOnChangeComplete = () => {
    this.props.onChange(this.state.value);
  }

  render() {
    let { value } = this.state
    return (
      <div className="form-group">
        <label className="bmd-label-floating label-darker bold" htmlFor={this.props.name}>
          <b>{this.props.title}</b> - {this.props.format(value)}
        </label>
        <Slider
          name={this.props.name}
          value={value}
          min={parseInt(this.props.min)}
          max={parseInt(this.props.max)}
          onChange={this.handleOnChange}
          onChangeComplete={this.handleOnChangeComplete}
          format={this.props.format}
          tooltip={false}
        />
    </div>
    )
  }
}

export default VolumeSlider;
