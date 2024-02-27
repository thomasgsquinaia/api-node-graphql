const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const { GraphQLObjectType, GraphQLString, GraphQLInt,GraphQLNonNull, GraphQLList, GraphQLSchema  } = require("graphql")
const app = express()
const PORT = 3001

const Owners = [
    {id: 1, name:'Joe Cash'},
    {id: 2, name:'Marie Risk'},
    {id: 3, name:'Kai Wolf'},
]

const Websites = [
    {id: '1', name: 'Facebook', ownerId: 1},
    {id: '2', name: 'Github', ownerId: 2},
    {id: '3', name: 'Google', ownerId: 3},
    {id: '4', name: 'Instagram', ownerId: 3}
]

const WebsiteType = new GraphQLObjectType({
    name: "Website",
    description: 'This represents a website made by a Owner(Programmer)',
    fields: () =>  ({
        id: { type: new GraphQLNonNull(GraphQLInt)},
        name: { type: new GraphQLNonNull(GraphQLString)},
        ownerId: { type: new GraphQLNonNull(GraphQLInt)}
    })
})

const OwnerType = new GraphQLObjectType({
    name: "Owner",
    description: 'This represents a Owner',
    fields: () =>  ({
        id: { type:new GraphQLNonNull(GraphQLInt)},
        name: { type:new GraphQLNonNull(GraphQLString)}
    })
})

const RootQueryType = new GraphQLObjectType({
    name: "Query",
    description: 'Root Query',
    fields: () =>  ({
        websites: {
            type: new GraphQLList(WebsiteType),
            description: 'List of All Websites',
            resolve: () => Websites
        },
        owners: {
            type: new GraphQLList(OwnerType),
            description: 'List of All Owners',
            resolve: () => Owners
        },
    })
})

const schema =  new GraphQLSchema({
    query: RootQueryType
})

app.use('/graphql', graphqlHTTP({
    graphiql: true,
    schema: schema
}))

app.listen(PORT, () => {
    console.log(`App is running in port ${PORT}`);
})