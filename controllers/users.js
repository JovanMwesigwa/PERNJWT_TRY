const bcrypt = require('bcrypt');
const db = require('../db.js');
const genJwtToken = require('../utils/tokenGenerator.js');

const getUsers = async(req, res) => {
    try {
        const results = await db.query("SELECT * FROM account;");

        res.status(200).json({
            status: "success",
            count: results.rowCount,
            data: results.rows
        })
    } catch (error) {
        console.error(error.message)
        res.status(404).json({ message: error.message })
    }
}

const registerUser = async(req, res) => {
    try {
        // 1. spread the data
        const { username, email, password } = req.body;
        
        // 2. Check if user exists
        const user = await db.query("SELECT * FROM account WHERE email=$1;",[email])
        
        if(user.rows.length > 0){
            res.status(400).json({ message: "A user with those credentials already exists" })
        } 

        // 3. Bcrypt the password
        const salt = 10;
        const genSalt = await bcrypt.genSalt(salt)
        const genPassword = await bcrypt.hash(password, genSalt);

        // 4. Add the user to the database
        const newUser = await db.query("INSERT INTO account (user_name, email, password) VALUES ($1, $2, $3) RETURNING *;", [username, email, genPassword])

        // 5. Generate token
        const token = genJwtToken(newUser.rows[0].user_id)
        res.status(201).json({token: token})

    } catch (error) {
        console.error(error.message)
        res.status(404).json({ message: error.message })
    }
}

const login = async (req, res) => {
    try {
        // 1. Spread the user data
        const { email, password }= req.body;

        // 2. Check to see if user exists
        const user = await db.query("SELECT * FROM account WHERE email=$1",[email])

        if(user.rows.length < 0) {
            res.status(404).json({ message: "A user with those credentials does not exist" })
        }

        // 3. Create a token for the user
        const token = genJwtToken(user.rows[0].user_id)
        res.status(200).json({token: token})

    } catch (error) {
        console.error(error.message)
        res.status(404).json({ message: error.message })
    }
}

module.exports = registerUser
module.exports = getUsers
module.exports = login