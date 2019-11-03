import React from 'react';

export default class XheightBox extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    const xHeightValue = event.target.value;
    this.props.xHeightToFontSize(xHeightValue);
  }
  render() {
    return (
      <div>
        <label htmlFor="x-height">
          x-height (in px)
        </label>
        <input type="number"
               id="x-height"
               data-testid="XheightBox"
               onChange={this.handleChange}
               value={this.props.xHeight}
        />
      </div>
    );
  }
}
