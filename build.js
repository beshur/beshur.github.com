#!/usr/bin/env node
const fs = require('fs');
const marked = require('marked');

marked.setOptions({
  renderer: new marked.Renderer(),
  pedantic: false,
  gfm: true,
  breaks: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false
});

function convertText() {
  return new Promise((resolve, reject) => {

    fs.readFile('readme.md', 'utf8', function (err, data) {
      if (err) {
        console.error('Failed opening readme.md', err);
        return reject(err);
      }

      let converted = marked(data);
      console.log('converted', converted);

      resolve(converted);
    });

  });
}


function replaceInTpl(content) {
  fs.readFile('index.html.tpl', 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    const result = data.replace(/%%/g, content);
    console.log('HTML result', result)

    fs.writeFile('index.html', result, 'utf8', function (err) {
       if (err) return console.log(err);
       console.log('Written index.html');
    });
  });

}

convertText().then(replaceInTpl);
