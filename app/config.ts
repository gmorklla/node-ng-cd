import { join } from "path";
import moment from "moment";

export const ngPath = join(
  process.cwd(),
  "../",
  "UF-V2/uf-ui-managment/dist/banorte"
);
export const distPath = join(process.cwd(), "../", "banorte-versiones");
const date = moment().format("YYYYMMDD-kkmm");
export const name = `../banorte-versiones/v2-${date}.zip`;
