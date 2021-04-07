const express = require("express");
const Utils = require("./utils.js")
const app = express();
app.use(express.json());

let utils = new Utils();

// GET Call for the balance
app.get("/balance", (req, res) => {
    return res.status(200).send({
        status: "true",
        response: utils.getBalance(),
    });
});

// POST Call for transaction
app.post("/addtransaction", (req, res) => {

    if (!req.body.payer || !req.body.points || !req.body.timestamp == null) {
        return res.status(400).send({
            status: "failed",
            message: "Payer, Points or Timestamp is missing",
        });
    }

    if (!utils.validateInputString(req.body.payer) || !utils.validateInputString(req.body.timestamp) || !Number.isInteger(req.body.points)){
        return res.status(400).send({
            status: "failed",
            message: "Payer, Points or Timestamp is of wrong datatype",
        });
    }

    let response = utils.addTransaction(req.body);

    return res.status(200).send({
        status: "true",
        response: response
    });
});

// POST Call for batch transaction
app.post("/addtransaction/batch", (req, res) => {

    if (!Array.isArray(req.body.transactions) || !req.body.transactions.length) {
        return res.status(400).send({
            status: "failed",
            message: "Invalid Input",
        });
    }

    try {
        let response = utils.addBatchTransactions(req.body.transactions);
        return res.status(200).send({
            status: "true",
            response: response
        });
    } catch (e) {
        return res.status(400).send({
                status: "failed",
                message: "Invalid Input",
            });
    }


});

// POST Call for redeem points
app.post("/redeem", (req, res) => {

    if (!req.body.points) {
        return res.status(400).send({
            status: "failed",
            message: "Points is missing",
        });
    }

    if (!(Number.isInteger(req.body.points))) {
        return res.status(400).send({
            status: "failed",
            message: "Points is of wrong datatype",
        });
    }

    let response = utils.redeemPoints(req.body.points)

    return res.status(200).send({
        status: "true",
        response: response.length === 0? "No points left to redeem": response,

    });
});

app.listen(8000, () => {
    console.log("server listening on port 8000!");
});
