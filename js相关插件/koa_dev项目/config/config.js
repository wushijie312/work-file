const Client = require("mysql-pro");
const client = new Client({     
    mysql: {
          user: 'root',
          password: 'root',
          database: 'nodesql',
          host: '127.0.0.1',
    }
}); 

module.exports = client;