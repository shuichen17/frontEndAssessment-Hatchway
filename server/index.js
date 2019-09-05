const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());








var port = 3000;
app.listen(port, function() {
    console.log(`Listening on port ${port}`);
})