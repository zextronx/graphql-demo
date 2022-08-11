const express = require('express');
const { buildSchema } = require('graphql');
const { graphqlHTTP } = require('express-graphql');

const fakeDB = {};
const anotherFakeDB = {};

const schema = buildSchema(`
    type Message {
        id: ID!
        message: String
        user: String
    }

    type Query {
        hello: String
        numList: [Int]
        age: Int!
        fullName(firstName: String!, lastName: String): String!
        getMessage: String
        messages: Message
    }

    input MessageInput {
        message: String
        user: String
    }

    type Mutation {
        createMessage(msg: MessageInput): Message
        updateMessage(id: ID!, msg: MessageInput): Message
        sendMessage(msg: String): String
    }
`);

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
