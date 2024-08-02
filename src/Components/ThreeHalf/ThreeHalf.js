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
  width: "50%",
  height: "70%",
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

function ThreeHalf(item) {
  const { state } = GobalStorage();

  const [ThreeHalfData, SetThreeHalfData] = useState();

  const [IPV, SetIPV] = useState();
  const [OPV, SetOPV] = useState();
  const [PCV, SetPCV] = useState();
  const [Penta, SetPenta] = useState();
  const [Rota, SetRota] = useState();

  const [OpenThreeHalf, SetOpenThreeHalf] = useState(false);
  const handleOpenThreeHalf = () => {
    fetch(
      "https://phc-api.onrender.com/GetThree_HalfData/" + item?.item?.item?._id
    )
      .then((res) => res.json())
      .then((json) => {
        SetOpenThreeHalf(true);
        SetThreeHalfData(json);
      });
  };
  const handleCloseThreeHalf = () => {
    SetOpenThreeHalf(false);
  };

  return (
    <div>
      <div
        className="Buttons_API_Call uppercase flex flex-wrap content-center justify-center cursor-pointer font-semibold tracking-wide select-none"
        onClick={handleOpenThreeHalf}
      >
        Three Half Month
      </div>
      <Modal
        open={OpenThreeHalf}
        onClose={handleCloseThreeHalf}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="Header flex content-end justify-between p-5 min-w-full justify-self-start gap- ">
            <div className="text-2xl  ml-5 underline text-blue-700 font-semibold tracking-wide uppercase">
              Three and Half Month Data
            </div>
            <div
              className="text-4xl cursor-pointer select-none"
              onClick={handleCloseThreeHalf}
            >
              X
            </div>
          </div>
          <div>
            {ThreeHalfData?.DateOfVacination ? (
              <div>
                <div className="flex content-center justify-center flex-col text-xl font-semibold gap-5">
                  <div className="flex content-center justify-between">
                    <div>OPV status</div>
                    {ThreeHalfData?.OPV3 ? (
                      <div className="tickflex content-center justify-center flex-wrap">
                        <FaCheck />
                      </div>
                    ) : (
                      <div className="cross flex content-center justify-center flex-wrap">
                        <FaX />
                      </div>
                    )}
                  </div>
                  <div className="flex content-center justify-between">
                    <div>IPV status</div>
                    {ThreeHalfData?.IPV2 ? (
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
                    <div>PCV status</div>
                    {ThreeHalfData?.PCV2 ? (
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
                    {ThreeHalfData?.Penta3 ? (
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
                    {ThreeHalfData?.Rota3 ? (
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
                      SetOpenThreeHalf(false);
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
                      SetIPV(!IPV);
                    }}
                  >
                    <div className="flex content-center flex-wrap">
                      <div className="Radio ">
                        <div className={IPV ? "Active" : "Passive"}></div>
                      </div>
                    </div>
                    <div>IPV</div>
                  </div>
                  <div
                    className="cursor-pointer flex-wrap flex content-center justify-start gap-5"
                    onClick={() => {
                      SetPCV(!PCV);
                    }}
                  >
                    <div className="flex content-center flex-wrap">
                      <div className="Radio ">
                        <div className={PCV ? "Active" : "Passive"}></div>
                      </div>
                    </div>
                    <div>PCV</div>
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
                      SetOpenThreeHalf(false);
                    }}
                  >
                    Cancel
                  </div>
                  <div
                    className=" flex flex-wrap content-center justify-center  text-xl font-semibold"
                    onClick={() => {
                      var ChildId = ThreeHalfData?.ChildId;
                      fetch(
                        "https://phc-api.onrender.com/EditThree_HalfChildren",
                        {
                          method: "post",
                          headers: {
                            Authorization: "Bearer " + state?.userToken,
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify({
                            ChildId: ChildId,
                            OPV_3: OPV,
                            Penta_3: Penta,
                            Rota_3: Rota,
                            PCV_2: PCV,
                            IPV_2: IPV,
                          }),
                        }
                      )
                        .then((res) => res.json())
                        .then((json) => {
                          toast.success(json.error);
                          SetOpenThreeHalf(false);
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

export default ThreeHalf;
