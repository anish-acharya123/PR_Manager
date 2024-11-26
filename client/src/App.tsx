import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Layout from "./components/layouts";
import { useTokenContext } from "./context/TokenContext";
import { getTokenFromCookies } from "./utils/FetchTokenFromCookie";
import { useEffect } from "react";
import { routes } from "./constants/Routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AOS from "aos";
import "aos/dist/aos.css";
import DynamicBreadcrumb from "./components/Smallcomponents/DynamicBreadcrumb";

function App() {
  const access_token = getTokenFromCookies();
  const { setToken } = useTokenContext();

  useEffect(() => {
    AOS.init();
  }, []);

  useEffect(() => {
    if (access_token) {
      setToken(access_token);
    }
  }, [access_token, setToken]);

  return (
    <>
      <Router>
        <Layout>
          <DynamicBreadcrumb />
          <ToastContainer
            position="top-right" // Position of the toast
            autoClose={3000} // Auto close after 3 seconds
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light" // Options: light, dark, colored
          />
          <Routes>
            {routes.map((item) => (
              <Route key={item.id} path={item.path} element={item.element} />
            ))}
          </Routes>
        </Layout>
      </Router>
    </>
  );
}

export default App;
