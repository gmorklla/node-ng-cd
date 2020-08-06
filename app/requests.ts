import { createReadStream } from "fs";
import { join } from "path";
import axios, { AxiosRequestConfig } from "axios";
import FormData from "form-data";

import { distPath } from "./config";

const filePath = join(distPath, "v2.zip");
const file = createReadStream(filePath);
const form = new FormData();
form.append("file", file);

export const upload = axios.post(
  "http://lnxsapl1d.dev.unix.banorte.com:9080/wconfig-services/version/uploadZip/editor/version/2",
  form,
  { headers: form.getHeaders() }
);

export const filesystems = axios.get(
  "http://lnxsapl1d.dev.unix.banorte.com:9080/uf-ui-editor/load/AA6D19B34D7E1C46E053231A800FF083/v/2"
);

export const refresh = axios.get(
  "http://lnxsapl1d.dev.unix.banorte.com:9080/uf-ui-editor/refreshall"
);
