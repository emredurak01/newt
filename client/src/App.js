import { Route, Routes } from "react-router-dom";
import Home from "./components/Home"
import Room from "./components/Room"


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home></Home>} />
      <Route path="/room/:roomID" element={<Room></Room>} />
    </Routes>
  );
} 

export default App;
