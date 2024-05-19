import { Navigate, Route, Routes } from "react-router-dom"
import Signin from "./pages/Signin"
import NotFound from "./pages/NotFound"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Signin />} />
      {/* <Route path="/register" element={<Navigate to="/login" />} /> */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
