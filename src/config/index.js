// Load env to process.env
require("dotenv").config()


const env = process.env

module.exports = {
  APP_NAME: env.APP_NAME,
  APP_PORT: env.APP_PORT,
  MONGODB_URI: env.MONGODB_URI,
  AUTH_JWT_SECRET: env.AUTH_JWT_SECRET,
  BCRYPT_SALT: Number(env.BCRYPT_SALT),

  "role": {
    ADMIN: ["admin"],
    USER: ["user", "admin"]
  },

  "user_status": {
    SUSPENDED: "suspended",
    ACTIVE: "active",
    DEACTIVED: "deactived"
  },

  "url": {
    BASE_URL: env.BASE_URL,
    CLIENT_URL: env.CLIENT_URL
  },

  "mailer": {
    HOST: env.MAILER_HOST,
    USER: env.MAILER_USER,
    PASSWORD: env.MAILER_PASSWORD,
    PORT: env.MAILER_PORT,
    SECURE: env.MAILER_PASSWORD,
    DOMAIN: env.MAILER_DOMAIN
  }
}