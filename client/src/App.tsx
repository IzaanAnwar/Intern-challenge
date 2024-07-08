import { createBrowserRouter ,RouterProvider} from "react-router-dom";

import Signup from './pages/Signup';

function App() {
  const router  = createBrowserRouter([{
    path:"/signup",
    element:<Signup/>
  }])

  return (
    <RouterProvider router={router}/>
  )
}

export default App
