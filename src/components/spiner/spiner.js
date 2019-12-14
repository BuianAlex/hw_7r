import React from 'react';
import { css } from '@emotion/core';
// First way to import
import { RingLoader } from 'react-spinners';
// Another way to import. This is recommended to reduce bundle size
//import ClipLoader from 'react-spinners/ClipLoader';

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
  border-color: #09d3ac;
`;

class AwesomeComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }
  render() {
    return (
      <div className="sweet-loading">
        <RingLoader
          css={override}
          sizeUnit={'px'}
          size={60}
          color={'#09d3ac'}
          // loading={this.state.loading}
        />
      </div>
    );
  }
}
export default AwesomeComponent;
