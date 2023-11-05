import "./App.css";
import { Nav } from "./Components/Nav/Nav";
import { Body } from "./Components/Body/Body";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useState } from "react";

function App() {
  // User
  //atob == decode
  let startUser = null
    if(sessionStorage.user !== undefined) {
      const firstParse = JSON.parse(sessionStorage.user)
      const secondParse = JSON.parse(atob(firstParse.info))
      startUser = {
        name: firstParse.name,
        id: secondParse.id,
        picture: secondParse.picture,
        email: secondParse.email,
        role: secondParse.role,
        status: secondParse.status,
      }
    }
  const [user, setUser] = useState(startUser);
  return (
    <>
        <GoogleOAuthProvider clientId="669729803056-i161n4ah2i4s7rdrbchrv2jf4km0ciqr.apps.googleusercontent.com">
          <Nav
            user={user}
            setUser={setUser}
          />
          <Body
            user={user}
            setUser={setUser}
          />
        </GoogleOAuthProvider>
    </>
  );
}

export default App;
