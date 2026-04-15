import { connect } from "mongoose";

const mongo_Url=process.env.MONGODB_URL
if (!mongo_Url) {
  throw new Error("MONGODB_URL is not defined");
}
// if(!mongo_Url){
//     console.log("mongodb url not found")
// }

let cache= global.mongoose
if(!cache){
    cache= global.mongoose={conn:null, promise:null}
}

const connectDb=async ()=>{
    if(cache.conn){
        console.log("🟢 Using existing DB connection");
        return cache.conn
    }

    if (!cache.promise) {
    console.log("🟡 Connecting to MongoDB...");

    cache.promise = connect(mongo_Url).then((c) => {
      console.log("✅ MongoDB Connected Successfully");
      return c.connection;
    });
  }
    // if(!cache.promise){
    //     cache.promise=connect(mongo_Url!).then((c)=>c.connection)
    // }


     try {
    cache.conn = await cache.promise;
  } catch (error) {
    cache.promise = null;
    console.error("❌ MongoDB Connection Failed:", error);
    throw error;
  }
    // try {
    //     cache.conn=await cache.promise
    // } catch (error) {
    //     cache.promise = null;
    //     throw error;
    //     // console.log(error)
    // }
    return cache.conn
}

export default connectDb