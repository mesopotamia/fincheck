import {executeActions, replaceValuesInActions} from "./helpers/actions";
import {init} from "./index";
import {extract} from "./helpers/extraction";
import cibcConfig, {transactionsConfig} from "../src/institutions/cibc/actions.config";
const express = require('express');
const graphqlHTTP = require('express-graphql');
const {buildSchema} = require('graphql');

const schema = buildSchema(`
    type Financial {
        summary: Summary,
        detail: Summary,
        transactions: [String]
    }
    type Summary {
        liabilities: String!,
        assets: String!
    }
    input Action {
        type: String,
        url: String,
        selector: String
    }
    input Extractor {
        selector: String,
        propName: String
    }
    input User {
        name: String
    }
    type Query {
        execute(actions: [Action], extractors: [Extractor]): String,
        cibc(username: String, password: String): Financial
    }
`);

const root = {
    execute: async (args) => {
        const {actions, extractors} = args;
        const page = await init(false);
        await executeActions(page, actions);
        const extraction = await extract(page, extractors);
        return extraction['header'];
    },
    cibc: ({username, password}) => ({
        summary: async () => {
            const {actions, extractor} = cibcConfig;
            const actionsWithCredentials = replaceValuesInActions(actions, {username, password});
            const page = await init(false);
            await executeActions(page, actionsWithCredentials);
            return await extract(page, extractor);
        },
        transactions: async () => {
            const {actions, extractor} = transactionsConfig;
            const actionsWithCredentials = replaceValuesInActions(actions, {username, password});
            const page = await init(false);
            await executeActions(page, actionsWithCredentials);
            const results =  await extract(page, extractor);
            return results['transactions'];
        },
        detail: async () => {
            const {actions, extractor} = cibcConfig;
            const actionsWithCredentials = replaceValuesInActions(actions, {username, password});
            const page = await init(false);
            await executeActions(page, actionsWithCredentials);
            return await extract(page, extractor);
        }
    })
};

const app = express();
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));
app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));