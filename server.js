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
const { createStore } = require("redux");
const { Provider } = require("react-redux");
const rootReducer = require("./src/combineReducers/State.js");
const App = require("./src/App").default;
const express = require("express");
const path = require("path");
const fs = require("fs");
const compression = require('compression');

const app = express();

const router = express.Router();

// app.use('/build', express.static('build'));

// compress all responses
app.use(compression());

app.use((req, res, next) => {
  if (/\.js|\.css/.test(req.path)) {
    res.redirect("/build+req.path");
  } else {
    next();
  }
});

app.get("*", (req, res, next) => {
  const context = {};

  const store = createStore(rootReducer);

  const reactApp = ReactDOMServer.renderToString(
    <StaticRouter location={req.url} context={context}>
      <Provider store={store}>
        <App />
      </Provider>
    </StaticRouter>
  );
  // Grab the initial state from our Redux store
  const preloadedState = store.getState();

  const indexFile = path.resolve("build/index.html");
  fs.readFile(indexFile, "utf8", (err, data) => {
    if (err) {
      const errMsg = `There is an error: ${err}`;
      console.error(errMsg);
      return res.status(500).send(errMsg);
    }

    return res.send(
      data.replace(
        '<div id="root"></div>',
        `<div id="root">${reactApp}</div>`,
        preloadedState
      )
    );
  });
});

router.use(express.static(path.resolve(__dirname, "../build")));

app.use(router);

app.listen(8080, () =>
  console.log("Express server is running on localhost:8080")
);
