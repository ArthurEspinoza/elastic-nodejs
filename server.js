const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const elasticRouter = require("./v1/routes/elasticRoutes");
const {swaggerDocs: v1SwaggerDocs} = require("./v1/swagger");

const app = express();


app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use("/api/v1", elasticRouter);

const port = process.env.PORT || 9000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
  v1SwaggerDocs(app, port)
})
