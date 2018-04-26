/* eslint object-curly-newline: ["error", "never"] */
import React from 'react';
import classnames from 'classnames';
import { Table } from 'react-bootstrap';

export default (props) => {
  const thRender = (thType) => {
    switch (props.tableSort[thType]) {
      case 'up': return `${thType} ▲`;
      case 'down': return `${thType} ▼`;
      default: return `${thType}`;
    }
  };
  const { data, handleRowClick, activeRowId, handleThSort } = props;
  const tbody = data.map(({ id, firstName, lastName, email, phone }) => {
    const trClass = classnames({ 'table-active': activeRowId === id });
    return (
      <tr key={id} className={trClass} onClick={handleRowClick(id)}>
        <td>{id}</td>
        <td>{firstName}</td>
        <td>{lastName}</td>
        <td>{email}</td>
        <td>{phone}</td>
      </tr>
    );
  });
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th><button className="btn-th" onClick={handleThSort('id')}>{thRender('id')}</button></th>
          <th><button className="btn-th" onClick={handleThSort('firstName')}>{thRender('firstName')}</button></th>
          <th><button className="btn-th" onClick={handleThSort('lastName')}>{thRender('lastName')}</button></th>
          <th><button className="btn-th" onClick={handleThSort('email')}>{thRender('email')}</button></th>
          <th><button className="btn-th" onClick={handleThSort('phone')}>{thRender('phone')}</button></th>
        </tr>
      </thead>
      <tbody>
        {tbody}
      </tbody>
    </Table>
  );
};
