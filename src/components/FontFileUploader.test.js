import React from 'react';
import {
  cleanup,
  fireEvent,
  render,
} from '@testing-library/react';
import FontFileUploader from './FontFileUploader';

describe('<FontFileUploader />', () => {

  afterEach(cleanup);

  describe('Uploading a font file', () => {
    let fileChangeHandler;
    beforeEach(() => {
      fileChangeHandler = jest.fn();
      const {getByTestId} = render(<FontFileUploader onChange={fileChangeHandler}/>);

      const file = new File(['dummy data'], 'dummytypeface.ttf', {
        type: 'font/ttf',
      });

      const inputElement = getByTestId('FontFileUploader');

      Object.defineProperty(inputElement, 'files', {
        value: [file],
      });

      fireEvent.change(inputElement);

    });

    it('calls the file change handler', () => {

      expect(fileChangeHandler).toHaveBeenCalled();

    });
  });
});
