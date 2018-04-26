import React from 'react';
import axios from 'axios';
import LoadData from './LoadData';
import routes from '../routes';
import Table from './Table';
import Info from './Info';
import FilterForm from './FilterForm';

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
    activeRowId: null,
    data: [],
    tableSort: {
      id: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
    },
  };

  handleBtnLoad = btnType => () => {
    this.setState({
      ...this.state,
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
      .then((resp) => {
        this.initialData = resp.data;
        this.setState({
          ...this.state,
          btnBigData: {
            isLoading: false,
            isDisable: false,
          },
          btnSmallData: {
            isLoading: false,
            isDisable: false,
          },
          data: this.initialData,
        });
      })
      .catch(error => console.error(error));
  };

  handleBtnSearch = searchingValue => (e) => {
    e.preventDefault();
    if (!this.initialData) return;
    const filteredData = this.initialData.filter((el) => {
      const tableData = {
        id: el.id,
        firstName: el.firstName,
        lastName: el.lastName,
        email: el.email,
        phone: el.phone,
      };
      const valuesArr = Object.values(tableData).filter(elem => typeof elem !== 'object');
      const isFiltered = valuesArr.reduce((acc, elem) => (String(elem).includes(searchingValue) ? true : acc), false);
      return isFiltered;
    });

    this.setState({
      ...this.state,
      data: searchingValue === '' ? this.initialData : filteredData,
      activeRowId: null,
      tableSort: {
        id: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
      },
    });
  };

  handleRowClick = rowId => () => {
    this.setState({
      ...this.state,
      activeRowId: rowId,
    });
  };

  handleThSort = thType => () => {
    const sortDir = this.state.tableSort[thType] === 'up' ? 'down' : 'up';
    const unsortedData = [...this.state.data];
    const sortedData = unsortedData.sort((a, b) => {
      const prepareValueToCompare = (value) => {
        if (typeof value === 'number') {
          return value;
        }
        if (typeof value === 'string') {
          return value.toLowerCase();
        }
        return value;
      };

      if (prepareValueToCompare(a[thType]) < prepareValueToCompare(b[thType])) {
        return sortDir === 'up' ? -1 : 1;
      }
      if (prepareValueToCompare(a[thType]) > prepareValueToCompare(b[thType])) {
        return sortDir === 'up' ? 1 : -1;
      }
      return 0;
    });
    this.setState({
      ...this.state,
      data: sortedData,
      tableSort: {
        id: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        [thType]: sortDir,
      },
    });
  };

  render() {
    const activeRowInfo = this.state.data.find(el => el.id === this.state.activeRowId);
    return (
      <React.Fragment>
        <div className="fetch-data">
          <LoadData
            handleBtnLoad={this.handleBtnLoad}
            btnBigData={this.state.btnBigData}
            btnSmallData={this.state.btnSmallData}
            activeButton={this.state.activeButton}
          />
          <div className="searching-form">
            <FilterForm handleBtnSearch={this.handleBtnSearch} />
          </div>
        </div>
        <div className="table-data">
          {this.state.data.length !== 0 ?
            <Table
              data={this.state.data}
              handleRowClick={this.handleRowClick}
              activeRowId={this.state.activeRowId}
              handleThSort={this.handleThSort}
              tableSort={this.state.tableSort}
            /> : null}
        </div>
        {this.state.activeRowId ? <Info activeRowInfo={activeRowInfo} /> : null}
      </React.Fragment>
    );
  }
}

export default App;
