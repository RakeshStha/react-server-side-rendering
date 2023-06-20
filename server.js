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
const rootReducer = require("./src/combineReducers/State").default;
const App = require("./src/App").default;
const express = require("express");
const path = require("path");
const fs = require("fs");
const compression = require("compression");
const { HelmetProvider } = require("react-helmet-async");

const app = express();

const router = express.Router();

// compress all responses
app.use(compression());

// Serve static files from the "build" folder
app.use(express.static(path.join(__dirname, "build")));

// Serve the static files from the "build/static" folder
app.use(express.static(path.join(__dirname, "./build", "static")));

app.get("*", (req, res, next) => {
  const context = {};

  const store = createStore(rootReducer);
  const helmetContext = {};

  const reactApp = ReactDOMServer.renderToString(
    <HelmetProvider context={helmetContext}>
      <StaticRouter location={req.url} context={context}>
        <Provider store={store}>
          <App />
        </Provider>
      </StaticRouter>
    </HelmetProvider>
  );
  // Grab the initial state from our Redux store
  const preloadedState = JSON.stringify(store.getState()).replace(
    /</g,
    "\\u003c"
  );

  // Extract the head tags
  const { helmet } = helmetContext;
  // const headTags = helmet && helmet.title.toString() + helmet.meta.toString() + helmet.link.toString();

  const indexFile = path.resolve("build/index.html");

  if (context.url) {
    // If the server-side rendering resulted in a redirect
    res.redirect(301, context.url);
  } else {
    fs.readFile(indexFile, "utf8", (err, data) => {
      if (err !== null) {
        const errMsg = `There is an error: ${err}`;
        console.error(errMsg);
        return res.status(500).send(errMsg.toString());
      }

      const replaceData = data
        .replace(
          '<div id="root"></div>',
          `<div id="root">${reactApp}</div>
                <script>window.PRELOADED_STATE = ${preloadedState}</script>`
        )
        .replace("</head>", `${helmet.meta.toString()}</head>`)
        .replace("</head>", `${helmet.title.toString()}</head>`)
        .replace("</head>", `${helmet.script.toString()}</head>`);

      //to fetch normal html documents
      //   const htmlFormat = `<!DOCTYPE html>
      //   <html>
      //   <head>
      //     ${helmet.title.toString()}
      //     ${helmet.meta.toString()}
      //     ${helmet.script.toString()}
      //   </head>
      //   <body>
      //     <div id="root">${reactApp}</div>
      //     <script>window.PRELOADED_STATE = ${preloadedState}</script>
      //   </body>
      // </html>`;

      return res.send(replaceData);
    });
  }
});

// Catch all route for SSR
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

app.use(router);
//

app.listen(8080, () =>
  console.log("Express server is running on localhost:8080")
);
