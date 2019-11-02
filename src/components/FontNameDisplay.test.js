import React from 'react';
import {
  cleanup,
  render,
} from '@testing-library/react';
import FontNameDisplay from './FontNameDisplay';

describe('<FontNameDisplay />', () => {
  afterEach(cleanup);

  it('Displays this.props.fontName', () => {
    const inputText = 'Awesome Font';
    const expectedText = 'Awesome Font';

    const {getByTestId} = render(<FontNameDisplay fontName={inputText} />);

    expect(getByTestId('FontNameDisplay').textContent).toBe(expectedText);
  });
});
