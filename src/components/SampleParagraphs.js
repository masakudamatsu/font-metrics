import React from 'react';

// Set up typesetting parameters
const sampleParagraphs = 'different letter combinations, about what makes great typography great. It was beautiful, historical, artistically subtle in a way that science can’t capture, and I found it fascinating. None of this had even a hope of any practical application in my life. But 10 years later, when we were designing the first Macintosh computer, it all came back to me. And we designed it all into the Mac. It was the first computer with beautiful typography. If I had never ';


export default class SampleParagraphs extends React.Component {
  render() {
    const fontStyles = {
      fontFamily: this.props.fontFamily,
      fontWeight: this.props.fontWeight
    };
    return (
      <p data-testid="SampleParagraph"
         style={fontStyles}>
        {sampleParagraphs}
      </p>
    );
  }
};
