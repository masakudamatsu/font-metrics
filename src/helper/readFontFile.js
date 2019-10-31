const readFontFile = (fontFile) => {
  try {
    const opentype = require('opentype.js');
    const reader = new FileReader();
    reader.onload = function(e) {
      const font = opentype.parse(e.target.result, {lowMemory:true});
      return font;
    };
    reader.readAsArrayBuffer(fontFile);
  } catch(err) {
    console.log(err);
  }
};

export default readFontFile;
