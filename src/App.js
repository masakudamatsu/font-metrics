import React from 'react';
import FontFileUploader from './components/FontFileUploader';
// import readFontFile from './helper/readFontFile';
import getFontMetrics from './helper/getFontMetrics';
import FontNameDisplay from './components/FontNameDisplay';
const opentype = require('opentype.js');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { fontName: ''};
    this.fileChangeHandler = this.fileChangeHandler.bind(this);
    this.invalidFileHandler = this.invalidFileHandler.bind(this);
  }
  invalidFileHandler() {
    this.setState({
      fontName: 'Please upload an OpenType Font (.otf), TrueType Font (.ttf), or Web Open Font Format (.woff) file.'
    });
  }
  fileChangeHandler(fontFile) {
    // With font files uploaded
    const reader = new FileReader();
    reader.onload = (function(e) {
      const font = opentype.parse(e.target.result, {lowMemory:true});
      const fontNameObtained = getFontMetrics(font);
      this.setState({
        fontName: fontNameObtained
      });
    }).bind(this);
    reader.readAsArrayBuffer(fontFile);
  }
  render() {
    return (
      <div className="App">
        <FontFileUploader onChange={this.fileChangeHandler}
        onChangeWithInvalidFile={this.invalidFileHandler} />
        <FontNameDisplay fontName={this.state.fontName} />
      </div>
    );
  }
}

export default App;
