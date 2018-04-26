/* eslint object-curly-newline: ["error", "never"] */
import React from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';

export default class extends React.Component {
  state = { inputValue: '' };

  handleChange = (e) => {
    this.setState({ inputValue: e.target.value });
  };

  render() {
    return (
      <Form inline>
        <FormControl type="text" onChange={this.handleChange} />
        <Button bsStyle="success" type="submit" onClick={this.props.handleBtnSearch(this.state.inputValue)}>Find</Button>
      </Form>
    );
  }
}
