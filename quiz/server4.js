const express = require('express');
const app = express();
const cors = require('cors');
const readUsersRouter = require('./readUsers');
const writeUsersRouter = require('./writeUsers');
const port = 8000;

app.use(cors({origin: 'http://localhost:3000'}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/read', readUsersRouter);
app.use('/write', writeUsersRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
