const mongoose=require('mongoose');
const  bcrypt=require('bcrypt');

// Define the User Schema
const userSchema = new mongoose.Schema(
  {
    // Define the 'username' field
    // 1) The data type of this field is a string
    // 2) This field is required
    // 3) Each username must be unique
    // Define the 'email' field
    // email
    // 1) The data type of this field is a string
    // 2) This field is required
    // 3) Each email must be unique
    // Define the 'password' field
    //  password
    // 1) The data type of this field is a string
    // 2) This field is required
    // 3) Password should be at least 8 characters long

    username:{
      type:String,
      unique:true,
      required:true
    },
    email:{
      type:String,
      unique:true,
      required:true
    },
    password:{
      type:String,
      required:true,
      validate(pass){
        if(pass.length<8){
          throw new Error('Password should have length greater than or equal to 8')
        }
      }
    }
  },
  { timestamps: true } // Automatically generate 'createdAt' and 'updatedAt' timestamps
);

// Pre-save hook to hash the user's password before saving it to the database
userSchema.pre('save', async function (next) {
  const user = this;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(user.password, salt);
  user.password = hashedPassword;
  next();
});

module.exports = mongoose.model('User', userSchema);
