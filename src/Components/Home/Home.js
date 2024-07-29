import React, { useEffect, useState } from "react";
import NavBar from "../../Common/NavBar/NavBar";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { RiEyeLine } from "react-icons/ri";
import "./Home.css";
// import Delete from "../Delete/Delete";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
  border: "1px solid black",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "20ch",
      "&:focus": {
        width: "25ch",
      },
    },
  },
}));

const Home = () => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch("https://phc-api.onrender.com/Childrens")
      .then((res) => res.json())
      .then((json) => {
        setData(json);
      });
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredData = data.filter((item) =>
    item?.BirthRegNo?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="HomeWrapper">
      <NavBar />
      <div className="flex content-center justify-between ml-10 mr-10 mt-5">
        <div className="flex content-center justify-center text-xl uppercase font-bold underline">
          Childrens
        </div>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search by RegNo…"
            inputProps={{ "aria-label": "search" }}
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </Search>
      </div>
      <div className="HomeTableMainWrapper flex flex-wrap content-center justify-center ">
        <div className="HomeTableWrapper flex flex-wrap flex-col content-center justify-center">
          <div className="TableHeader">
            <div className="flex justify-center content-center">Name</div>
            <div className="flex justify-center content-center">
              Father's Name
            </div>
            <div className="flex justify-center content-center">Address</div>
            <div className="flex justify-center content-center">Phone no.</div>
            <div className="flex justify-center content-center">Regno</div>
            <div className="flex justify-center content-center">D.O.B</div>
            <div className="flex justify-center content-center">
              Actions Buttons
            </div>
          </div>
          <div className="TableBodyWrapper flex flex-wrap flex-col gap-0">
            {filteredData.map((item, index) => {
              const formattedDate = new Date(item?.DOB)
                .toISOString()
                .split("T")[0];
              return (
                <div key={index} className="TableBody flex">
                  <div className="flex justify-center items-center">
                    {item?.Name}
                  </div>
                  <div className="flex justify-center items-center">
                    {item?.FatherName}
                  </div>
                  <div className="flex justify-center items-center">
                    {item?.Address}
                  </div>
                  <div className="flex justify-center items-center">
                    {item?.PhoneNumber}
                  </div>
                  <div className="flex justify-center items-center">
                    {item?.BirthRegNo}
                  </div>
                  <div className="flex justify-center items-center">
                    {formattedDate}
                  </div>
                  <div className="flex justify-center items-center gap-3 text-xl">
                    <div className="cursor-pointer">
                      <RiEyeLine />
                    </div>
                    {/* <Delete item={item} /> */}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
