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
const compression = require('compression');
// const Helmet = require('react-helmet')
const { HelmetProvider, Helmet } = require('react-helmet-async')

const app = express();

const router = express.Router();

// app.use('/build', express.static('build'));

// compress all responses
app.use(compression());

app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));

// app.use((req, res, next) => {
//   if (/\.js|\.css/.test(req.path)) {
//     res.redirect("/build+req.path");
//   } else {
//     next();
//   }
// });

app.get("*", (req, res, next) => {
  const context = {};

  const store = createStore(rootReducer);
  const helmetContext ={}

  const reactApp = ReactDOMServer.renderToString(
    <StaticRouter location={req.url} context={context}>
      <Provider store={store}>
             <HelmetProvider context={helmetContext}>
          <App />
          </HelmetProvider>
      </Provider>
    </StaticRouter>
  );
  // Grab the initial state from our Redux store
  const preloadedState = store.getState();
  //  const helmet = Helmet.renderStatic()

    // Extract the head tags
  const { helmet } = helmetContext;
  const headTags = helmet && helmet.title.toString() + helmet.meta.toString() + helmet.link.toString();


  const indexFile = path.resolve("build/index.html");
  fs.readFile(indexFile, "utf8", (err, data) => {

    console.log("@data", err, data)
    if (err !== null) {
      const errMsg = `There is an error: ${err}`;
      console.error(errMsg);
      return res.status(500).send(errMsg.toString());
    }
        //   .replace("</head>", `${helmet.meta.toString()}</head>`)
        // .replace("</head>", `${helmet.title.toString()}</head>`)
        // .replace("</head>", `${helmet.script.toString()}</head>`)

    return res.send(
      data.replace(
        '<div id="root"></div>',
        `<div id="root">${reactApp}</div><script language="javascript" src="js/bootstrap.min.js"></script>
<link rel="stylesheet" href="css/bootstrap.min.css"/>`)
          .replace("</head>", `${headTags}</head>`)
    );
  });
});

router.use(express.static(path.resolve(__dirname, "../build")));

app.use(router);

app.listen(8080, () =>
  console.log("Express server is running on localhost:8080")
);
