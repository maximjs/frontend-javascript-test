import React from 'react';
import classnames from 'classnames';

export default ({ pages, activePage, handlePageClick }) => {
  const items = [];
  for (let i = 1; i <= pages; i += 1) {
    const liClass = classnames({
      'page-item': true,
      active: i === activePage,
    });
    items.push(<li className={liClass} key={i}><button className="page-link" onClick={handlePageClick(i)}>{i}</button></li>);
  }
  return (
    <ul className="pagination">
      {items}
    </ul>
  );
};
