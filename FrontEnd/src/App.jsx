import { createBrowserRouter, RouterProvider } from "react-router-dom";

import DashBoard from "./pages/DashBoard";
import LoginPage from "./pages/LoginPage";
import CustomerPage from "./pages/CustomerPage";
import CustomerDetails from "./components/Table/CustomerDetails";
import TransporterPage from "./pages/TransporterPage";
import TransporterTablePage from "./pages/TransporterTablePage";
import CustomerTablePage from "./pages/CustomerTablePage";
import TransporterDetails from "./components/Table/TransporterDetails";
import TankerDetails from "./components/Table/TankerDetails";
import TransactionTable from "./pages/TransactionTable";
import TransactionPage from "./components/Transaction/TransactionPage";
// import PricesheetPage from "./pages/PricesheetPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LoginPage />,
    },
    {
      path: "/dashboard",
      element: <DashBoard />,
    },
    {
      path: "/customer",
      element: <CustomerPage />,
    },
    {
      path: `/customer/edit/:id`,
      element: <CustomerPage />,
    },
    {
      path: "/customertable",
      element: <CustomerTablePage></CustomerTablePage>,
    },
    {
      path: "/customer/view/:id",
      element: <CustomerDetails />,
    },
    {
      path: "/transporter",
      element: <TransporterPage />,
    },
    {
      path: "/transportertable",
      element: <TransporterTablePage />,
    },
    {
      path: "/transporter/view/:id",
      element: <TransporterDetails />,
    },
    {
      path: "/tankerdetail/view/:id",
      element: <TankerDetails />,
    },
    {
      path: "/transactiontable",
      element: <TransactionTable />,
    },
    {
      path: "/transaction",
      element: <TransactionPage />,
    },
    {
      path: `/edit/:id`,
      element: <TransactionPage />,
    },
    // {
    //   path: "/transporter/view/:id",
    //   element: <CustomerDetails />,
    // },
    // {
    //   path: `/transporter/edit/:id`,
    //   element: <CustomerPage />,
    // },

    {
      path: "*",
      element: <h1>Page Not Found</h1>,
    },
  ]);
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
