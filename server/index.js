import express from "express";
import cors from "cors";
import React from "react";
import { renderToNodeStream } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import fs from "fs";
import App from "../src/App";

// const express = require("express");
// const React = require("react");
// const { renderToNodeStream } = require("react-dom/server");
// const { StaticRouter } = require("react-router-dom");
// const fs = require("fs");
// const App = require("../src/App");

const PORT = process.env.PORT || 3000;
const html = fs.readFileSync("dist/index.html").toString();
const parts = html.split("not rendered");

const app = express();
app.use(cors());
app.use("/dist", express.static("dist"));
app.use((req, res) => {
  const context = {};
  res.write(parts[0]);
  const reactMarkup = (
    <StaticRouter location={req.url} context={context}>
      <App />
    </StaticRouter>
  );

  const stream = renderToNodeStream(reactMarkup);

  if (context.url) {
    res.writeHead(301, {
      Location: context.url,
    });
    res.end();
  } else {
    stream.pipe(res, { end: false });
    stream.on("end", () => {
      res.write(parts[1]);
      res.end();
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});
