import React, { useState } from "react";
import NavBar from "../../Common/NavBar/NavBar";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import "./Register.css";
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

function Register() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [Name, SetName] = useState("");
  const [FatherName, SetFatherName] = useState("");
  const [MotherName, SetMotherName] = useState("");
  const [Gender, SetGender] = useState("");
  const [Address, SetAddress] = useState("");
  const [PhoneNumber, SetPhoneNumber] = useState("");
  const [Email, SetEmail] = useState("");
  const [DOB, SetDOB] = useState("");
  const [District, SetDistrict] = useState("");
  const [PHCTown, SetPCHTown] = useState("");
  const [RegNo, SetRegNo] = useState("");
  const [BCC, SetBCC] = useState(false);
  const [OPVO, SetOPVO] = useState(false);
  const [HEPB, SetHEPB] = useState(false);

  function formatDate(date) {
    const d = new Date(date);
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const year = d.getFullYear();
    return `${year}-${month}-${day}`;
  }

  function Submit() {
    if (
      !Name ||
      !FatherName ||
      !MotherName ||
      !PhoneNumber ||
      !Email ||
      !DOB ||
      !Address ||
      !PHCTown ||
      !District ||
      !Gender ||
      !RegNo ||
      !BCC ||
      !OPVO ||
      !HEPB
    ) {
      toast.warn("Please Input all the fields");
    } else {
      fetch("https://phc-api.onrender.com/addChildren", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Name,
          FatherName,
          MotherName,
          PhoneNumber,
          Email,
          DOB: formatDate(DOB),
          Address,
          PHCTown,
          Distric: District,
          Gender,
          BirthRegNo: RegNo,
          BCC,
          OPV0: OPVO,
          HepB: HEPB,
        }),
      })
        .then((res) => res.json())
        .then((json) => {
          toast.success(json.error);
        });
    }
  }

  const genders = ["Male", "Female"];

  return (
    <div className="Registor_Wrapper">
      <NavBar />
      <div className="flex content-center justify-start mt-10 pl-10 text-xl uppercase font-bold underline ">
        Registration
      </div>
      <div className="Registration_Block_Wrapper flex content-center justify-center mt-7">
        <div className="Registration_Primary">
          <div className="Registration_Block">
            <div className="Registation_Form_Fields flex content-center justify-start gap-6">
              <label className="Input_Label">Name</label>
              <input
                className="Input_Field"
                value={Name}
                onChange={(e) => {
                  SetName(e.target.value);
                }}
              />
            </div>

            <div className="Registation_Form_Fields flex content-center justify-start gap-6">
              <label className="Input_Label">Father Name</label>
              <input
                className="Input_Field"
                value={FatherName}
                onChange={(e) => {
                  SetFatherName(e.target.value);
                }}
              />
            </div>

            <div className="Registation_Form_Fields flex content-center justify-start gap-6">
              <label className="Input_Label">Mother Name</label>
              <input
                className="Input_Field"
                value={MotherName}
                onChange={(e) => {
                  SetMotherName(e.target.value);
                }}
              />
            </div>

            <div className="Registation_Form_Fields flex content-center justify-start gap-6">
              <label className="Input_Label">Gender</label>
              <select
                className="Input_Field"
                value={Gender}
                onChange={(e) => {
                  SetGender(e.target.value);
                }}
              >
                <option value="">Select Gender</option>
                {genders.map((gender) => (
                  <option key={gender} value={gender}>
                    {gender}
                  </option>
                ))}
              </select>
            </div>

            <div className="Registation_Form_Fields flex content-center justify-start gap-6">
              <label className="Input_Label">Address</label>
              <input
                className="Input_Field"
                value={Address}
                onChange={(e) => {
                  SetAddress(e.target.value);
                }}
              />
            </div>

            <div className="Registation_Form_Fields flex content-center justify-start gap-6">
              <label className="Input_Label">Phone number</label>
              <input
                className="Input_Field"
                type="number"
                value={PhoneNumber}
                onChange={(e) => {
                  SetPhoneNumber(e.target.value);
                }}
              />
            </div>

            <div className="Registation_Form_Fields flex content-center justify-start gap-6">
              <label className="Input_Label">Email</label>
              <input
                className="Input_Field"
                type="email"
                value={Email}
                onChange={(e) => {
                  SetEmail(e.target.value);
                }}
              />
            </div>

            <div className="Registation_Form_Fields flex content-center justify-start gap-6">
              <label className="Input_Label">Date of Birth</label>
              <input
                className="Input_Field"
                type="date"
                value={DOB}
                onChange={(e) => {
                  SetDOB(e.target.value);
                }}
              />
            </div>

            <div className="Registation_Form_Fields flex content-center justify-start gap-6">
              <label className="Input_Label">District</label>
              <input
                className="Input_Field"
                value={District}
                onChange={(e) => {
                  SetDistrict(e.target.value);
                }}
              />
            </div>

            <div className="Registation_Form_Fields flex content-center justify-start gap-6">
              <label className="Input_Label">P.H.C/Town</label>
              <input
                className="Input_Field"
                value={PHCTown}
                onChange={(e) => {
                  SetPCHTown(e.target.value);
                }}
              />
            </div>

            <div className="Registation_Form_Fields flex content-center justify-start gap-6">
              <label className="Input_Label">Birth Reg No</label>
              <input
                className="Input_Field"
                value={RegNo}
                onChange={(e) => {
                  SetRegNo(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="Submit_Button" onClick={handleOpen}>
            Next Step
          </div>
        </div>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="Header flex content-end justify-between p-10 min-w-full justify-self-start ">
            <div></div>
            <div
              className="text-4xl cursor-pointer select-none"
              onClick={handleClose}
            >
              X
            </div>
          </div>
          <div
            className="flex  flex-wrap content-center justify-center gap-5 cursor-pointer select-none"
            onClick={() => {
              if (BCC) {
                SetBCC(false);
              } else SetBCC(true);
            }}
          >
            <div className="flex content-center flex-wrap">
              <div className="Radio ">
                <div className={BCC ? "Active" : "Passive"}></div>
              </div>
            </div>
            <div className="Input_Label">BCC</div>
          </div>
          <div
            className="flex content-center justify-center gap-5 cursor-pointer select-none"
            onClick={() => {
              if (OPVO) {
                SetOPVO(false);
              } else SetOPVO(true);
            }}
          >
            <div className="flex content-center flex-wrap">
              <div className="Radio ">
                <div className={OPVO ? "Active" : "Passive"}></div>
              </div>
            </div>
            <div className="Input_Label">OPV-0</div>
          </div>
          <div
            className="flex content-center justify-center gap-5 cursor-pointer select-none"
            onClick={() => {
              if (HEPB) {
                SetHEPB(false);
              } else SetHEPB(true);
            }}
          >
            <div className="flex content-center flex-wrap">
              <div className="Radio ">
                <div className={HEPB ? "Active" : "Passive"}></div>
              </div>
            </div>
            <div className="Input_Label">HEP-B</div>
          </div>
          <div className="Submit_Button mt-10" onClick={handleClose}>
            <div onClick={Submit}>Submit</div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default Register;
