import * as express from "express";
import * as React from "react";
import { renderToString } from "react-dom/server";
import { Container } from "../client/client";

const server = express();

server.get('/', function (req, res) {
    const title = 'test';
    const body = renderToString(React.createElement(Container));

    console.log('body', body);

    res.send(`
<!DOCTYPE html>
<html>
    <head>
    <title>${title}</title>
    <link rel="stylesheet" href="/assets/index.css" />
    </head>

    <body>
    <div id="root">${body}</div>
    </body>

    <script src="/assets/bundle.js"></script>
</html>`);
});

server.listen(19193)