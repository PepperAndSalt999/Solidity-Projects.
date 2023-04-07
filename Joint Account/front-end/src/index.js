
import ReactDOM from "react-dom/client";
import router from './routes.js';
import {
    RouterProvider
} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("Root"));

root.render(
    <RouterProvider router={router} />
);
