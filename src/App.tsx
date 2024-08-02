import { Route, Routes, useLocation } from "react-router-dom";
import VirtualKeyboard from "./components/Test";

function App() {
  const location = useLocation();

  return (
    <>
      <Routes key={location.pathname} location={location}>
        <Route path="/" element={<VirtualKeyboard />} />
      </Routes>
    </>
  );
}

export default App;
