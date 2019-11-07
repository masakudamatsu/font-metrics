import React from 'react';

import FontFileUploader from './components/FontFileUploader';
import XheightBox from './components/XheightBox';
import FontSizeBox from './components/FontSizeBox';
import ModularScaleBoxes from './components/ModularScaleBoxes';
import LineHeightBox from './components/LineHeightBox';
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
      userXHeight: '',
      userScaleX: 1,
      userScaleLine: 3,
      userLineHeight: '',
      fontLoadFailure: false,
      xHeightScaleZero: false
    };
    this.fileChangeHandler = this.fileChangeHandler.bind(this);
    this.invalidFileHandler = this.invalidFileHandler.bind(this);
    this.xHeightToFontSize = this.xHeightToFontSize.bind(this);
    this.fontSizeToXHeight = this.fontSizeToXHeight.bind(this);
    this.xHeightScaleToLineHeight = this.xHeightScaleToLineHeight.bind(this);
    this.lineHeightScaleToLineHeight = this.lineHeightScaleToLineHeight.bind(this);
    this.getNewLineHeight = this.getNewLineHeight.bind(this);
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
        this.setState({
          fontLoadFailure: true
        });
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

  fontSizeToXHeight(fontSizeValue) {
    const newXHeight = ((this.state.sxHeight / this.state.unitsPerEm ) * fontSizeValue).toFixed(4);
    this.setState({
      userFontSize: fontSizeValue,
      userXHeight: newXHeight
    });
  }

  xHeightScaleToLineHeight(xHeightScale) {
    if (xHeightScale === '0') {
      this.setState({
        xHeightScaleZero: true
      });
    } else {
      this.setState({
        xHeightScaleZero: false
      });
      const newScale = this.state.userScaleLine / xHeightScale;
      const newLineHeightValue = this.getNewLineHeight(newScale);
      this.setState({
        userScaleX: xHeightScale,
        userLineHeight: newLineHeightValue
      });
    }
  }

  lineHeightScaleToLineHeight(lineHeightScale) {
    const newScale = lineHeightScale / this.state.userScaleX;
    const newLineHeightValue = this.getNewLineHeight(newScale);
    this.setState({
      userScaleLine: lineHeightScale,
      userLineHeight: newLineHeightValue
    });
  }

  getNewLineHeight(newScale) {
    const newLineHeightValueInPixels = newScale * this.state.userXHeight;
    return (newLineHeightValueInPixels / this.state.userFontSize).toFixed(4);
  }

  render() {
    return (
      <div className="App">
        <FontFileUploader
          onChange={this.fileChangeHandler}
          onChangeWithInvalidFile={this.invalidFileHandler} />
        <XheightBox
          xHeight={this.state.userXHeight}
          xHeightToFontSize={this.xHeightToFontSize} />
        <ModularScaleBoxes
          xHeightScale={this.state.userScaleX}
          lineHeightScale={this.state.userScaleLine}
          xHeightScaleToLineHeight={this.xHeightScaleToLineHeight}
          lineHeightScaleToLineHeight={this.lineHeightScaleToLineHeight} />
        <FontNameDisplay fontName={this.state.fullName} />
        <FontSizeBox
          fontSize={this.state.userFontSize}
          fontSizeToXHeight={this.fontSizeToXHeight} />
        <LineHeightBox
          lineHeight={this.state.userLineHeight} />
        <SampleParagraphs
          fontFamily={this.state.fontFamily}
          fontSize={this.state.userFontSize}
          fontWeight={this.state.usWeightClass}
          fontLoadFailure={this.state.fontLoadFailure}
          xHeightScaleZero={this.state.xHeightScaleZero} />
      </div>
    );
  }
}

export default App;
