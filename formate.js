const fs = require('fs');
const path = require('path');

const findMdFilePath = (filePath, res) => {
  const files = fs.readdirSync(filePath);
  files.forEach(item => {
    const stat = fs.statSync(path.join(filePath, item));
    if (stat.isDirectory() && !/\.git/.test(item)) {
      findMdFilePath(path.join(filePath, item), res);
    } else {
      if (item.endsWith('\.md')) {
        res.push(path.join(filePath, item));
      }
    }
  });
};

const files = [];
findMdFilePath(process.cwd(), files);

const addSpace = (files) => {
  files.forEach((file, i) => {
    const res = fs.readFileSync(file, 'utf8');
    const fileStr = res.toString().split('\r').map(item => {
      const isTitle = item.trim().startsWith('#');
      return isTitle ? item.trim() : ('\n\n' + item);
    });
    fs.writeFileSync(file, fileStr.join(''), 'utf8');
  });

}

addSpace(files);