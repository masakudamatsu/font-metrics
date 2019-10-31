import {
  cleanup,
  fireEvent,
  render,
} from '@testing-library/react';
import getFontMetrics from './getFontMetrics';

describe('getFontMetrics', () => {

  afterEach(cleanup);

  describe('Extracts font metrics from a font file', () => {
    it('When the font file is Open Sans Regular', () => {

      const fontFilePath = '../../cypress/fixtures/OpenSans-Regular.ttf';

      const opentype = require('opentype.js');

      opentype.load(fontFilePath, function(err, font) {
        if (err) {
          console.log('Font could not be loaded: ' + err);
        } else {
          const fontMetrics = getFontMetrics(font);
          expect(fontMetrics.name).toBe('Open Sans Regular');
        }
      });

    });
  });
});
