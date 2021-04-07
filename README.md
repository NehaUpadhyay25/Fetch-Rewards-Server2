# RESTful API built in Node and Express

Using the new Express 4.0 Router to build an API

## Requirements

- Node and npm

## Installation

- Clone the repo: `git clone `
- Install dependencies: `npm install`
- Start the server: `node server.js`

## Testing the API
Test your API using [Postman](https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop?hl=en)

### Add Transaction
- API <br> POST/ <localhost:8000/addtransaction>
- **Input** <br> 
  `{ "payer": "DANNON", "points": 1000, "timestamp": "2020-11-02T14:00:00Z" }` <br>
  `{ "payer": "UNILEVER", "points": 200, "timestamp": "2020-10-31T11:00:00Z" }`<br>
  `{ "payer": "DANNON", "points": -200, "timestamp": "2020-10-31T15:00:00Z" }` <br>
  `{ "payer": "MILLER COORS", "points": 10000, "timestamp": "2020-11-01T14:00:00Z" }`<br>
  `{ "payer": "DANNON", "points": 300, "timestamp": "2020-10-31T10:00:00Z" }`
  
- **Expected response** <br>
    ```
    {
       "status": "true",
       "response": "Transaction Successful"
    }

### Add Batch Transaction
- API <br> POST/ <localhost:8000/addtransaction/batch>
- **Input** <br> 
  ```
  {
  "transactions": [
      { "payer": "DANNON", "points": 1000, "timestamp": "2020-11-02T14:00:00Z" },
      { "payer": "UNILEVER", "points": 200, "timestamp": "2020-10-31T11:00:00Z" },
      { "payer": "DANNON", "points": -200, "timestamp": "2020-10-31T15:00:00Z" },
      { "payer": "MILLER COORS", "points": 10000, "timestamp": "2020-11-01T14:00:00Z" },
      { "payer": "DANNON", "points": 300, "timestamp": "2020-10-31T10:00:00Z" }
  ]}
  
- **Expected response** <br>
    ```
    {
        "status": "true",
        "response": "Transaction Successful"
    }

### Get Balance
- API <br> GET/ <localhost:8000/balance>

- **Expected response** <br>
   ```
   {
       "status": "true",
       "response": {
           "UNILEVER": 200,
           "DANNON": 1100,
           "MILLER COORS": 10000
       }
   }

### Redeem Points
- API <br> POST/ <localhost:8000/redeem>
- **Input** <br>
  `{"points": 5000}` <br>
  
- **Expected response** <br>
    ```
    {
        "status": "true",
        "response": [
            {
                "payer": "DANNON",
                "points": -100
            },
            {
                "payer": "UNILEVER",
                "points": -200
            },
            {
                "payer": "MILLER COORS",
                "points": -4700
            }
        ]
    }
 