const express = require('express');
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');
const app = express();
const Mare = require('./models/mare');


app.use(bodyParser.json());



app.use('/graphql', graphqlHTTP({
    schema: buildSchema(`
        type Mare {
            _id: ID!
            name: String!
            age: Int!
            dueDate: String!
            location: String!
            camera: String!
            status: Boolean!
            foal: Boolean!
            logs: String
        }
        input MareInput {
            name: String!
            age: Int!
            dueDate: String!
            location: String!
            camera: String!
            status: Boolean!
            foal: Boolean!
            logs: String
        }
        type RootQuery {
            mares: [Mare!]!
        }

        type RootMutation {
            createMare(mareInput: MareInput): Mare
        }

        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),
    // Resolver
    rootValue: {
        mares: () => {
            return Mare.find()
                .then(mares => {
                    return mares.map(mare => {
                        return { ...mare._doc, _id: mare.id };
                    })
                })
                .catch(err => {
                    throw err;
            })
        },
        createMare: args => {
            const mare = new Mare({
                name: args.mareInput.name,
                age: +args.mareInput.age,
                dueDate: args.mareInput.dueDate,
                location: args.mareInput.location,
                camera: args.mareInput.camera,
                status: args.mareInput.status,
                foal: args.mareInput.foal,
                logs: args.mareInput.logs
            });
            return mare
                .save()
                .then(result => {
                    console.log(result);
                    return { ...result._doc }; 
                })
                .catch(err => {
                    console.log(err);
                    throw err;
                });
        }
    },
    graphiql: true
  })
);

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${
    process.env.MONGO_PASSWORD
    }@cluster0.kt9ff.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
).then(() => {
    app.listen(3000);
}).catch(err => {
    console.log(err);
});