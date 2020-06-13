// see src/components/ThreadsOverview.jsx
// modify /node_modules/draft-js-emoji-plugin/lib/index.js to return theme

const fs = require('fs');
fs.readFile('./node_modules/draft-js-emoji-plugin/lib/index.js', {encoding: 'utf-8'}, (error, data) => {
  if(error) {
    console.error(error);
  }
  else {
    const lines = data.split('\n');
    lines[lines.length - 3] += ',';
    lines.splice(lines.length - 2, 0, 'theme');
    fs.writeFile('./node_modules/draft-js-emoji-plugin/lib/index.js', lines.join('\n'), (error) => {
      if(error) {
        console.error(error);
      }
      else {
        console.log("Successfully modified", "./node_modules/draft-js-emoji-plugin/lib/index.js");
      }
    });
  }
});
