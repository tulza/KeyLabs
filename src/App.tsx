import { Route, Routes, useLocation } from "react-router-dom";
import Test from "./components/Test";

function App() {
  const location = useLocation();

  return (
    <>
      <Routes key={location.pathname} location={location}>
        <Route path="/" element={<Test />} />
      </Routes>
    </>
  );
}

export default App;
