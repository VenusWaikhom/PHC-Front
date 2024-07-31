import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { FaX } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa";
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

function OneY(item) {
  const { state } = GobalStorage();

  const [OneYData, SetOneYData] = useState();

  const [DPTBooster, SetDPTBooster] = useState();
  const [JE, SetJE] = useState();
  const [MR, SetMR] = useState();
  const [OPVBooster, SetOPVBooster] = useState();
  const [VitaminA, SetVitaminA] = useState();

  const [OpenOneY, SetOpenOneY] = useState(false);
  const handleOpenOneY = () => {
    fetch("https://phc-api.onrender.com/GetOneYData/" + item?.item?.item?._id)
      .then((res) => res.json())
      .then((json) => {
        SetOneYData(json);
        SetOpenOneY(true);
      });
  };
  const handleCloseOneY = () => {
    SetOpenOneY(false);
  };

  return (
    <div>
      <div
        className="Buttons_API_Call uppercase flex flex-wrap content-center justify-center cursor-pointer font-semibold tracking-wide select-none"
        onClick={handleOpenOneY}
      >
        One Year
      </div>
      <Modal
        open={OpenOneY}
        onClose={handleCloseOneY}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="Header flex content-end justify-between p-5 min-w-full justify-self-start gap- ">
            <div className="text-2xl  ml-5 underline text-blue-700 font-semibold tracking-wide uppercase">
              One Year Data
            </div>
            <div
              className="text-4xl cursor-pointer select-none"
              onClick={handleCloseOneY}
            >
              X
            </div>
          </div>
          <div>
            {OneYData?.DateOfVacination ? (
              <div>
                <div className="flex content-center justify-center flex-col text-xl font-semibold gap-5">
                  <div className="flex content-center justify-between">
                    <div>DPT Booster status</div>
                    {OneYData?.DPTBooster1 ? (
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
                    <div>JE status</div>
                    {OneYData?.JE2 ? (
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
                    {OneYData?.MR2 ? (
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
                    <div>OPV Booster status</div>
                    {OneYData?.OPVBosster ? (
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
                    {OneYData?.VitaminA2 ? (
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
                      SetOpenOneY(false);
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
                      SetDPTBooster(!DPTBooster);
                    }}
                  >
                    <div className="flex content-center flex-wrap">
                      <div className="Radio ">
                        <div
                          className={DPTBooster ? "Active" : "Passive"}
                        ></div>
                      </div>
                    </div>
                    <div>DPT Booster</div>
                  </div>
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
                      SetOPVBooster(!OPVBooster);
                    }}
                  >
                    <div className="flex content-center flex-wrap">
                      <div className="Radio ">
                        <div
                          className={OPVBooster ? "Active" : "Passive"}
                        ></div>
                      </div>
                    </div>
                    <div>OPV Booster</div>
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
                      SetOpenOneY(false);
                    }}
                  >
                    Cancel
                  </div>
                  <div
                    className=" flex flex-wrap content-center justify-center  text-xl font-semibold"
                    onClick={() => {
                      var ChildId = OneYData?.ChildId;
                      fetch(
                        "https://phc-api.onrender.com/EditOneYearChildren",
                        {
                          method: "post",
                          headers: {
                            Authorization: "Bearer " + state?.userToken,
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify({
                            ChildId: ChildId,
                            OPVBosster: OPVBooster,
                            JE2: JE,
                            MR2: MR,
                            DPTBooster1: DPTBooster,
                            VitaminA2: VitaminA,
                          }),
                        }
                      )
                        .then((res) => res.json())
                        .then((json) => {
                          toast.success(json.error);
                          SetOpenOneY(false);
                        })
                        .catch((error) => toast.error(error));
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

export default OneY;
