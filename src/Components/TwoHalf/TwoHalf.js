import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { FaX } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa";
import { GobalStorage } from "../../Context/GobalStorage";

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

function TwoHalf(item) {
  const { state } = GobalStorage();
  const [OPV, SetOPV] = useState();
  const [Penta, SetPenta] = useState();
  const [Rota, SetRota] = useState();
  const [OpenTwoHalf, SetOpenTwoHalf] = useState(false);
  const [TwoHalfData, SetTwoHalfData] = useState();
  const handleOpenTwoHalf = () => {
    SetOpenTwoHalf(true);
    fetch(
      "https://phc-api.onrender.com/GetTwo_HalfData/" + item?.item?.item?._id
    )
      .then((res) => res.json())
      .then((json) => {
        SetTwoHalfData(json);
      });
  };
  const handleCloseTwoHalf = () => {
    SetOpenTwoHalf(false);
  };
  return (
    <div>
      <div
        className="Buttons_API_Call uppercase flex flex-wrap content-center justify-center cursor-pointer font-semibold tracking-wide select-none"
        onClick={handleOpenTwoHalf}
      >
        Two Half Month
      </div>

      <Modal
        open={OpenTwoHalf}
        onClose={handleCloseTwoHalf}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="Header flex content-end justify-between p-5 min-w-full justify-self-start gap- ">
            <div className="text-2xl  ml-5 underline text-blue-700 font-semibold tracking-wide uppercase">
              Two and Half Month
            </div>
            <div
              className="text-4xl cursor-pointer select-none"
              onClick={handleCloseTwoHalf}
            >
              X
            </div>
          </div>
          <div>
            {TwoHalfData?.DateOfVacination ? (
              <div>
                <div className="flex content-center justify-center flex-col text-xl font-semibold gap-5">
                  <div className="flex content-center justify-between">
                    <div>OPV status</div>
                    {TwoHalfData?.OPV2 ? (
                      <div className="tick flex content-center justify-center flex-wrap">
                        <FaCheck />
                      </div>
                    ) : (
                      <div className="cross flex content-center justify-center flex-wrap">
                        <FaX />
                      </div>
                    )}
                  </div>
                  <div className="flex content-center justify-between">
                    <div>Penta status</div>
                    {TwoHalfData?.Penta2 ? (
                      <div className="tick flex content-center justify-center flex-wrap">
                        <FaCheck />
                      </div>
                    ) : (
                      <div className="cross flex content-center justify-center flex-wrap">
                        <FaX />
                      </div>
                    )}
                  </div>
                  <div className="flex content-center justify-between">
                    <div>Rota status</div>
                    {TwoHalfData?.Rota2 ? (
                      <div className="tick flex content-center justify-center flex-wrap">
                        <FaCheck />
                      </div>
                    ) : (
                      <div className="cross flex content-center justify-center flex-wrap">
                        <FaX />
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex flex-wrap content-center justify-center uppercase gap-8">
                  <div
                    className="DeleteModalBtn Cancel flex flex-wrap content-center justify-center  text-xl font-semibold"
                    onClick={() => {
                      SetOpenTwoHalf(false);
                    }}
                  >
                    OKAY
                  </div>
                </div>
              </div>
            ) : (
              <div className="select-none flex flex-col content-center justify-center text-xl font-semibold ">
                <div className="flex flex-col content-center justify-center gap-2">
                  <div
                    className="cursor-pointer flex-wrap flex content-center justify-start gap-5"
                    onClick={() => {
                      SetOPV(!OPV);
                    }}
                  >
                    <div className="flex content-center flex-wrap">
                      <div className="Radio ">
                        <div className={OPV ? "Active" : "Passive"}></div>
                      </div>
                    </div>
                    <div>OPV</div>
                  </div>
                  <div
                    className="cursor-pointer flex-wrap flex content-center justify-start gap-5"
                    onClick={() => {
                      SetPenta(!Penta);
                    }}
                  >
                    <div className="flex content-center flex-wrap">
                      <div className="Radio ">
                        <div className={Penta ? "Active" : "Passive"}></div>
                      </div>
                    </div>
                    <div>Penta</div>
                  </div>
                  <div
                    className="cursor-pointer flex-wrap flex content-center justify-start gap-5"
                    onClick={() => {
                      SetRota(!Rota);
                    }}
                  >
                    <div className="flex content-center flex-wrap">
                      <div className="Radio ">
                        <div className={Rota ? "Active" : "Passive"}></div>
                      </div>
                    </div>
                    <div>Rota</div>
                  </div>
                </div>
                <div className="flex flex-wrap content-center justify-center uppercase gap-8">
                  <div
                    className="DeleteModalBtn Cancel flex flex-wrap content-center justify-center  text-xl font-semibold"
                    onClick={() => {
                      SetOpenTwoHalf(false);
                    }}
                  >
                    Cancel
                  </div>
                  <div
                    className="flex flex-wrap content-center justify-center  text-xl font-semibold"
                    onClick={() => {
                      var ChildId = TwoHalfData?.ChildId;
                      fetch(
                        "https://phc-api.onrender.com/EditTwo_HalfChildren",
                        {
                          method: "post",
                          headers: {
                            Authorization: "Bearer " + state?.userToken,
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify({
                            ChildId: ChildId,
                            OPV_2: OPV,
                            Penta_2: Penta,
                            Rota_2: Rota,
                          }),
                        }
                      )
                        .then((res) => res.json())
                        .then((json) => {
                          SetOpenTwoHalf(false);
                        })
                        .catch((error) => console.error("Error:", error));
                    }}
                  >
                    <div className="DeleteModalBtn Delete flex content-center justify-center flex-wrap">
                      Update
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default TwoHalf;
