import React from 'react';

export default class FontSizeBox extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    const fontSizeValue = event.target.value;
    this.props.fontSizeToXHeight(fontSizeValue);
  }
  render() {
    return (
      <div>
        <label htmlFor="font-size">
          Font-size (in px)
        </label>
        <input type="number"
               id="font-size"
               data-testid="FontSizeBox"
               onChange={this.handleChange}
               value={this.props.fontSize}
        />
      </div>
    );
  }
}
