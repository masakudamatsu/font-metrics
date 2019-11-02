import React from 'react';

export default class FontNameDisplay extends React.Component {
  render() {
    return (
      <div>
        <p data-testid="FontNameDisplay">
          {this.props.fontName}
        </p>
      </div>
    );
  }
}
