const getFontMetrics = (font) => {
  const fontMetrics = {};

  const namingTable = font.tables['name'];
  fontMetrics.fontName = namingTable['fullName'].en;

  const headTable = font.tables['head'];
  fontMetrics.unitsPerEm = headTable['unitsPerEm'];

  const os2Table = font.tables['os2'];
  fontMetrics.sxHeight = os2Table['sxHeight'];
  
  return fontMetrics;
};

export default getFontMetrics;
