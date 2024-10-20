import CredentialsProvider from "next-auth/providers/credentials"
import crypto from 'crypto'

import ConnectionDB from "@/utils/db-connection" 


const options = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username :",
          type: "text",
          placeholder: "Username"
        },
        password: {
          label: "Password :",
          type: "password",
          placeholder: "Password"
        }
      },
      async authorize(credentials) {
        try {
          const [results, field] = await ConnectionDB('dboperation').query('SELECT username, password, name, role FROM users WHERE username = ?', [credentials.username])
          if (results.length === 0) {
            return null
          }
          const user = results[0]
          const hashedPassword = crypto.createHash('md5').update(credentials.password).digest('hex');
          
          const passwordMatch = (hashedPassword === user.password)
          if (!passwordMatch) {
            return null
          }
      
          return { name: user.name, email: user.username, role: user.role }
        } catch (error) {
          console.error('Error occurred during authorization:', error)
          return null
        } finally {
          ConnectionDB('dboperation').releaseConnection()
        }
      }
    })
  ],

  pages: {
    signIn: '/auth'
  },

  callbacks: {
		async jwt({ token, user }) {
			user && (token.user = user)
			return token
		},
		async session({ session, token }) {
			session.user = token.user
			return session
		},
	},


  session: {
    strategy: 'jwt',
    updateAge: 60 * 60,
    maxAge: 60 * 60 * 8, // 8 Hour
  },


}

export default options