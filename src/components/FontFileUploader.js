import React from 'react';

export default class FontFileUploader extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    const fileList = event.target.files;
    this.props.onChange(fileList);
  }
  render() {
    return (
      <div>
        <input type="file"
               data-testid="FontFileUploader"
               accept=".otf, .ttf, .woff"
               onChange={this.handleChange}
        />
      </div>
    );
  }
}
