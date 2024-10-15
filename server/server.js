const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = 'mongodb+srv://itsaini9720:FbjP4fvsPls15psT@cluster0.ac8r5rp.mongodb.net/tutor?retryWrites=true&w=majority&appName=Cluster0'
  //    .replace(
  //   '<PASSWORD>',
  //   process.env.DATABASE_PASSWORD
  // );
  
  mongoose.connect(DB, {
      useNewUrlParser: true,
      //  useCreateIndex: true,
      //  useFindAndModify: false
    })
    .then(() => console.log('DB connection successful..'));
    // mongoose.connection.once('open', async () => {
    //   try {
    //     const result = await mongoose.connection.db.collection('tutors').dropIndex('userId_1');
    //     console.log('Index dropped:', result);
    //   } catch (err) {
    //     console.error('Error dropping index:', err);
    //   } finally {
    //     mongoose.connection.close();
    //   }
    // });
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
// FbjP4fvsPls15psT
// mongodb+srv://itsaini9720:FbjP4fvsPls15psT@cluster0.ac8r5rp.mongodb.net/
