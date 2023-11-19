import express from "express";
import cors from "cors";
import axios from "axios";
import csv from "csvtojson";
import { filterData } from "./utils.js";

const app = express();
const PORT = 3001;

app.use(cors());

app.get("/api/data", async (req, res) => {
  try {
    const csvFilePath =
      "https://docs.google.com/spreadsheets/d/1l7GstWHc69HPV0irSdvoMIyHgtufUPKsbtCiNw7IKR0/export?format=csv";

    const { data } = await axios(csvFilePath);

    csv()
      .fromString(data)
      .then((jsonObj) => {
        const filteredData = filterData(jsonObj, req.query);

        res.status(200).json({
          data: filteredData,
          count: filteredData?.length,
          status: 200,
        });
      });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
