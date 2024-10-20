import AuthProvider from './context/auth-provider'
import "./globals.css"

export const metadata = {
  title: "Unifiber by Asianet",
  description: "Created by Leonard Sianipar",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
