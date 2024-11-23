import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Layout from "./components/layouts";
import { useTokenContext } from "./context/TokenContext";
import { getTokenFromCookies } from "./utils/FetchTokenFromCookie";
import { useEffect } from "react";
import { routes } from "./constants/Routes";

function App() {
  const access_token = getTokenFromCookies();
  const { setToken } = useTokenContext();
  useEffect(() => {
    if (access_token) {
      setToken(access_token);
    }
  }, [access_token, setToken]);


  return (
    <>
      <Router>
        <Layout>
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
