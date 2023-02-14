import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageSignin from "./pages/signin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<>Home</>} />
        <Route path="/signin" element={<PageSignin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
