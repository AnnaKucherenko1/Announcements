import mongoose from "mongoose";

const CONNECTION_URI = 'mongodb://127.0.0.1:27017/assignment';

async function main() {
  await mongoose
    .connect(CONNECTION_URI)
    .then(() => console.log("connected to db 🟦"))
    .catch(err => console.log("Error connecting to DB : ", err));
}
main();

export default mongoose;
