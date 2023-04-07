import Bank from "./components/Bank.js";
import {
    createBrowserRouter,
    createRoutesFromElements,
      redirect,
      Route,
      Routes
    } from "react-router-dom";

const router =
    createBrowserRouter(
       createRoutesFromElements(
            <Route>
                <Route path="/" element={<Bank />} />
            </Route>
        )
    );

export default router;