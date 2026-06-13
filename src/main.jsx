import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import "bootstrap-icons/font/bootstrap-icons.css";
import AuthInitializer from "./features/auth/authInitializer";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <AuthInitializer>
        <App />
        </AuthInitializer>
    </Provider>
);