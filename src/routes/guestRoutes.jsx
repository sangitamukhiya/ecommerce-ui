import MinimumLayout from "../layout/MinimumLayout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import GuestGuards from "../guard/GuestGuards";
const guestRoutes = [
  {
    path: "/",
    element: (
      <GuestGuards>
        <MinimumLayout />
      </GuestGuards>
    ),

    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
];

export default guestRoutes;
