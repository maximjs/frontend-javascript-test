/* eslint object-curly-newline: ["error", "never"] */
import React from 'react';
import { Table } from 'react-bootstrap';

export default ({ activeRowInfo }) => {
  const { address: { city, state, streetAddress, zip }, firstName, lastName, description } = activeRowInfo;
  return (
    <div className="address-data">
      <Table>
        <tbody>
          <tr>
            <td>Выбран пользователь:</td>
            <td>{`${firstName} ${lastName}`}</td>
          </tr>
          <tr>
            <td>Описание:</td>
            <td>
              <textarea>
                {description}
              </textarea>
            </td>
          </tr>
          <tr>
            <td>Адрес проживания:</td>
            <td>{streetAddress}</td>
          </tr>
          <tr>
            <td>Город:</td>
            <td>{city}</td>
          </tr>
          <tr>
            <td>Провинция/штат:</td>
            <td>{state}</td>
          </tr>
          <tr>
            <td>Индекс:</td>
            <td>{zip}</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};
