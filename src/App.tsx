import { Link, Route, Routes, useLocation } from "react-router-dom";

import QRCODECOMPONENT from "./qr-code-component/QRCODECOMPONENT";
import Home from "./home/Home";
import { ArrowLeft } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

type Challange = { label: string; path: string; element: React.ReactNode };

export const mapChallanges: Challange[] = [
  { label: "QRcode component", path: "/qr-code-component", element: <QRCODECOMPONENT /> },
];

function App() {
  const location = useLocation();

  return (
    <>
        <Routes key={location.pathname} location={location}>
          <Route path="/" element={<Home />} />
        </Routes>
    </>
  );
}

export default App;
