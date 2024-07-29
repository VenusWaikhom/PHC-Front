import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { RiDeleteBin7Line } from "react-icons/ri";
import Fade from "@mui/material/Fade";
import Backdrop from "@mui/material/Backdrop";

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

function Delete(props) {
  const [OpenDelete, SetOpenDelete] = useState(false);
  const OpenDeleteModal = () => {
    SetOpenDelete(true);
  };
  const CloseDeleteModal = () => {
    SetOpenDelete(false);
  };

  console.log(OpenDelete);

  return (
    <div className="text-red-600 cursor-pointer" onClick={OpenDeleteModal}>
      <RiDeleteBin7Line />

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        onClose={CloseDeleteModal}
        open={OpenDelete}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={OpenDelete}>
          <Box sx={style}>
            <div className="Header flex content-end justify-between p-10 min-w-full justify-self-start">
              <div></div>
              <div
                className="text-4xl cursor-pointer select-none"
                onClick={CloseDeleteModal}
              >
                X
              </div>
            </div>
            <div
              onClick={() => {
                fetch("https://phc-api.onrender.com/DeleteChildren", {
                  method: "delete",
                  headers: { Authorization: "Bearer" },
                  body: JSON.stringify(props),
                })
                  .then((res) => res.json())
                  .then((json) => {
                    console.log(json.error);
                  });
              }}
            ></div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default Delete;
