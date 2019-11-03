import React from 'react';

export default class FontSizeBox extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.handleChange = this.handleChange.bind(this);
  // }
  // handleChange(event) {
  //   const file = event.target.files[0];
  // }
  render() {
    return (
      <div>
        <label htmlFor="font-size">
          Font-size (in px)
        </label>
        <input type="number"
               id="font-size"
               data-testid="FontSizeBox"
               value={this.props.fontSize}
        />
      </div>
    );
  }
}
