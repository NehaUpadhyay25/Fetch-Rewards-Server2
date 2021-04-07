/**
 * The Utils class implements utility functions to add transaction, redeem points, and get balance.
 * @author Neha Upadhyay
 */
class Utils {
    transactions = []
    balance = {}
    pointsAvailable = 0

    executeSingleTransaction(single_transaction) {
        try{
            this.transactions.push({
                payer: single_transaction.payer,
                points: single_transaction.points,
                timestamp: Date.parse(single_transaction.timestamp)
            })
            this.pointsAvailable += single_transaction.points
        }catch (error){
            console.log(error)
        }

        // maintain the balance database
        this.balance[single_transaction.payer] = single_transaction.payer in this.balance ?
            (this.balance[single_transaction.payer] + single_transaction.points) :
            single_transaction.points
    }

    addTransaction (single_transaction) {

        this.executeSingleTransaction(single_transaction)

        //sort the transaction data for faster redeem
        this.transactions.sort((a,b)=> {
            return a.timestamp - b.timestamp
        })

        return "Transaction executed successfully";
    }

    addBatchTransactions(batch_transactions) {

        for (let i = 0; i < batch_transactions.length; i++) {
            console.log(batch_transactions[i])
            this.executeSingleTransaction(batch_transactions[i])
        }

        //sort the transaction data for faster redeem
        this.transactions.sort((a,b)=> {
            return a.timestamp - b.timestamp
        })

        return "Transaction Successful";
    }

    validateInputString(myVar){
        return (typeof myVar === 'string' || myVar instanceof String || myVar !== "");
    }

    isJson(item) {

        item = typeof item !== "string" ? JSON.stringify(item) : item;
        try {
            item = JSON.parse(item);
        } catch (e) {
            console.log("parseError")
            return false;
        }

        return (typeof item === "object" && item !== null)
    }

    getBalance() {
        return this.balance;
    }

    redeemPoints (points) {
        let redeem_response = {}

        if (points > this.pointsAvailable || points < 0){
            return "Not sufficient points to redeem or points provided is negative"
        }

        for (let i=0; i< this.transactions.length; i++) {
            if (points === 0)
                break;
            if (this.transactions[i].points === 0)
                continue

            if (points >= this.transactions[i].points) {
                points -= this.transactions[i].points
                this.balance[this.transactions[i].payer] -= this.transactions[i].points
                this.pointsAvailable -= this.transactions[i].points
                if (this.transactions[i].payer in redeem_response) {
                    redeem_response[this.transactions[i].payer] -= this.transactions[i].points
                } else {
                    redeem_response[this.transactions[i].payer] = -this.transactions[i].points
                }
                this.transactions[i].points = 0
            } else {
                this.transactions[i].points -= points
                this.balance[this.transactions[i].payer] -= points
                this.pointsAvailable -= points
                if (this.transactions[i].payer in redeem_response) {
                    redeem_response[this.transactions[i].payer] -= points
                } else {
                    redeem_response[this.transactions[i].payer] = -points
                }
                points = 0
            }
        }

        //populate the response into an acceptable format
        let response = []
        for (let key in redeem_response){
            response.push({
                payer: key,
                points: redeem_response[key]
            })
        }

        this.clearTransactionRecords()

        return response;
    }

    clearTransactionRecords() {
        return this.transactions.filter(ts => {
            return ts.points !== 0
        })
    }
}

module.exports = Utils
