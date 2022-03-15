const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

userSchema.pre('save', function (next) {
    const user = this;
    if (!user.isModified('password')) {
        console.log('password not modified')
        return next();
    }
    const saltRounds = 10;
    bcrypt.genSalt(saltRounds, function (err, salt) {
        if (err) {
            console.log(err)
            return next(err)
        }
        bcrypt.hash(user.password, salt, function (err, hash) {
            // Store hash in your password DB.
            if (err) return next(err)
            user.password = hash;
            next()
        });
    });
})

userSchema.methods.comparepassword = function(candidatePassword) {
    const user=this;
    return new Promise((resolve, reject) => {
        // Load hash from your password DB.
        bcrypt.compare(candidatePassword, user.password, function (err, isMatch) {
            if(err) return reject(err)
            if(!isMatch) return reject(false)
            resolve(true)
        });
    })
}

mongoose.model('User', userSchema)

