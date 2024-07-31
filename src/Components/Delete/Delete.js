import React, { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { GobalStorage } from "../../Context/GobalStorage";
import { toast } from "react-toastify";

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

function Delete(item) {
  const { state } = GobalStorage();
  const [openDelete, setOpenDelete] = useState(false);
  const handleOpenDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => setOpenDelete(false);

  return (
    <div>
      <div
        className="cursor-pointer text-red-700"
        onClick={() => {
          handleOpenDelete();
        }}
      >
        <AiOutlineDelete />
      </div>

      <Modal
        open={openDelete}
        onClose={handleCloseDelete}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="Header flex content-end justify-between p-10 min-w-full justify-self-start ">
            <div></div>
            <div
              className="text-4xl cursor-pointer select-none"
              onClick={handleCloseDelete}
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
                onClick={() => {
                  setOpenDelete(false);
                }}
              >
                Cancel
              </div>
              <div
                className="DeleteModalBtn Delete flex flex-wrap content-center justify-center  text-xl font-semibold"
                onClick={() => {
                  fetch(
                    "https://phc-api.onrender.com/DeleteChildren/" +
                      item?.item?._id,
                    {
                      method: "delete",
                      headers: {
                        Authorization: "Bearer " + state?.userToken,
                      },
                    }
                  )
                    .then((res) => {
                      res.json();
                    })
                    .then((json) => {
                      toast.success("Child Data delete successfull");
                      setOpenDelete(false);
                      window.location.reload();
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
  );
}

export default Delete;
