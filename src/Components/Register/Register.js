import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { RiDeleteBin7Line } from "react-icons/ri";

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
  const [openDelete, setOpenDelete] = useState(false);

  const openDeleteModal = () => {
    setOpenDelete(true);
  };

  const closeDeleteModal = () => {
    console.log("Modal is closing"); // Debug log
    setOpenDelete(false);
  };

  console.log(openDelete); // Debug log

  return (
    <div className="text-red-600 cursor-pointer" onClick={openDeleteModal}>
      <RiDeleteBin7Line />
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        onClose={closeDeleteModal}
        open={openDelete}
      >
        <Box sx={style}>
          <div className="Header flex content-end justify-between p-10 min-w-full justify-self-start">
            <div></div>
            <div
              className="text-4xl cursor-pointer select-none"
              onClick={closeDeleteModal}
            >
              X
            </div>
          </div>

          <div
            onClick={() => {
              fetch("https://phc-api.onrender.com/DeleteChildren", {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: "Bearer " + props.token,
                },
                body: JSON.stringify(props),
              })
                .then((res) => res.json())
                .then((json) => {
                  console.log(json.error);
                });
            }}
          >
            Delete action content here
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default Delete;
