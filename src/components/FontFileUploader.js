import React from 'react';

const acceptableFileExtensions = ['.ttf', '.otf', 'woff'];
const acceptableFileExtensionsInRegExp = /(\.ttf|\.otf|\.woff)$/i;

export default class FontFileUploader extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    const file = event.target.files[0];
    if (acceptableFileExtensionsInRegExp.test(file.name)) {
      this.props.onChange(file);
    } else { // Handle edge cases
      this.props.onChangeWithInvalidFile();
    }
  }
  render() {
    return (
      <div>
        <input type="file"
               data-testid="FontFileUploader"
               accept={acceptableFileExtensions.join()}
               onChange={this.handleChange}
        />
      </div>
    );
  }
}
