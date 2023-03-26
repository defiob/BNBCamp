const fs = require('fs');

function storeAddress(content) {
    return new Promise((resolve, reject) => {
        fs.appendFile('address.txt', `${new Date().toLocaleString()} ${content}\n`, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

module.exports = {
    storeAddress,
}