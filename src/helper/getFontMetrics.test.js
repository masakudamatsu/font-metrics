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
      // Setup
      const fontFilePath = '../../cypress/fixtures/OpenSans-Regular.ttf';

      const opentype = require('opentype.js');

      opentype.load(fontFilePath, function(err, font) {
        if (err) {
          console.log('Font could not be loaded: ' + err);
        } else {

          // Execute
          const fontMetrics = getFontMetrics(font);

          // Verify
          expect(fontMetrics.name).toBe('Open Sans Regular');
        }
      });

    });
  });
});
