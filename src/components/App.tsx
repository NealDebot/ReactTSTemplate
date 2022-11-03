import React, { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import '@sass/App.sass'
import HomePage from '@pages/Home'
import { auth, signInAnon } from '@service/Firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
const App = () => {
  const [user, loading] = useAuthState(auth)

  signInAnon()

  useEffect(() => {
    if (!loading) {
      console.dir(user)
    }
  }, [loading, user])

  return (
    <BrowserRouter>
      <div className="app" id="outer-container">
        {/* <Navbar /> */}
        <main className="content" id="page-wrap">
          <Routes>
            <Route path="*" element={<HomePage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
