const UserModel = require('../user/userModel')
const { comparePassword } = require('../utils/crypto') 
const userModel = new UserModel()


class AuthModel {

  constructor() {
  }

  async checkUsersCredentials(id, password) {
    try {
      let user = await userModel.getById(id)
      let verifyPassword = comparePassword(password, user.password)
      if (verifyPassword) return user
    } catch (error) {
      throw error
    }
  }

}

module.exports = AuthModel