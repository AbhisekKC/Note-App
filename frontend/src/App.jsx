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
import ScrollToTop from "./components/ScrollToTop";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <Router>
      <ScrollToTop />
       
      {/* FIX 1: Replaced invalid 'overflow' with 'overflow-y-auto' or left to browser defaults */}
      <div className='bg-linear-to-l from-green-200 to-white  flex flex-col min-h-screen  w-full overflow-y-auto'>
        <Navbar />
        
        {/* FIX 2: Added shrink-0 to prevent layout collapse, and let flex-1 grow dynamically */}
        <main className='flex-1 w-full flex flex-col shrink-0 pt-20'>
          <Routes>

            {/* PROTECTED ROUTES: Only authenticated users can access these endpoints */}
            <Route element={<ProtectedRoute />}>
              <Route path='/to-notes' element={<NoteLoader />} />
              <Route path='/profile' element={<Profile/>}/>
              <Route path='/admin' element={<AdminDashboard/>} />
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
            <Route path='*' element={<NotFound/>} />

          </Routes>
        </main>

        {/* FIX 3: Make sure your <Footer /> component inside Footer.jsx has the 'shrink-0' utility on its top-level HTML tag */}
        <Footer />
      </div>
    </Router>
  )
}

export default App;
