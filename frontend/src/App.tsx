import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Store from "./pages/Store";
import PrivateRoute from "./components/routes/PrivateRoute";
// import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import { useAppContext } from "./contexts/AppContext";
import Loading from "./ui/Loader";
import AdminPrivateRoute from "./components/routes/AdminPrivateRoute";
import Dashboard from "./pages/Dashboard";
import ProductDetails from "./pages/ProductDetails";
import CartPage from "./pages/CartPage";
import Checkout from "./pages/Checkout";
import OrderDetails from "./components/Profile/OrderDetails";

function App() {
  const { loading } = useAppContext();
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sign-in" element={<Login />} />
            <Route path="/sign-up" element={<Register />} />
            <Route path="/store" element={<Store />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route element={<PrivateRoute />}>
              <Route path="/profile" element={<Profile />} />
              <Route path="/orders/:orderId" element={<OrderDetails />} />
            </Route>
            <Route element={<AdminPrivateRoute />}>
              <Route path="/admin" element={<Dashboard />} />
            </Route>
          </Routes>
          <Footer />
        </Router>
      )}
    </>
  );
}

export default App;
