import React from 'react';

export default class LineHeightBox extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    const lineHeightValue = event.target.value;
    this.props.lineHeightToScale(lineHeightValue);
  }
  render() {
    return (
      <div>
        <label htmlFor="line-height">
          Line-height
        </label>
        <input type="number"
               id="line-height"
               data-testid="LineHeightBox"
               onChange={this.handleChange}
               value={this.props.lineHeight}
        />
      </div>
    );
  }
}
