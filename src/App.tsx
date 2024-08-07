import { Navigate, Route, Routes } from "react-router-dom"
import Signin from "./pages/Signin"
import Signup from "./pages/Signup/Signup"
import NotFound from "./pages/NotFound"
import AuthProvider from "./providers/AuthProvider"
import PrivateRoutes from "./layouts/PrivateRoutes"
import Dashboard from "./pages/dashboard/Dashboard"
import WithAppbar from "./layouts/WithAppbar"

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/login" element={<Signin />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/dashboard" element={<PrivateRoutes />}>
            <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  )
}

export default App
