import React from 'react';

export default class ModularScaleBoxes extends React.Component {
  constructor(props) {
    super(props);
    this.handleChangeX = this.handleChangeX.bind(this);
    this.handleChangeLine = this.handleChangeLine.bind(this);
  }
  handleChangeX(event) {
    const xHeightScale = event.target.value;
    this.props.xHeightScaleToLineHeight(xHeightScale);
  }
  handleChangeLine(event) {
    const lineHeightScale = event.target.value;
    this.props.lineHeightScaleToLineHeight(lineHeightScale);
  }
  render() {
    return (
      <div>
        <label htmlFor="x-height-scale">
          x-height
        </label>
        <input type="number"
               id="x-height-scale"
               data-testid="ScaleBoxX"
               onChange={this.handleChangeX}
               value={this.props.xHeightScale}
        />
        <label htmlFor="line-height-scale">
          Line-height
        </label>
        <input type="number"
               id="line-height-scale"
               data-testid="ScaleBoxLine"
               onChange={this.handleChangeLine}
               value={this.props.lineHeightScale}
        />
      </div>
    );
  }
}
