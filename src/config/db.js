
import mongoose from "mongoose";


async function connectionDB(url){
    return mongoose.connect(url)
        .then(()=> console.log("MongoDB Connected"))
        .catch(err => console.log("Connection Failed due to ",err));
}

export default connectionDB