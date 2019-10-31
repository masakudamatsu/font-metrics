const getFontMetrics = (font) => {
  try {
    const opentype = require('opentype.js');
    if (!font.tables) {
      throw Error('The font.tables property does not exist.')
    }
    const namingTable = font.tables[name];
    const fontName = namingTable[fullName];
    return fontName;

  } catch(err) {
    console.log(err);
  }
};

export default getFontMetrics;
