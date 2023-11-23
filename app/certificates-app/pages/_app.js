import { CssBaseline } from "@mui/material";

import { AuthProvider } from "@/app/context/AuthContext";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <ToastContainer />
      <CssBaseline />
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
