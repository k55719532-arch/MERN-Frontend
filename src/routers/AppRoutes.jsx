import React from "react";
import { Routes } from "react-router-dom";
import Homepage,{ Aboutpage} from  "../pages/About";


function AppRoutes(){
    return(
<Routes>
     <Route path="/"element={<Homepage/>} />
     <Route path="/about"element={<Aboutpage/>} />
</Routes>
    );
}

export default AppRoutes;