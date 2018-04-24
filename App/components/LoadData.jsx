/* eslint object-curly-newline: ["error", "never"] */
import React from 'react';
import { Button } from 'react-bootstrap';

export default ({ handleClick, btnBigData, btnSmallData, activeButton }) => {
  // const styles = { width: 200, margin: 20 };
  // const { handleClick, btnBigData, btnSmallData, activeButton } = props;
  // console.log();
  return (
    <div>
      <Button
        bsStyle="success"
        onClick={handleClick('bigdata')}
        disabled={btnBigData.isDisable}
        active={activeButton === 'bigdata'}
      >
        {btnBigData.isLoading ? 'Loading...' : 'Loading big data'}
      </Button>
      {' '}
      <Button
        bsStyle="success"
        onClick={handleClick('smalldata')}
        disabled={btnSmallData.isDisable}
        active={activeButton === 'smalldata'}
      >
        {btnSmallData.isLoading ? 'Loading...' : 'Loading small data'}
      </Button>
    </div>
  );
};
