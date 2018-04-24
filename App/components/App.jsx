import React from 'react';
import axios from 'axios';
import LoadData from './LoadData';
import routes from '../routes';

class App extends React.Component {
  state = {
    btnBigData: {
      isLoading: false,
      isDisable: false,
    },
    btnSmallData: {
      isLoading: false,
      isDisable: false,
    },
    activeButton: '',
  };

  handleClick = btnType => () => {
    this.setState({
      btnBigData: {
        isLoading: btnType === 'bigdata' && this.state.btnBigData.isLoading === false,
        isDisable: true,
      },
      btnSmallData: {
        isLoading: btnType === 'smalldata' && this.state.btnSmallData.isLoading === false,
        isDisable: true,
      },
      activeButton: btnType,
    });
    axios.get(routes[btnType])
      .then((data) => {
        console.log(data);
        this.setState({
          btnBigData: {
            isLoading: false,
            isDisable: false,
          },
          btnSmallData: {
            isLoading: false,
            isDisable: false,
          },
          activeButton: this.state.activeButton,
        });
      });
  };

  render() {
    return (
      <div className="jumbotron">
        <LoadData
          handleClick={this.handleClick}
          btnBigData={this.state.btnBigData}
          btnSmallData={this.state.btnSmallData}
          activeButton={this.state.activeButton}
        />
      </div>
    );
  }
}

export default App;
