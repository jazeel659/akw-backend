const app = require('./index.js');
const port = process.env.PORT || 7000;

app.listen(port, () => {
    console.log(`listening on port ${port}`);
  });
