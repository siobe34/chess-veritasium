import { AnimatePresence } from "framer-motion";
import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";

import Landing from "./pages/Landing";
import Practice from "./pages/Practice";
import About from "./pages/About";
import PageNotFound from "./pages/PageNotFound";

function App() {
    const location = useLocation();
    return (
        <>
            <Navbar />
            <AnimatePresence exitBeforeEnter>
                <Routes location={location} key={location.pathname}>
                    <Route path='/' element={<Landing />} />
                    <Route path='/practice' element={<Practice />} />
                    <Route path='/about' element={<About />} />
                    <Route path='*' element={<PageNotFound />} />
                </Routes>
            </AnimatePresence>
        </>
    );
}

export default App;
