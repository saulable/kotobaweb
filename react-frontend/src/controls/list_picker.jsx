import React, { Component } from 'react';

class ListPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedKeys: {},
    };
  }

  toggle = key => {
    this.setState(function(previousState) {
      if (previousState.selectedKeys[key]) {
        delete previousState.selectedKeys[key];
      } else {
        previousState.selectedKeys[key] = true;
      }

      this.props.selectionUpdated(Object.keys(previousState.selectedKeys));
      return previousState;
    });
  }

  render() {
    const listPickerBoxStyles = {
      overflowY: 'scroll',
      maxHeight: this.props.maxHeight,
    };

    return (
      <div>
        <div className="list-group" style={listPickerBoxStyles}>
          {this.props.items.map(item =>
            <a
              href="#"
              className={`list-group-item list-group-item-action${this.state.selectedKeys[item.key] ? ' active' : ''}`}
              onClick={() => this.toggle(item.key)}
              key={item.key}>
                {item.value}
            </a>
          )}
        </div>
        <div className="pt-1">
          { Object.keys(this.state.selectedKeys)[0] &&
            <hr />
          }
          {this.props.items.filter(item => this.state.selectedKeys[item.key]).map(item =>
            <button type="button" className="btn btn-outline-primary mr-2" onClick={() => this.toggle(item.key)} key={item.key}>
              {item.value} <span aria-hidden="true">&times;</span>
            </button>
          )}
        </div>
      </div>
    );
  }
}

export default ListPicker;
