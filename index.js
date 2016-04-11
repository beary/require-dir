var fs = require('fs');
var path = require('path');
var tmp = {};

module.exports = (dir, thisDir) => {
  dir = path.isAbsolute(dir)?dir:path.join(thisDir, dir);
  if (tmp[dir] === undefined) {
    var moduleObj = {};
    var files = fs.readdirSync(dir);
    files.forEach(function(file) {
      if (file.endsWith('.js')) {
        var tmp = file.slice(0, -3).split(/\W/);
        tmp = tmp.shift() + tmp.map(function(i) {
          return i[0].toUpperCase() + i.substring(1)
        }).join('');
        moduleObj[tmp] = require(path.join(dir, file));
      }
    });
    tmp[dir] = moduleObj;
  }
  return tmp[dir];
};