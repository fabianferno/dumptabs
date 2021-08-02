import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { HarperDBProvider } from "use-harperdb";

ReactDOM.render(
  <React.StrictMode>
    <HarperDBProvider
      url="https://pattarai-fabianferno.harperdbcloud.com"
      user="fabianferno"
      password="KalEl@3155"
    >
      <App />
    </HarperDBProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
