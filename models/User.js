const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true, // 띄어쓰기 제거
        unique: 1 // 중복 방지
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number, // 1: 관리자
        default: 0 // 0: 기본값, 일반회원
    },
    image: String,
    token: { // 유효성 관리
        type: String
    },
    tokenExp: {
        type: Number
    }
})

userSchema.pre('save', function(next) {
    var user = this;
    if(user.isModified('password')) {

        // 비밀번호를 암호화 시킨다.
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if(err) return next(err)
            
            bcrypt.hash(user.password, salt, function(err, hash) {
                if(err) return next(err)
                user.password = hash
                next()
            })
        })
    }
})

const User = mongoose.model('User', userSchema)

module.exports = { User }