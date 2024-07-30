import React, { useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { FaX } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa";
import OneHalf from "../OneHalf/OneHalf";
import TwoHalf from "../TwoHalf/TwoHalf";
import ThreeHalf from "../ThreeHalf/ThreeHalf";
import Nine from "../Nine/Nine";
import OneY from "../OneY/OneY";

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

function Edit(item) {
  const [date, Setdate] = useState();

  const [openEdit, setOpenEdit] = useState(false);
  const handleOpenEdit = () => {
    setOpenEdit(true);
    Setdate(
      ("0" + new Date(item?.item?.DOB).getDate()).slice(-2) +
        "-" +
        ("0" + (new Date(item?.item?.DOB).getMonth() + 1)).slice(-2) +
        "-" +
        new Date(item?.item?.DOB).getFullYear()
    );
  };
  const handleCloseEdit = () => setOpenEdit(false);
  return (
    <div>
      <div onClick={handleOpenEdit} className="cursor-pointer ">
        <AiOutlineEdit />
      </div>
      <Modal
        open={openEdit}
        onClose={handleCloseEdit}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="Header flex content-end justify-between p-5 min-w-full justify-self-start gap- ">
            <div className="text-2xl  ml-5 underline text-blue-700 font-semibold tracking-wide uppercase">
              {item?.item?.Name} Data
            </div>
            <div
              className="text-4xl cursor-pointer select-none"
              onClick={handleCloseEdit}
            >
              X
            </div>
          </div>
          <div className="flex flex-wrap content-center justify-center gap-20">
            <div className="Edit_Children_Wrapper">
              <div className="flex flex-wrap content-center justify-start gap-10 text-xl tracking-wide font-mono">
                Name: <div>{item.item.Name}</div>
              </div>
              <div className="flex flex-wrap content-center justify-start gap-10 text-xl tracking-wide font-mono">
                Father's Name: <div>{item.item.FatherName}</div>
              </div>
              <div className="flex flex-wrap content-center justify-start gap-10 text-xl tracking-wide font-mono">
                Mother's Name: <div>{item.item.MotherName}</div>
              </div>
              <div className="flex flex-wrap content-center justify-start gap-10 text-xl tracking-wide font-mono">
                Gender: <div>{item.item.Gender}</div>
              </div>
              <div className="flex flex-wrap content-center justify-start gap-10 text-xl tracking-wide font-mono">
                Date Of Birth: <div>{date}</div>
              </div>
              <div className="flex flex-wrap content-center justify-start gap-10 text-xl tracking-wide font-mono">
                Parent's Email: <div>{item.item.Email}</div>
              </div>
              <div className="flex flex-wrap content-center justify-start gap-10 text-xl tracking-wide font-mono">
                Address: <div>{item.item.Address}</div>
              </div>
              <div className="flex flex-wrap content-center justify-start gap-10 text-xl tracking-wide font-mono">
                Parent's Phone Number: <div>{item.item.PhoneNumber}</div>
              </div>
              <div className="flex flex-wrap content-center justify-start gap-10 text-xl tracking-wide font-mono">
                District: <div>{item.item.Distric}</div>
              </div>
              <div className="flex flex-wrap content-center justify-start gap-10 text-xl tracking-wide font-mono">
                PHC/Town: <div>{item.item.PHCTown}</div>
              </div>
              <div className="flex flex-wrap content-center justify-start gap-10 text-xl tracking-wide font-mono">
                Birth Registration Number: <div>{item.item.BirthRegNo}</div>
              </div>
              <div className="flex flex-wrap content-center justify-start gap-10 text-xl tracking-wide font-mono">
                BCC Status:
                <div>
                  <div
                    className={
                      item?.item?.BCC ? "ActiveCheck tick" : "PassiveCheck"
                    }
                  >
                    <FaCheck />
                  </div>
                  <div
                    className={
                      item?.item?.BCC ? "PassiveCheck  cross" : "ActiveCheck"
                    }
                  >
                    <FaX />
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap content-center justify-start gap-10 text-xl tracking-wide font-mono">
                OPV Status:
                <div>
                  <div
                    className={
                      item?.item?.OPV0 ? "ActiveCheck tick" : "PassiveCheck"
                    }
                  >
                    <FaCheck />
                  </div>
                  <div
                    className={
                      item?.item?.OPV0 ? "PassiveCheck  cross" : "ActiveCheck"
                    }
                  >
                    <FaX />
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap content-center justify-start gap-10 text-xl tracking-wide font-mono">
                HepB Status:
                <div>
                  <div
                    className={
                      item?.item?.HepB ? "ActiveCheck tick" : "PassiveCheck"
                    }
                  >
                    <FaCheck />
                  </div>
                  <div
                    className={
                      item?.item?.HepB ? "PassiveCheck  cross" : "ActiveCheck"
                    }
                  >
                    <FaX />
                  </div>
                </div>
              </div>
            </div>
            <div className="ButtonsWrapper flex flex-wrap content-center justify-center gap-10">
              <OneHalf item={item} />
              <TwoHalf item={item} />
              <ThreeHalf item={item} />
              <Nine item={item} />
              <OneY item={item} />
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default Edit;
