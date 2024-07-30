import "./App.css";
import { BrowserRouter } from "react-router-dom";
import MainRouter from "./MainRouter";
import { ToastContainer } from "react-toastify";
import { UserProvider } from "./Context/GobalStorage";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <ToastContainer
          position="bottom-left"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <MainRouter />
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
