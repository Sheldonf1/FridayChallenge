import * as mysql from "mysql";
const express = require("express");
const app = express();
const axios = require("axios");


const connect = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "Candice3+",
    database: "FridayChall",
});
connect.connect((err) => {
    if (err) {
        throw err;
    } else {
        console.log("connected to database :)");
    }
});
//---------------READ OPERATION-----------------//
//Displays all the customers: In this endpoint
app.get("/", (req: any, res: any) => {
    connect.query("SELECT * FROM customers", (error, results) => {
        if (error) {
            res.status(500).send({ message: "Error fetching customers" });
        } else {
            res.status(200).send(results);
        }
    });
});
//-----------------CREATE OPERATION----------------//
connect.query(
    "INSERT INTO customers (customerNumber, customerName, contactLastName, contactFirstName, phone, addressLine1, city, country) VALUES (497, 'Otaku!', 'Teasdale', 'Mariah', '123-456-7890', '123 R2H St.', 'Fort Mill', 'USA')",
    (error, results) => {
        if (error) {
            console.error(`Inserting Error: ${error.message}`);
        } else {
            console.log("Inserted successfully!");
        }
    }
);
//----------------UPDATE OPERATION--------------------//
connect.query(
    "UPDATE customers SET customerName = 'V2 Otaku!' WHERE customerNumber = 497",
    (error, results) => {
        if (error) {
            console.error(`Updating Error: ${error.message}`);
        } else {
            console.log("Updated successfully!");
        }
    }
);
//----------------DELETE----------------//
connect.query(
    "DELETE FROM customers WHERE customerName = 'V2 Otaku!' WHERE customerNumber = 497",
    (error, results) => {
        if (error) {
            console.error(`Error deleting record: ${error.message}`);
        } else {
            console.log("Record deleted successfully!");
        }
    }
);
app.listen(8000, () => {
    console.log("Server listening on port 8000");
});

