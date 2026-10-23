import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import VerifyEmail from "./pages/VerifyEmail";
import Verify from "./pages/Verify";
import ForgotPassword from "./pages/ForgotPassword";
import ProtectedRoute from "./components/protectedRoute";
import VerifyOTP from "./pages/VerifyOTP";
import ChangePassword from "./pages/ChangePassword";
import NoteLoader from "./pages/NoteLoader";
import Footer from "./pages/Footer";
import Navbar from "@/components/Navbar"
import Profile from "./pages/Profile";
import Features from "./pages/Features";
import About from "./pages/About";

function App() {
  return (
    <Router>

      <div className='flex flex-col min-h-screen bg-green-200 w-full overflow'>
        <Navbar />
        <main className='flex-1 w-full flex flex-col'>
          <Routes>

            {/* PROTECTED ROUTES: Only authenticated users can access these endpoints */}
            <Route element={<ProtectedRoute />}>
              <Route path='/to-notes' element={<NoteLoader />} />
              <Route path='/profile' element={<Profile/>}/>
              {/* You can drop any other secure routes (like /profile) inside here later! */}
            </Route>

            {/* PUBLIC ROUTES: Anyone can view these pages anytime */}
            <Route path="/" element={<Home />} />
            <Route path="/features" element={<Features/>} />
            <Route path='/about' element={<About/>} />

            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path='/forgot-password' element={<ForgotPassword />} />
            <Route path='/verify' element={<VerifyEmail />} />
            <Route path='/verify/:token' element={<Verify />} />
            <Route path='/verify-otp/:email' element={<VerifyOTP />} />
            <Route path='/change-password/:email' element={<ChangePassword />} />

          </Routes>

        </main>

        <Footer />
      </div>

    </Router>
  )
}

export default App;
