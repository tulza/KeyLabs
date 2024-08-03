import { Route, Routes, useLocation } from "react-router-dom";
import VirtualKeyboard from "./components/Test";
import Title from "./components/Title";

function App() {
  const location = useLocation();

  return (
    <>
      <Title></Title>
      <Routes key={location.pathname} location={location}>
        <Route path="/" element={<VirtualKeyboard />} />
      </Routes>
    </>
  );
}

export default App;
