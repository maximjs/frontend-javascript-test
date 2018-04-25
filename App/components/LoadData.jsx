/* eslint object-curly-newline: ["error", "never"] */
import React from 'react';
import { Button, ButtonToolbar } from 'react-bootstrap';

export default ({ handleBtnLoad, btnBigData, btnSmallData, activeButton }) =>
  (
    <ButtonToolbar>
      <Button
        className="btn-data"
        bsStyle="primary"
        onClick={handleBtnLoad('bigdata')}
        disabled={btnBigData.isDisable}
        active={activeButton === 'bigdata'}
      >
        {btnBigData.isLoading ? 'Loading...' : 'Loading big data'}
      </Button>
      <Button
        className="btn-data"
        bsStyle="primary"
        onClick={handleBtnLoad('smalldata')}
        disabled={btnSmallData.isDisable}
        active={activeButton === 'smalldata'}
      >
        {btnSmallData.isLoading ? 'Loading...' : 'Loading small data'}
      </Button>
    </ButtonToolbar>
  );
