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

function Nine(item) {
  const { state } = GobalStorage();
  const [NineData, SetNineData] = useState();

  const [JE, SetJE] = useState();
  const [MR, SetMR] = useState();
  const [PCVBooster, SetPCVBooster] = useState();
  const [VitaminA, SetVitaminA] = useState();

  const [OpenNine, SetOpenNine] = useState(false);
  const handleOpenNine = () => {
    SetOpenNine(true);
    fetch("https://phc-api.onrender.com/GetNineData/" + item?.item?.item?._id)
      .then((res) => res.json())
      .then((json) => {
        SetNineData(json);
      });
  };
  const handleCloseNine = () => {
    SetOpenNine(false);
  };

  return (
    <div>
      <div
        className="Buttons_API_Call uppercase flex flex-wrap content-center justify-center cursor-pointer font-semibold tracking-wide select-none"
        onClick={handleOpenNine}
      >
        Nine Month
      </div>
      <Modal
        open={OpenNine}
        onClose={handleCloseNine}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="Header flex content-end justify-between p-5 min-w-full justify-self-start gap- ">
            <div className="text-2xl  ml-5 underline text-blue-700 font-semibold tracking-wide uppercase">
              Nine Month Data
            </div>
            <div
              className="text-4xl cursor-pointer select-none"
              onClick={handleCloseNine}
            >
              X
            </div>
          </div>
          <div>
            {NineData?.DateOfVacination ? (
              <div>
                <div className="flex content-center justify-center flex-col text-xl font-semibold gap-5">
                  <div className="flex content-center justify-between">
                    <div>JE status</div>
                    {NineData?.JE1 ? (
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
                    <div>MR status</div>
                    {NineData?.MR1 ? (
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
                    <div>PCV Booster status</div>
                    {NineData?.PCVBooster ? (
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
                    <div>Vitamin A status</div>
                    {NineData?.VitaminA1 ? (
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
                      SetOpenNine(false);
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
                      SetJE(!JE);
                    }}
                  >
                    <div className="flex content-center flex-wrap">
                      <div className="Radio ">
                        <div className={JE ? "Active" : "Passive"}></div>
                      </div>
                    </div>
                    <div>JE</div>
                  </div>
                  <div
                    className="cursor-pointer flex-wrap flex content-center justify-start gap-5"
                    onClick={() => {
                      SetMR(!MR);
                    }}
                  >
                    <div className="flex content-center flex-wrap">
                      <div className="Radio ">
                        <div className={MR ? "Active" : "Passive"}></div>
                      </div>
                    </div>
                    <div>MR</div>
                  </div>
                  <div
                    className="cursor-pointer flex-wrap flex content-center justify-start gap-5"
                    onClick={() => {
                      SetPCVBooster(!PCVBooster);
                    }}
                  >
                    <div className="flex content-center flex-wrap">
                      <div className="Radio ">
                        <div
                          className={PCVBooster ? "Active" : "Passive"}
                        ></div>
                      </div>
                    </div>
                    <div>PCV Booster</div>
                  </div>
                  <div
                    className="cursor-pointer flex-wrap flex content-center justify-start gap-5"
                    onClick={() => {
                      SetVitaminA(!VitaminA);
                    }}
                  >
                    <div className="flex content-center flex-wrap">
                      <div className="Radio ">
                        <div className={VitaminA ? "Active" : "Passive"}></div>
                      </div>
                    </div>
                    <div>Vitamin A</div>
                  </div>
                </div>
                <div className="flex flex-wrap content-center justify-center uppercase gap-8">
                  <div
                    className="DeleteModalBtn Cancel flex flex-wrap content-center justify-center  text-xl font-semibold"
                    onClick={() => {
                      SetOpenNine(false);
                    }}
                  >
                    Cancel
                  </div>
                  <div
                    className="DeleteModalBtn Delete flex flex-wrap content-center justify-center  text-xl font-semibold"
                    onClick={() => {
                      var ChildId = NineData?.ChildId;
                      fetch("https://phc-api.onrender.com/EditNineChildren", {
                        method: "post",
                        headers: {
                          Authorization: "Bearer " + state?.userToken,
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          ChildId: ChildId,
                          JE_1: JE,
                          MR_1: MR,
                          PCV_Booster: PCVBooster,
                          VitaminA_1: VitaminA,
                        }),
                      })
                        .then((res) => res.json())
                        .then((json) => {
                          SetOpenNine(false);
                        })
                        .catch((error) => console.error("Error:", error));
                    }}
                  >
                    Update
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

export default Nine;
