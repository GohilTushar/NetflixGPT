import { Routes, Route } from "react-router-dom";
import Browse from "./Browse";
import Login from "./Login";

const Body = () => {
  return (
    <div className="bg-black">
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/browse" element={<Browse />}></Route>
      </Routes>
    </div>
  );
};

export default Body;

