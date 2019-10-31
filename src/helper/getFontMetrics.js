const getFontMetrics = (font) => {
  try {
    const namingTable = font.tables['name'];
    const fontName = namingTable['fullName'].en;
    return fontName;
  } catch(err) {
    console.log(err);
  }
};

export default getFontMetrics;
