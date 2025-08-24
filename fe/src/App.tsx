import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import AppLayout from "./layouts/AppLayout";
import Index from "./pages/Index";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: <Index />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
