import React, { useState,useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import History from './frontpage/History';
import Bookedcards from './frontpage/Bookedcards';
import Footer from './frontpage/Footer';
import TopRatedTutors from './frontpage/TopRatedTutors';
import PageLayout from './secondpage/PageLayout';
import Detail from './thirdpage/ProductDetailPage';
import Navbar from './Navbar/Navbar';
import Register from './authentication/register';
import Signin from './authentication/Signin';
import ForgotPassword from './authentication/forgotPassword';
import ResetPassword from './authentication/resetPassword';
import UpdatePassword from './authentication/updatePassword';
import UserReviews from './UserProfile/userreview';
import UserProfile from './UserProfile/userprofile';
import EdituserProfile from './UserProfile/Edituserprofile';
import UserBookings from './UserProfile/userbooking';
import Main from './frontpage/Main';

function App() {
  const [signedIn, setsignedIn] = useState(false);
  const [history, sethistory] = useState([]);
  const [token, settoken] = useState("");
  const [user, setuser] = useState({});

  useEffect(() => {
    // Check localStorage for saved data
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");
    const savedHistory = localStorage.getItem("history");

    if (savedToken && savedUser) {
      settoken(savedToken);
      setuser(JSON.parse(savedUser));
      sethistory(JSON.parse(savedHistory) || []);
      setsignedIn(true);
    }
  }, []);

  return (
    <Router>
      <div className="App">
        <Navbar
          signedIn={signedIn}
          setsignedIn={setsignedIn}
          sethistory={sethistory}
          token={token}
          settoken={settoken}
          user={user}
          setuser={setuser}
        />
        <Routes>
          {/* Route for Home Page ("/") */}
          <Route
            path="/"
            element={
              <>
              <Main
              signedIn={signedIn}
              setsignedIn={setsignedIn}
              sethistory={sethistory}
              token={token}
              settoken={settoken}
              user={user}
              setuser={setuser}
              history={history}
              />
              <Footer />
              </>
            }
          />
          {/* Route for Register */}
          <Route
            path="/register"
            element={
              <Register
                setsignedIn={setsignedIn}
                sethistory={sethistory}
                settoken={settoken}
                setuser={setuser}
              />
            }
          />
          {/* Route for Signin */}
          <Route
            path="/signin"
            element={
              <Signin
                setsignedIn={setsignedIn}
                sethistory={sethistory}
                settoken={settoken}
                setuser={setuser}
              />
            }
          />
          {/* Route for Forgot Password */}
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          {/* Route for Reset Password */}
          <Route
            path="/resetPassword/:token"
            element={
              <ResetPassword
                sethistory={sethistory}
                setsignedIn={setsignedIn}
                setuser={setuser}
              />
            }
          />
          {/* Route for Update Password */}
          <Route
            path="/updatePassword"
            element={<UpdatePassword token={token} />}
          />
          {/* Route for User Profile */}
          <Route
            path="/user/profile"
            element={
              <UserProfile
                user={user}
                setuser={setuser}
                signedIn={signedIn}
                sethistory={sethistory}
                token={token}
              />
            }
          />
          {/* Route for Editing User Profile */}
          <Route
            path="/user/updateProfile"
            element={
              <EdituserProfile
                user={user}
                setuser={setuser}
                signedIn={signedIn}
                sethistory={sethistory}
                token={token}
              />
            }
          />
          {/* Route for User Bookings */}
          <Route
            path="/user/bookings"
            element={
              <UserBookings
                user={user}
                signedIn={signedIn}
                sethistory={sethistory}
                token={token}
              />
            }
          />
          {/* Route for User Reviews */}
          <Route
            path="/user/reviews"
            element={
              <UserReviews
                user={user}
                signedIn={signedIn}
                sethistory={sethistory}
                token={token}
              />
            }
          />
          {/* Route for Search */}
          <Route
            path="/search"
            element={
              <>
                <PageLayout />
                <Footer />
              </>
            }
          />
          {/* Route for Detail */}
          <Route
            path="/detail"
            element={
              <>
                <Detail signedIn={signedIn} sethistory={sethistory} token={token}/>
                <Footer />
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}



export default App;
