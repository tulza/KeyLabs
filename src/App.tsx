import { Route, Routes, useLocation } from "react-router-dom";
// import VirtualKeyboard from "./components/Test";
import Timer from "./components/Timer";

function App() {
  const location = useLocation();

  return (
    <>
      <Routes key={location.pathname} location={location}>
        {/* <Route path="/" element={<VirtualKeyboard />} /> */}
        <Route path="/" element={<Timer initialTime={5}/>} />
      </Routes>
    </>
  );
}

export default App;
