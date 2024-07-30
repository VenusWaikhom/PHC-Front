import { Box, Modal } from "@mui/material";
import React, { useState } from "react";
import ReactCardFlip from "react-card-flip";
import { GobalStorage } from "../../Context/GobalStorage";
import OtpInput from "react-otp-input";
import "./SignInSIgnUp.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  height: "90%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "start",
  alignItems: "center",
  gap: "2rem",
  borderRadius: "12px",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const SignInSignUp = () => {
  const [otp, setOtp] = useState("");

  const [ChangePassword, SetChangePassword] = useState();
  const [NewPassword, SetNewPassword] = useState();

  const [OTPOpen, SetOTPOpen] = useState(false);
  const { dispatch } = GobalStorage();

  const [isFlipped, setIsFlipped] = useState(false);
  const [openForgotPassword, setOpenForgotPassword] = useState(false);
  const [logInEmail, setLogInEmail] = useState("");
  const [logInPassword, setLogInPassword] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpName, setSignUpName] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");

  const handleClick = (e) => {
    e.preventDefault();
    setIsFlipped(!isFlipped);
    resetFields();
  };

  const handleOpenPassword = () => {
    setOpenForgotPassword(!openForgotPassword);
    resetFields();
  };

  const resetFields = () => {
    setLogInEmail("");
    setLogInPassword("");
    setSignUpEmail("");
    setSignUpName("");
    setSignUpPassword("");
  };

  const handleOTPFieldOpen = () => {
    if (!logInEmail) {
      alert("Email Cannot be empty");
    }
    if (OTPOpen === false) {
      SetChangePassword("");
      SetNewPassword("");
    }
    fetch("https://phc-api.onrender.com/Admin/SendOTP", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: logInEmail,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.success === false) {
          alert(json.error);
        } else {
          alert("OTP Send Successful");
          SetOTPOpen(true);
        }
      });
  };

  const handleChangePassword = () => {
    fetch("https://phc-api.onrender.com/Admin/varifyOTP", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: logInEmail,
        password: NewPassword,
        OTP: otp,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json?.success === true) {
          dispatch({
            type: "login",
            id: json.admin?._id,
            token: json?.token,
          });
          setOtp();
          SetOTPOpen(false);
          setOpenForgotPassword(false);
        } else {
          alert(json?.error);
        }
      });
  };

  const signIn = (e) => {
    e.preventDefault();

    fetch("https://phc-api.onrender.com/Admin/login", {
      timeout: 5,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: logInEmail,
        password: logInPassword,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        dispatch({
          type: "login",
          id: json.admin?._id,
          token: json?.token,
        });
      });
  };

  const signUp = () => {
    fetch("https://phc-api.onrender.com/Admin/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: signUpEmail,
        name: signUpName,
        password: signUpPassword,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        dispatch({
          type: "login",
          id: json.admin?._id,
          token: json?.token,
        });
      });
  };

  return (
    <div className="overflow-hidden">
      <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
        <div className="flex content-center justify-center flex-wrap h-screen">
          <div className="border-2 border-solid border-gray-800 p-10 rounded-lg text-base flex content-center justify-center flex-wrap gap-5 flex-col shadow-md">
            <div className="flex content-center justify-center flex-wrap uppercase font-bold text-xl border-b-2 border-gray-800">
              Log In
            </div>
            <div className="flex content-center justify-center flex-wrap gap-2 flex-col">
              <label>Email</label>
              <input
                type="email"
                className="outline-none border-2 border-gray-800 p-1"
                value={logInEmail}
                onChange={(e) => setLogInEmail(e.target.value)}
              />
              <label>Password</label>
              <input
                type="password"
                className="outline-none border-2 border-gray-800 p-1"
                value={logInPassword}
                onChange={(e) => setLogInPassword(e.target.value)}
              />
            </div>
            <div
              className="flex content-center justify-center text-xl tracking-wide uppercase font-semibold cursor-pointer select-none"
              onClick={signIn}
            >
              <div className="SignInSignUpBtn flex content-center justify-center flex-wrap">
                Sign In
              </div>
            </div>
            <div
              onClick={handleOpenPassword}
              className="select-none cursor-pointer"
            >
              Forgot password?
            </div>
            <Modal
              open={openForgotPassword}
              onClose={handleOpenPassword}
              aria-labelledby="parent-modal-title"
              aria-describedby="parent-modal-description"
            >
              <Box
                sx={{
                  ...style,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "2rem",
                }}
              >
                <div className="Header flex content-end justify-between p-5 min-w-full justify-self-start gap- ">
                  <div></div>
                  <div
                    className="text-4xl cursor-pointer select-none"
                    onClick={handleOpenPassword}
                  >
                    X
                  </div>
                </div>
                <div className="EmailBlock  text-xl ">
                  <div></div>
                  <div>
                    <div className="m-4 uppercase font-semibold text-lg">
                      Enter Email
                    </div>
                    <input
                      className="p-2 outline-none border border-gray-700"
                      type="Email"
                      onChange={(e) => {
                        setLogInEmail(e.target.value);
                      }}
                      value={logInEmail || ""}
                    />
                  </div>
                  <div
                    onClick={handleOTPFieldOpen}
                    className="flex flex-wrap content-center justify-center Buttons_API_Call uppercase font-semibold select-none cursor-pointer"
                  >
                    Send OTP
                  </div>
                </div>
              </Box>
            </Modal>
            <Modal
              open={OTPOpen}
              onClose={handleOTPFieldOpen}
              aria-labelledby="child-modal-title"
              aria-describedby="child-modal-description"
            >
              <Box
                sx={{
                  ...style,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "2rem",
                }}
              >
                <div className="Header flex content-end justify-between p-5 min-w-full justify-self-start gap- ">
                  <div></div>
                  <div
                    className="text-4xl cursor-pointer select-none"
                    onClick={() => {
                      SetOTPOpen(!OTPOpen);
                      setOtp();
                    }}
                  >
                    X
                  </div>
                </div>
                <div className="OTPWrapper">
                  <div className="OTPHeader">Enter OTP</div>
                  <OtpInput
                    value={otp}
                    onChange={setOtp}
                    numInputs={6}
                    renderSeparator={<span>-</span>}
                    renderInput={(props) => <input {...props} />}
                    containerStyle={{ gap: "0.5rem" }}
                    inputStyle={{
                      height: "3rem",
                      width: "2.5rem",
                      outline: "none",
                      fontSize: "1.2rem",
                      border: "1px solid grey",
                      borderRadius: "8px",
                    }}
                  />
                </div>
                <input
                  className="p-2 outline-none border border-gray-700"
                  onChange={(e) => {
                    SetChangePassword(e.target.value);
                  }}
                  value={ChangePassword || ""}
                  placeholder="New Password"
                  type="password"
                />
                <div>
                  <input
                    className="p-2 outline-none border border-gray-700"
                    placeholder="Confirm Password"
                    type="password"
                    onChange={(e) => {
                      SetNewPassword(e.target.value);
                    }}
                    value={NewPassword || ""}
                  />
                </div>
                <div
                  onClick={handleChangePassword}
                  className="flex flex-wrap content-center justify-center Buttons_API_Call uppercase font-semibold select-none cursor-pointer"
                >
                  Reset Password
                </div>
              </Box>
            </Modal>
            <div>
              Don't have an account &nbsp;
              <button onClick={handleClick} className="text-blue-800">
                Register
              </button>
            </div>
          </div>
        </div>
        <div className="flex content-center justify-center flex-wrap h-screen">
          <div className="border-2 border-solid border-gray-800 p-10 rounded-lg text-base flex content-center justify-center flex-wrap gap-5 flex-col shadow-md">
            <div className="flex content-center justify-center flex-wrap uppercase font-bold text-xl border-b-2 border-gray-800">
              Register
            </div>
            <div className="flex content-center justify-center flex-wrap gap-2 flex-col">
              <label>Email</label>
              <input
                type="email"
                className="outline-none border-2 border-gray-800 p-1"
                value={signUpEmail}
                onChange={(e) => setSignUpEmail(e.target.value)}
              />
              <label>Name</label>
              <input
                type="text"
                className="outline-none border-2 border-gray-800 p-1"
                value={signUpName}
                onChange={(e) => setSignUpName(e.target.value)}
              />
              <label>Password</label>
              <input
                type="password"
                className="outline-none border-2 border-gray-800 p-1"
                value={signUpPassword}
                onChange={(e) => setSignUpPassword(e.target.value)}
              />
            </div>
            <div
              className="flex content-center justify-center text-xl tracking-wide uppercase font-semibold cursor-pointer select-none"
              onClick={signUp}
            >
              <div className="SignInSignUpBtn flex content-center justify-center flex-wrap">
                Sign Up
              </div>
            </div>
            <div>
              Already have an account &nbsp;
              <button onClick={handleClick} className="text-blue-800">
                Login
              </button>
            </div>
          </div>
        </div>
      </ReactCardFlip>
    </div>
  );
};

export default SignInSignUp;
