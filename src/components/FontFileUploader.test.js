import React from 'react';
import {
  cleanup,
  fireEvent,
  render,
} from '@testing-library/react';
import FontFileUploader from './FontFileUploader';

describe('<FontFileUploader />', () => {

  afterEach(cleanup);

  let fileChangeHandler,
      invalidFileHandler,
      inputElement;
  beforeEach(() => {
    fileChangeHandler = jest.fn();
    invalidFileHandler = jest.fn();
    const {getByTestId} = render(<FontFileUploader
      onChange={fileChangeHandler}
      onChangeWithInvalidFile={invalidFileHandler}
    />);

    inputElement = getByTestId('FontFileUploader');
  });

  describe('Uploading a text file with a fake MIME type', () => {
    it('calls the file change hanlder for invalid files', () => {
      const textFile = new File(['dummy text'], 'dummytypeface.txt', {
        type: 'font/ttf',
      });
      Object.defineProperty(inputElement, 'files', {
        value: [textFile],
      });

      fireEvent.change(inputElement);

    });
  });

  describe('Uploading a font file', () => {
    it('calls the file change handler if it is a TTF file', () => {

      const ttfFile = new File(['dummy data'], 'dummytypeface.ttf', {
        type: 'font/ttf',
      });
      Object.defineProperty(inputElement, 'files', {
        value: [ttfFile],
      });

      fireEvent.change(inputElement);

      expect(fileChangeHandler).toHaveBeenCalled();
    });

    it('calls the file change handler if it is a OTF file', () => {

      const otfFile = new File(['dummy data'], 'dummytypeface.otf', {
        type: 'font/otf',
      });
      Object.defineProperty(inputElement, 'files', {
        value: [otfFile],
      });

      fireEvent.change(inputElement);

      expect(fileChangeHandler).toHaveBeenCalled();
    });

    it('calls the file change handler if it is a WOFF file', () => {

      const woffFile = new File(['dummy data'], 'dummytypeface.woff', {
        type: 'font/woff',
      });
      Object.defineProperty(inputElement, 'files', {
        value: [woffFile],
      });

      fireEvent.change(inputElement);

      expect(fileChangeHandler).toHaveBeenCalled();
    });

  });
});
