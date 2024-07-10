import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import { Dashboard } from './pages/Dashboard';
import Profile from './pages/Profile';
import PostComments from './pages/PostComments';
import { UsersPosts } from './pages/UsersPosts';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/dashboard/:postId" element={<PostComments />} />
        <Route path="/user-posts/" element={<UsersPosts />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
