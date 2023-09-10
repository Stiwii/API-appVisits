const UserModel = require('../users/userModel')
const { comparePassword } = require('../utils/crypto')

class AuthModel {

  static async checkUsersCredentials({username, password}) {
    try {
      let user = await UserModel.getByUsername(username)
      let verifyPassword = comparePassword(password, user.password)
      if (verifyPassword) return user
    } catch (error) {
      throw error
    }
  }

}

module.exports = AuthModel