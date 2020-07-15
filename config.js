var path = require("path");
const moment = require("moment");

const ngPath = path.join(
  process.cwd(),
  "../",
  "UF-V2/uf-ui-managment/dist/banorte"
);
const distPath = path.join(process.cwd(), "../", "banorte-versiones");
const date = moment().format("YYYYMMDD-kkmm");
const name = `../banorte-versiones/v2-${date}.zip`;

exports.ngPath = ngPath;
exports.distPath = distPath;
exports.name = name;
