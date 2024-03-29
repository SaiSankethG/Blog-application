import Home from "./pages/home/Home";
import Single from "./pages/single/single";
import TopBar from "./components/topbar/topbar";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Settings from "./pages/settingss/Settings";
import Write from "./pages/write/Write";
import { BrowserRouter as Router , Routes , Route } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./context/Context";

function App(){
    const { user } = useContext(Context);
    return(
        <Router>
            <TopBar/>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={user?<Home/>: <Register/>}/>
                <Route path="/login" element={user?<Home/>:<Login/>}/>
                <Route path="/write" element={user?<Write/>:<Register/>}/>
                <Route path="/settings" element={user?<Settings/>:<Register/>}/>
                <Route path="/post/:id" element={<Single/>}/>
            </Routes>
        </Router>
    )
}

export default App;