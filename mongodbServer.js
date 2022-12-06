const mongoose = require('mongoose')
mongoose.set('strictQuery', true);
const mongodb = async () => {
    const connectionEC03 = await mongoose.connect(process.env.EC03mongodb_uri)
    console.log(`EC03mongodb running at ${connectionEC03.connection.host}`);
}

module.exports = mongodb