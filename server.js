const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const axios = require('axios');

const { schema } = require('./schema');

const fakeDB = {};
const anotherFakeDB = {};

const root = {
    hello: () => {
        return 'Hello world!'
    },
    numList: () => {
        return [1,2,3];
    },
    age: () => {
        return 28;
    },
    fullName: ({ firstName, lastName }) => {
        return `${firstName} ${lastName}`;
    },
    sendMessage: ({ msg }) => {
        fakeDB.msg = msg;
        return fakeDB.msg;
    },
    getMessage: () => fakeDB.msg,
    createMessage: ({msg}) => {
        let id = `${+new Date()}`;
        id = id.substring(id.length - 5);
        anotherFakeDB[id] = { ...msg, id }
        console.log('anotherFakeDB', anotherFakeDB)
        return anotherFakeDB[id];
    },
    updateMessage: ({id, msg}) => {
        if (anotherFakeDB[id]) {
            anotherFakeDB[id] = { ...msg, id };
            return anotherFakeDB[id];
        } else {
            return {};
        }
    },
    messages: (_, req) => {
        console.log('anotherFakeDB', anotherFakeDB, req)
        return anotherFakeDB;
    }
};

const app = express();

app.use('/graphql', graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true
}));

app.listen(8000);

console.log('Server started on port : 8000');
