import React from 'react';

import FontFileUploader from './components/FontFileUploader';
import XheightBox from './components/XheightBox';
import FontSizeBox from './components/FontSizeBox';
import FontNameDisplay from './components/FontNameDisplay';
import SampleParagraphs from './components/SampleParagraphs';

import getFontMetrics from './helper/getFontMetrics';
const opentype = require('opentype.js');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fontFamily: '',
      fullName: '',
      usWeightClass: '',
      sxHeight: '',
      unitsPerEm: '',
      userFontSize: '',
      userXHeight: ''
    };
    this.fileChangeHandler = this.fileChangeHandler.bind(this);
    this.invalidFileHandler = this.invalidFileHandler.bind(this);
    this.xHeightToFontSize = this.xHeightToFontSize.bind(this);
  }

  invalidFileHandler() {
    this.setState({
      fullName: 'Please upload an OpenType Font (.otf), TrueType Font (.ttf), or Web Open Font Format (.woff) file.'
    });
  }

  fileChangeHandler(fontFile) {
    // With font files uploaded
    const reader = new FileReader();
    reader.onload = (function(e) {
      const font = opentype.parse(e.target.result, {lowMemory:true});
      // Save font metrics as the state object
      const fontMetrics = getFontMetrics(font);
      this.setState({
        fontFamily: fontMetrics.fontFamily,
        fullName: fontMetrics.fullName,
        usWeightClass: fontMetrics.usWeightClass,
        sxHeight: fontMetrics.sxHeight,
        unitsPerEm: fontMetrics.unitsPerEm
      });
      // Load the uploaded font
      const newFontFace = new FontFace(this.state.fontFamily, e.target.result);
      newFontFace.load().then((loaded_face) => {
        document.fonts.add(loaded_face);
      }).catch((error) => {
        console.log('The uploaded font has failed to be loaded,');
      });
    }).bind(this);
    reader.readAsArrayBuffer(fontFile);
  }

  xHeightToFontSize(xHeightValue) {
    const newFontSize = ((this.state.unitsPerEm / this.state.sxHeight) * xHeightValue).toFixed(4);
    this.setState({
      userFontSize: newFontSize,
      userXHeight: xHeightValue
    });
  }

  render() {
    return (
      <div className="App">
        <FontFileUploader onChange={this.fileChangeHandler}
        onChangeWithInvalidFile={this.invalidFileHandler} />
        <XheightBox
          xHeight={this.state.userXHeight}
          xHeightToFontSize={this.xHeightToFontSize}/>
        <FontSizeBox
          fontSize={this.state.userFontSize}
        />
        <FontNameDisplay fontName={this.state.fullName} />
        <SampleParagraphs
          fontFamily={this.state.fontFamily}
          fontWeight={this.state.usWeightClass} />
      </div>
    );
  }
}

export default App;
