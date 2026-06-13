import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { restoreSession } from "./authSlice";

function AuthInitializer({ children }) {

    const dispatch = useDispatch();

    useEffect(() => {

        const token = localStorage.getItem("token");
        const user = localStorage.getItem("user");
        if (token && user) {

            dispatch(
                restoreSession({
                    token,
                    user: JSON.parse(user)
                })
            );

        }

    }, []);

    return children;
}

export default AuthInitializer;