import React from 'react';
import FontFileUploader from './components/FontFileUploader';
// import readFontFile from './helper/readFontFile';
import getFontMetrics from './helper/getFontMetrics';
import FontNameDisplay from './components/FontNameDisplay';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { fontName: ''};
    this.fileChangeHandler = this.fileChangeHandler.bind(this);
  }
  fileChangeHandler(files) {
    let fontNameObtained;
    const fontFile = files[0];
    const opentype = require('opentype.js');
    const reader = new FileReader();
    reader.onload = (function(e) {
      const font = opentype.parse(e.target.result, {lowMemory:true});
      fontNameObtained = getFontMetrics(font);
      this.setState({
        fontName: fontNameObtained
      });
    }).bind(this);
    reader.readAsArrayBuffer(fontFile);
  }
  render() {
    return (
      <div className="App">
        <FontFileUploader onChange={this.fileChangeHandler} />
        <FontNameDisplay fontName={this.state.fontName} />
      </div>
    );
  }
}

export default App;
