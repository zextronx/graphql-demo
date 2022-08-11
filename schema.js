const { buildSchema } = require('graphql');

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

module.exports = {
    schema
}