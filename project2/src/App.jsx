import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Navbar from "./components/shared/Navbar";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Home from "./components/home/Home";
import Browse from "./components/browse/Browse";
import Profile from "./components/profile/Profile";
import Jobs from "./components/jobs/Jobs";
// import "./App.css";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/browse",
    element: <Browse />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/jobs",
    element: <Jobs/>,
  }
]);

function App() {
  const [count, setCount] = useState(0);

  return <RouterProvider router={appRouter} />;
}

export default App;
