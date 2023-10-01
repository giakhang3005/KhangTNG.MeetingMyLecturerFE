import './App.css';
import { Nav } from './Components/Nav/Nav';
import { Body } from './Components/Body/Body';
import { GoogleOAuthProvider } from "@react-oauth/google";
import {useState} from 'react';

function App() {
  // User
  //atob == decode
  const startUser = sessionStorage.user === undefined ? null : JSON.parse(atob(sessionStorage.user));
  const [user, setUser] = useState(startUser);
  return (
    <>
    <GoogleOAuthProvider clientId="669729803056-i161n4ah2i4s7rdrbchrv2jf4km0ciqr.apps.googleusercontent.com">
      <Nav user={user} setUser={setUser}/>
      <Body user={user} setUser={setUser} />
      </GoogleOAuthProvider>
    </>
  );
}

export default App;
