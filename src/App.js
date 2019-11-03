import React from 'react';
import FontFileUploader from './components/FontFileUploader';
// import readFontFile from './helper/readFontFile';
import getFontMetrics from './helper/getFontMetrics';
import FontNameDisplay from './components/FontNameDisplay';
const opentype = require('opentype.js');

// Set up the canvas
const canvasWidth = '800';
const canvasHeight = '1000';
const errorMessage = 'Your browser does not support the rendering of sample paragraphs in the uploaded font';

// Set up typesetting parameters
const sampleParagraph = 'different letter combinations, about what makes great typography great. It was beautiful, historical, artistically subtle in a way that science can’t capture, and I found it fascinating. None of this had even a hope of any practical application in my life. But 10 years later, when we were designing the first Macintosh computer, it all came back to me. And we designed it all into the Mac. It was the first computer with beautiful typography. If I had never ';
const measure = 400;
const lineHeight = 25;
const fontSize = 16; // in pixels

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
      // Display font name
      const fontNameObtained = getFontMetrics(font);
      this.setState({
        fontName: fontNameObtained
      });
      // Render paragraphs
      const canvas = this.refs.canvas;
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const x = 60;
      let y = 60;
      // Enable word wrap
      const words = sampleParagraph.split(' ');
      let line = '';
      let testLine, metrics, testWidth;
      for(let n = 0; n < words.length; n++) {
        testLine = line + words[n] + ' ';
        metrics = ctx.measureText(testLine);
        testWidth = metrics.width;
        if (testWidth > measure && n > 0) {
          font.draw(ctx, line, x, y, fontSize);
          line = words[n] + ' ';
          y += lineHeight;
        }
        else {
          line = testLine;
        }
      }
      font.draw(ctx, line, x, y, fontSize);
    }).bind(this);
    reader.readAsArrayBuffer(fontFile);
  }
  render() {
    return (
      <div className="App">
        <FontFileUploader onChange={this.fileChangeHandler}
        onChangeWithInvalidFile={this.invalidFileHandler} />
        <FontNameDisplay fontName={this.state.fontName} />
        <canvas
                ref="canvas"
                height={canvasHeight}
                width={canvasWidth} >
          {errorMessage}
        </canvas>
      </div>
    );
  }
}

export default App;
