import React, { useState } from "react";
import NavBar from "../../Common/NavBar/NavBar";
import { GobalStorage } from "../../Context/GobalStorage";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import "./Setting.css";
import { toast } from "react-toastify";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  height: "65%",
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

const Setting = () => {
  const [openDelete, setOpenDelete] = useState();

  const { state, dispatch } = GobalStorage();
  const [CurrentPassword, SetCurrentPassword] = useState();
  const [NewPassword, SetNewPassword] = useState();
  const [ConfirmPassword, SetConfirmPassword] = useState();

  const [OpenChangePassword, SetOpenChangePassword] = useState(false);

  const handleOpenDelete = () => {
    setOpenDelete(!openDelete);
  };

  const handleOpen = () => {
    SetOpenChangePassword(!OpenChangePassword);
  };

  const handleSubmit = () => {
    if (!CurrentPassword || !NewPassword || !ConfirmPassword) {
      toast.warn("Please fill all the field");
    }
    if (ConfirmPassword === CurrentPassword) {
      toast.warn("Use diffrent password");
    } else if (NewPassword === ConfirmPassword) {
      fetch("https://phc-api.onrender.com/Admin/ChangePassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + state.userToken,
        },
        body: JSON.stringify({
          id: state?.userId,
          oldpassword: CurrentPassword,
          newpassword: NewPassword,
        }),
      })
        .then((res) => res.json())
        .then((json) => {
          if (json?.success) {
            SetOpenChangePassword(!OpenChangePassword);
          } else {
            toast.warn(json?.error);
          }
        })
        .catch((error) => {
          toast("An error occurred while changing the password.");
        });
    } else {
      toast.warn("Passwords do not match");
    }
  };

  return (
    <div className="h-screen">
      <NavBar />
      <div className="flex content-center justify-center w-full h-5/6">
        <div className="flex content-center justify-center flex-col gap-10">
          <div
            onClick={handleOpen}
            className="cursor-pointer flex content-center justify-center text-xl font-semibold uppercase tracking-wider ChangePasswordBtn select-none"
          >
            Change Password
          </div>
          <div
            className="cursor-pointer flex content-center justify-center text-xl font-semibold uppercase tracking-wider LogOutBtn select-none"
            onClick={() => {
              fetch("https://phc-api.onrender.com/Admin/logout", {
                method: "POST",
                headers: {
                  Authorization: "Bearer " + state.userToken,
                },
              })
                .then((res) => res.json())
                .then((json) => {
                  dispatch({ type: "logout" });
                  localStorage.removeItem("userToken");
                  window.location.href = "../";
                });
            }}
          >
            LogOUT
          </div>
          <div
            className="cursor-pointer flex content-center justify-center text-xl font-semibold uppercase tracking-wider LogOutBtn select-none"
            onClick={handleOpenDelete}
          >
            Delete Account
          </div>
          <Modal
            open={OpenChangePassword}
            onClose={handleOpen}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <div className="Header flex content-end justify-between p-5 min-w-full justify-self-start gap- ">
                <div className="text-2xl  ml-5 underline text-blue-700 font-semibold tracking-wide uppercase">
                  Change Password
                </div>
                <div
                  className="text-4xl cursor-pointer select-none"
                  onClick={handleOpen}
                >
                  X
                </div>
              </div>
              <div className="flex content-center flex-wrap justify-center flex-col">
                <div className="flex content-center justify-center flex-wrap flex-col gap-5 outline-none">
                  <input
                    value={CurrentPassword || ""}
                    onChange={(e) => {
                      SetCurrentPassword(e.target.value);
                    }}
                    placeholder="Current Password"
                    type="password"
                    className="border border-black p-1 w-80 h-10 rounded-sm outline-none"
                  />
                  <input
                    value={NewPassword || ""}
                    onChange={(e) => {
                      SetNewPassword(e.target.value);
                    }}
                    placeholder="New Password"
                    type="password"
                    className="border border-black p-1 w-80 h-10 rounded-sm outline-none"
                  />
                  <input
                    value={ConfirmPassword || ""}
                    onChange={(e) => {
                      SetConfirmPassword(e.target.value);
                    }}
                    placeholder="Confirm Password"
                    type="password"
                    className="border border-black p-1 w-80 h-10 rounded-sm outline-none"
                  />
                </div>
                <div
                  className="flex content-center justify-center select-none text-xl font-semibold   flex-wrap uppercase tracking-wider"
                  onClick={handleSubmit}
                >
                  <div className="DeleteModalBtn Delete flex content-center justify-center flex-wrap">
                    Update
                  </div>
                </div>
              </div>
            </Box>
          </Modal>
          <Modal
            open={openDelete}
            onClose={handleOpenDelete}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <div className="Header flex content-end justify-between  min-w-full justify-self-start ">
                <div></div>
                <div
                  className="text-4xl cursor-pointer select-none"
                  onClick={handleOpenDelete}
                >
                  X
                </div>
              </div>
              <div className="flex flex-wrap content-center justify-center flex-col gap-4">
                <div className="flex flex-wrap content-center justify-center">
                  <img
                    src="/Images/Warning.png"
                    alt="Warning"
                    className="WarningImage"
                  />
                </div>
                <div className="flex flex-wrap content-center justify-center flex-col uppercase tracking-wide text-2xl font-semibold">
                  Confirm Delete
                </div>
                <div className="flex flex-wrap content-center justify-center uppercase gap-8">
                  <div
                    className="DeleteModalBtn Cancel flex flex-wrap content-center justify-center  text-xl font-semibold"
                    onClick={handleOpenDelete}
                  >
                    Cancel
                  </div>
                  <div
                    className="DeleteModalBtn Delete flex flex-wrap content-center justify-center  text-xl font-semibold"
                    onClick={() => {
                      fetch("https://phc-api.onrender.com/DeleteAdmin", {
                        method: "delete",
                        headers: {
                          "Content-Type": "application/json",
                          Authorization: "Bearer " + state.userToken,
                        },
                        body: JSON.stringify({
                          id: state?.userId,
                        }),
                      })
                        .then((res) => res.json())
                        .then((json) => {
                          dispatch({ type: "logout" });
                          localStorage.removeItem("userToken");
                          window.location.href = "./";
                        });
                    }}
                  >
                    Delete
                  </div>
                </div>
              </div>
            </Box>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Setting;
