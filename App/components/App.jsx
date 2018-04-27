import React from 'react';
import axios from 'axios';
import LoadData from './LoadData';
import routes from '../routes';
import Table from './Table';
import Info from './Info';
import FilterForm from './FilterForm';
import Pagination from './Pagination';

const getFirstPageData = data => (data.length <= 50 ? [...data] : data.slice(0, 50));

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
    preparingData: [],
    renderingData: [],
    tableSort: {
      id: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
    },
    pagination: {
      pages: 0,
      activePage: 1,
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
          activeRowId: null,
          preparingData: [...this.initialData],
          renderingData: getFirstPageData(this.initialData),
          pagination: {
            pages: Math.ceil(this.initialData.length / 50),
            activePage: 1,
          },
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
      preparingData: searchingValue === '' ? [...this.initialData] : filteredData,
      renderingData: searchingValue === '' ? getFirstPageData(this.initialData) : getFirstPageData(filteredData),
      activeRowId: null,
      tableSort: {
        id: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
      },
      pagination: {
        pages: Math.ceil(filteredData.length / 50),
        activePage: 1,
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
    const unsortedData = [...this.state.preparingData];
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
      preparingData: sortedData,
      renderingData: getFirstPageData(sortedData),
      activeRowId: null,
      tableSort: {
        id: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        [thType]: sortDir,
      },
      pagination: {
        ...this.state.pagination,
        activePage: 1,
      },
    });
  };

  handlePageClick = index => () => {
    const prepData = this.state.preparingData;
    if (prepData.length / 50 <= 1) {
      this.setState({
        ...this.state,
        renderingData: [...prepData],
      });
    }
    const firstArrayIndex = 50 * (index - 1);
    const lastArrayIndex = (50 * index) - 1;
    const renderingData = prepData.slice(firstArrayIndex, lastArrayIndex + 1);
    this.setState({
      ...this.state,
      renderingData,
      activeRowId: null,
      pagination: {
        ...this.state.pagination,
        activePage: index,
      },
    });
  };

  render() {
    const activeRowInfo = this.state.renderingData.find(el => el.id === this.state.activeRowId);
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
          {this.state.renderingData.length !== 0 ?
            <Table
              data={this.state.renderingData}
              handleRowClick={this.handleRowClick}
              activeRowId={this.state.activeRowId}
              handleThSort={this.handleThSort}
              tableSort={this.state.tableSort}
            /> : null}
          <div className="pagination">
            <Pagination
              pages={this.state.pagination.pages}
              activePage={this.state.pagination.activePage}
              handlePageClick={this.handlePageClick}
            />
          </div>
        </div>
        <div className="address-data">
          {this.state.activeRowId ? <Info activeRowInfo={activeRowInfo} /> : null}
        </div>
      </React.Fragment>
    );
  }
}

export default App;
