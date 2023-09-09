const AuthModel = require('./authModel')
const jwt = require('jsonwebtoken')
require('dotenv').config()

class AuthController {
    static async createToken(req, res) {
        try {
            let user = await AuthModel.checkUsersCredentials(req.body)
            const token = jwt.sign({
                id: user.id,
                username: user.username,
                role: user.role,
            }, process.env.SECRET_KEY, { expiresIn: '24h' })
            return res.status(200).json({
                message: 'Correct Credentials!',
                token: token
              })
        } catch (error) {
            throw error
        }
    }
}

module.exports = AuthController