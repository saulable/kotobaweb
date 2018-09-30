import React, { PureComponent } from 'react';

class ListPicker extends PureComponent {
  toggle = item => {
    const itemIndex = this.props.selectedItems.indexOf(item);
    const addItem = itemIndex === -1;
    const newSelectedItems = this.props.selectedItems.slice();

    if (addItem) {
      newSelectedItems.push(item);
    } else {
      newSelectedItems.splice(itemIndex, 1);
    }

    this.props.selectionUpdated(newSelectedItems);
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
              className={`list-group-item list-group-item-action${this.props.selectedItems.indexOf(item) !== -1 ? ' active' : ''}`}
              onClick={() => this.toggle(item)}
              key={item.key}>
                {item.value}
            </a>
          )}
        </div>
        <div className="pt-1">
          { this.props.selectedItems[0] &&
            <hr />
          }
          {this.props.selectedItems.map(item =>
            <button type="button" className="btn btn-outline-primary mr-2" onClick={() => this.toggle(item)} key={item.key}>
              {item.value} <span aria-hidden="true">&times;</span>
            </button>
          )}
        </div>
      </div>
    );
  }
}

export default ListPicker;
