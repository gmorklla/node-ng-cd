var seven = require("node-7z");

const {
  ngPath,
  name
} = require("./config");

function ngZip() {
  const myStream = seven.add(name, ngPath + "/*", {
    recursive: true,
  });
  return myStream;
}

module.exports = ngZip;
