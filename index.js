/*import statment*/
import express from "express";
import dotenv from "dotenv";
import { CityService, AQIService } from "./service.js";
import { CommonresponseSender, ErrorHandling } from "./middleware.js";

/*dotenv config call*/
dotenv.config();
/*importing enviorment variable from .env*/
const PORT = process.env.PORT;

/**construction app object */
const app = express();
/**Top level middleware calling */
app.use(express.json());

/**Object intialization */
const cityservice = new CityService();
const aqiService = new AQIService();

app.get("/airIndex/:pincode/:pollutent", async (req, res, next) => {
  console.log("/airIndex/:pincode/:pollutent");
  const { pincode, pollutent } = req.params;
  const city = await cityservice.getCity(pincode, next);
  const data = await aqiService.getPollutentData(city, pollutent, next);
  res.send(data);
});

app.get("/airIndex/:pincode", async (req, res, next) => {
  const { pincode } = req.params;
  const city = await cityservice.getCity(pincode, next);
  const data = await aqiService.getAqiDate(city, next);
  debugger;
  req.responseData = data;
  next();
});

/*Attach common reponse sender and error handling middleware */

app.use(CommonresponseSender);
app.use(ErrorHandling);
/**start server to listen to @PORT */
app.listen(PORT, () => {
  console.log(`server listingn on PORT : ${PORT}`);
});
