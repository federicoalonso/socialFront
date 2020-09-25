import React, { useState, useEffect } from 'react';
import SignInSignUp from "./pages/SignInSignUp"
import { ToastContainer } from "react-toastify";
import { AuthContext } from "./utils/context";
import { isUserLoggedApi } from "./api/auth";
import Routing from "./routes/Routing";

export default function App() {

  const [user, setUser] = useState(null);
  const [loadUser, setLoadUser] = useState(false);
  const [refreshChckLogin, setRefreshChckLogin] = useState(false)

  useEffect(() => {
    setUser(isUserLoggedApi());
    setRefreshChckLogin(false);
    setLoadUser(true);
  }, [refreshChckLogin])

  if(!loadUser) return null;

  return (
    <AuthContext.Provider value={user}>
      {user ? (
        <Routing setRefreshChckLogin={setRefreshChckLogin} />
      ) : (
          <div>
            <SignInSignUp setRefreshChckLogin={setRefreshChckLogin} />
          </div>
        )}
      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnVisibilityChange
        draggable
        pauseOnHover
      />
    </AuthContext.Provider>
  )
}