import React, { Component } from 'react';

class Submenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTabName: props.initialTabName,
    };
  }

  onClick = clickedTitle => {
    this.setState({
      currentTabName: clickedTitle,
    });
  }

  render() {
    const TabContent = this.props.contentForTabName[this.state.currentTabName];
    return (
      <div>
        <div className="row mb-5">
          <div className="col-sm-12">
            <ul className="nav nav-tabs bg-light pl-5">
              { Object.keys(this.props.contentForTabName).map(tabName => {
                return (
                  <li className="nav-item" key={tabName}>
                    <a className={`nav-link submenu-nav-link${this.state.currentTabName === tabName ? ' active' : ''}`} href="#" onClick={() => this.onClick(tabName)}>{tabName}</a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <TabContent />
      </div>
    );
  }
}

export default Submenu;
