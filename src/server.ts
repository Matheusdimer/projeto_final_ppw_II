import express, {json} from "express";
import cors from "cors";
import routes from "./routes";

const PORT = process.env.PORT || 8090;
const app = express();

app.use(cors());
app.use(json());

app.use('/api', routes);

app.listen(PORT, () => console.log(`Application listening on port ${PORT}.`));