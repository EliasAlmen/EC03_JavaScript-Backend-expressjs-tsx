const graphql = require('graphql')
const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLList,
    GraphQLSchema,
    GraphQLString
} = graphql

const ProductGraphQL = require('./mongoDB/mongo-productSchema')

const ProductType = new GraphQLObjectType({
    name: 'ProductGraphQL',
    fields: () => ({
        _id: { type: GraphQLID },
        name: { type: GraphQLString },
        price: { type: GraphQLString },
        rating: { type: GraphQLString },
        tag: { type: GraphQLString },
        category: { type: GraphQLString },
        description: { type: GraphQLString },
        imageName: { type: GraphQLString }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        productGraphQL: {
            type: ProductType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return ProductGraphQL.findById(args.id)
            }
        },
        productsGraphQL: {
            type: new GraphQLList(ProductType),
            resolve(parent, args) {
                return ProductGraphQL.find({})
            }
        },
        // Takes tag request!!!
        productTag: {
            type: new GraphQLList(ProductType),
            args: { tag: { type: GraphQLString } },
            resolve (parent, args, filter) {
                return ProductGraphQL.find(args)
            }
        }
    }
})

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addProduct: {
            type: ProductType,
            args: {
                name: { type: GraphQLString },
                price: { type: GraphQLString },
                rating: { type: GraphQLString },
                tag: { type: GraphQLString },
                category: { type: GraphQLString },
                description: { type: GraphQLString },
                imageName: { type: GraphQLString }
            },
            resolve(parent, args) {
                const productGraphQL = new ProductGraphQL({
                    name: args.name,
                    price: args.price,
                    rating: args.rating,
                    tag: args.tag,
                    category: args.category,
                    description: args.description,
                    imageName: args.imageName
                })
                return productGraphQL.save()
            }
        },
        //Delete!
        removeProduct: {
            type: ProductType,
            args: {
                id: { type: GraphQLID }
            },
            resolve(parent, args) {
                return ProductGraphQL.findByIdAndRemove(args.id)
            }
        },
        //Update!
        updateProduct: {
            type: ProductType,
            args: {
                id: { type: GraphQLID },
                name: { type: GraphQLString },
                price: { type: GraphQLString },
                rating: { type: GraphQLString },
                tag: { type: GraphQLString },
                category: { type: GraphQLString },
                description: { type: GraphQLString },
                imageName: { type: GraphQLString }
            },
            resolve(parent, args) {
                return ProductGraphQL.findByIdAndUpdate({ _id: args.id }, {
                    name: args.name,
                    price: args.price,
                    rating: args.rating,
                    tag: args.tag,
                    category: args.category,
                    description: args.description,
                    imageName: args.imageName
                }, { new: true })
            }
        }
    }
})




module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})