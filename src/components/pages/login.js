import { useState } from "react";
import { PostApiService } from "../api";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
const Login = () => {

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [showSnackbar, setShowSnackbar] = useState(false);
    const dispatch = useDispatch();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const url = '/AdminApis/v1/login';
            const body = JSON.stringify({
                username: userName,
                password: password
            });

            await PostApiService(url, body).then((data) => {
                if (data.status === 1) {

                    const userData = data.userDetails;
                    sessionStorage.setItem("userId", userData.user_id);
                    sessionStorage.setItem("userName", userData.user_name);
                    sessionStorage.setItem("userRoleId", userData.user_role_id);
                    sessionStorage.setItem("userRole", userData.role_name);
                    // sessionStorage.setItem("userImg", userData.image);
                    sessionStorage.setItem("email", userData.email);
                    sessionStorage.setItem("mobileno", userData.mobileno);
                    sessionStorage.setItem("isLogin", true);

                    console.log("userData : ", userData)
                    dispatch({ type: "DISPLAYMSG", payload: data.message });
                    setShowSnackbar(true);
                    setTimeout(() => setShowSnackbar(false), 5000);

                    navigate('/', { replace: true });

                } else {
                    // setShowMsg(true);
                    dispatch({ type: "DISPLAYMSG", payload: data.message });
                    setShowSnackbar(true);
                    setTimeout(() => setShowSnackbar(false), 5000);
                    navigate('/login', { replace: true });
                }

            });
        } catch (error) {

        }

    }

    let message = useSelector((state) => {
        return state.menuDetails.message;
    });

    return (
        <>
            <div class="container">
                <div class="login-container">
                    <div class="avatar1">
                        <img src="dist/img/57857.jpg" id="logo" alt="User Image" />
                    </div>
                    {/* <h2>Admin Login</h2> */}
                    <br />
                    <form method="post">
                        <div class="form-group">
                            {/* <label for="username">Username</label> */}
                            <input type="text" class="form-control"
                                id="username"
                                name="username"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                placeholder="Email or Mobile Number" required />
                        </div>
                        <div class="form-group">
                            {/* <label for="password">Password</label> */}
                            <input type="password" class="form-control"
                                id="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password" required />
                        </div>
                        <button type="submit" name="btn_login" class="btn btn-primary btn-block" onClick={handleLogin}>Sign In</button>


                    </form>

                    <div class="form-group">

                        <p class="mb-1">
                            <a href="forgot-password.html">I forgot my password</a>
                        </p>
                        <p class="mb-0">
                            <a href="/register" class="text-center">Register a new membership</a>
                        </p>
                    </div>
                    {showSnackbar && <div className="alert alert-info position-fixed bottom-0 end-0" role="alert">
                        {message}</div>}
                </div>
            </div>
        </>
    );
};

export default Login;