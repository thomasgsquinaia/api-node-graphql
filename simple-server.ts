import { ApolloServer, gql } from "apollo-server";
import { randomUUID } from "node:crypto";

/**
 * Under fetching
 * HTTP route that returns less data
 * 
 * Over fetching
 * HTTP route returns more data than we need
 */

const typeDefs = gql`
type User { 
    id: String!,
    name: String!
}

type Query {
    users: [User!]!
}

type Mutation { 
    createUser(name: String!): User!
}
`
interface User { 
    id: string,
    name: string
}

const users: User[] = [];

const server = new ApolloServer({
    typeDefs,
    resolvers: {
        Query: {
            users: () => {
                return users;
            }
        },
        
        Mutation: {
            createUser: (_, args, ctx) => {
                const user = {
                    id: randomUUID(),
                    name: args.name
                }

                users.push(user)

                return user
            }
        }
    }
})

server.listen().then(({url}) => {
    console.log(`App is running in port ${url}`);
})

