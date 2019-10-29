import React from 'react';

export default class FontFileUploader extends React.Component {
  render() {
    return (
      <div>
        <input type="file"
               data-test="fontFileUploader" />
      </div>
    );
  }
}
