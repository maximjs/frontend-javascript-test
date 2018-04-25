/* eslint object-curly-newline: ["error", "never"] */
import React from 'react';
import classnames from 'classnames';
import { Table } from 'react-bootstrap';

export default ({ data, handleRowClick, activeRowId }) => {
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
          <th>id ▲ ▼</th>
          <th>firstName</th>
          <th>lastName</th>
          <th>email</th>
          <th>phone</th>
        </tr>
      </thead>
      <tbody>
        {tbody}
      </tbody>
    </Table>
  );
};
