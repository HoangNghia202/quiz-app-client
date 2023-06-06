import { useState } from "react";
import "./App.css";
import { useSelector } from "react-redux";
function App() {
    const currentUser = useSelector((state) => state.user.userInfo);

    return (
        <>
            <button className="text-xl bg-blue-300 text-black">helo</button>
        </>
    );
}

export default App;
