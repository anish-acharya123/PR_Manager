import Dashboard from "../../pages/Dashboard";
import EachPullRequest from "../../pages/EachPullRequest";
import Home from "../../pages/Home";

export const routes = [
  {
    id: 1,
    path: "/",
    element: <Home />,
  },
  {
    id: 2,
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    id: 2,
    path: "/dashboard/mangae-pullrequest",
    element: <EachPullRequest />,
  },
];
