const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const app = require('./app');

// The replace is used for change variable password for content process.emv.DATABASE_PASSOWRD  
const DB = process.env.DATABASE.replace('<PASSWORD>',process.env.DATABASE_PASSWORD);

mongoose.connect(DB, {
  // .connect(process.env.DATABASE_LOCAL),{ Forma de conectar localmente na maquina
  useNewUrlParser: true,
  useCreateIndex:true,
  useUnifiedTopology: true,
  useFindAndModify: false
}).then(()=>{// con =>{console.log(con.connections); Show data default of connection with database!
  console.log('DB connection successful!');
});
// Connection on localhost access
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
