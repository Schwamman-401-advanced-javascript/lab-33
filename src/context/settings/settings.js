import React from 'react';

export const SettingsContext = React.createContext();

class SettingsProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numItems: 10,
      displayCompleted: false,
      setNumItems: this.setNumItems,
      pageNumber: 0,
      setPageNumber: this.setPageNumber,
    }
  }

  setNumItems = (num) => {
    this.setState({ numItems: parseInt(num) });
  }

  setPageNumber = (num) => {
    console.log(num);
    this.setState({ pageNumber: num});
  }

  render() {
    return (
      <SettingsContext.Provider value={this.state}>
        {this.props.children}
      </SettingsContext.Provider>
    );
  }
}

export default SettingsProvider;