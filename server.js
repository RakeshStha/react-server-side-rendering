require("@babel/register")({
  presets: [
    "@babel/preset-env",
    ["@babel/preset-react", { runtime: "automatic" }],
  ],
  plugins: [["transform-assets"]],
});
const { StaticRouter } = require("react-router-dom/server");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const App = require("./src/App").default;
const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();

const router = express.Router();

// app.use('/build', express.static('build'));

app.use((req, res, next) => {
  if (/\.js|\.css/.test(req.path)) {
    res.redirect("/build+req.path");
  } else {
    next();
  }
});

app.get("*", (req, res, next) => {
  const context = {};
  const reactApp = ReactDOMServer.renderToString(
    <StaticRouter location={req.url} context={context}>
      <App />
    </StaticRouter>
  );
  const indexFile = path.resolve("build/index.html");
  fs.readFile(indexFile, "utf8", (err, data) => {
    if (err) {
      const errMsg = `There is an error: ${err}`;
      console.error(errMsg);
      return res.status(500).send(errMsg);
    }

    return res.send(
      data.replace('<div id="root"></div>', `<div id="root">${reactApp}</div>`)
    );
  });
});

router.use(express.static(path.resolve(__dirname, "../build")));

app.use(router);

app.listen(8080, () =>
  console.log("Express server is running on localhost:8080")
);
