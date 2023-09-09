const jwt = require('jsonwebtoken')

async createToken(id) {
    try {
      let user = await UserModel.getById(id)
      const token = jwt.sign({
        id: user.id,
        username: user.username,
        role: user.role,
      },process.env.SECRET_KEY, { expiresIn: '24h' })
      return { user, token }
    } catch (error) {
      throw error
    }
  }