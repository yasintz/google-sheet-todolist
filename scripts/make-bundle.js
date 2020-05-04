const fs = require('fs');
const clipboardy = require('clipboardy');
const path = require('path');

const makePrefix = (prefix) => '/* ##' + prefix + '## */';

const sources = {
  eventbus: path.join(process.cwd(), 'editor', 'eventbus.js'),
  bundle: path.join(process.cwd(), 'editor', 'bundle.js'),
};

const editorContent = fs.readFileSync(
  path.join(process.cwd(), 'editor', 'index.js'),
  'utf-8'
);

let newBundle = editorContent;
Object.entries(sources).forEach(([key, value]) => {
  newBundle = newBundle.replace(
    makePrefix(key.toUpperCase()),
    fs.readFileSync(value, 'utf-8')
  );
});

fs.writeFileSync(path.join(process.cwd(), 'bundle.js'), newBundle);

clipboardy.writeSync(newBundle);

console.log('Coppied');
