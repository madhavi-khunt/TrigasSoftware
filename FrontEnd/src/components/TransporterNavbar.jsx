import Box from "@mui/material/Box";

import * as React from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
// import Divider from "@mui/material/Divider";

import HomeIcon from "@mui/icons-material/Home";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import DescriptionIcon from "@mui/icons-material/Description";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import CompanyDetails from "./TransporterForm/CompanyDetails";
import ContactDetails from "./TransporterForm/ContactDetails";
import VehicleDetails from "./TransporterForm/VehicleDetails";
import DocumentDetails from "./TransporterForm/DocumentDetails";
import BankDetails from "./TransporterForm/BankDetails";

import { useState } from "react";
import { Link } from "react-router-dom";

const TransporterNavbar = () => {
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  const [currentComponent, setCurrentComponent] = useState("A");

  const renderComponent = () => {
    switch (currentComponent) {
      case "A":
        return <CompanyDetails />;
      case "B":
        return <ContactDetails />;
      case "C":
        return <VehicleDetails />;
      case "D":
        return <DocumentDetails />;
      case "E":
        return <BankDetails />;
      default:
        return <CompanyDetails />;
    }
  };

  return (
    <>
      <Box
        component="section"
        sx={{
          pt: 8,
          // border: "2px solid blue",
          width: 1380,
          height: 1100,
          display: "flex",
          justifyContent: "space-evenly",
        }}
      >
        <Box
          sx={{
            // border: "2px solid red",
            width: 290,
            height: 1000,
            bgcolor: "rgb(33, 34, 45)",
            color: "#fff",
          }}
        >
          <Box
            sx={{
              // width: "100%",
              maxWidth: 360,
              bgcolor: "background.paper",
            }}
          >
            <List
              component="nav"
              aria-label="main mailbox folders"
              sx={{ bgcolor: "rgb(33, 34, 45)", color: "#fff" }}
            >
              <Link to="/transportertable" style={{ textDecoration: "none" }}>
                <Box onClick={() => setCurrentComponent("A")}>
                  <ListItemButton
                    selected={selectedIndex === 0}
                    onClick={(event) => handleListItemClick(event, 0)}
                    sx={{ minHeight: 65 }}
                  >
                    <ListItemIcon>
                      <KeyboardBackspaceIcon sx={{ color: "#fff" }} />
                    </ListItemIcon>
                    <ListItemText
                      primary="Transporter Listing"
                      sx={{ color: "#fff" }}
                    />
                  </ListItemButton>
                </Box>
              </Link>
              <Box onClick={() => setCurrentComponent("A")}>
                <ListItemButton
                  selected={selectedIndex === 1}
                  onClick={(event) => handleListItemClick(event, 1)}
                  sx={{ minHeight: 65 }}
                >
                  <ListItemIcon>
                    <HomeIcon sx={{ color: "#fff" }} />
                  </ListItemIcon>
                  <ListItemText primary="Company Details" />
                </ListItemButton>
              </Box>
              {/* <Divider /> */}
              <Box onClick={() => setCurrentComponent("B")}>
                <ListItemButton
                  selected={selectedIndex === 2}
                  onClick={(event) => handleListItemClick(event, 2)}
                  sx={{ minHeight: 65 }}
                >
                  <ListItemIcon>
                    <PersonOutlineIcon sx={{ color: "#fff" }} />
                  </ListItemIcon>
                  <ListItemText primary="Contact Details" />
                </ListItemButton>
              </Box>
              {/* <Divider /> */}
              <Box onClick={() => setCurrentComponent("C")}>
                <ListItemButton
                  selected={selectedIndex === 3}
                  onClick={(event) => handleListItemClick(event, 3)}
                  sx={{ minHeight: 65 }}
                >
                  <ListItemIcon>
                    <LocalShippingOutlinedIcon sx={{ color: "#fff" }} />
                  </ListItemIcon>
                  <ListItemText primary="Vehicle Details" />
                </ListItemButton>
              </Box>
              {/* <Divider /> */}
              <Box onClick={() => setCurrentComponent("D")}>
                <ListItemButton
                  selected={selectedIndex === 4}
                  onClick={(event) => handleListItemClick(event, 4)}
                  sx={{ minHeight: 65 }}
                >
                  <ListItemIcon>
                    <DescriptionIcon sx={{ color: "#fff" }} />
                  </ListItemIcon>
                  <ListItemText primary="Document Details" />
                </ListItemButton>
              </Box>
              <Box onClick={() => setCurrentComponent("E")}>
                <ListItemButton
                  selected={selectedIndex === 4}
                  onClick={(event) => handleListItemClick(event, 4)}
                  sx={{ minHeight: 65 }}
                >
                  <ListItemIcon>
                    <CheckCircleOutlineIcon sx={{ color: "#fff" }} />
                  </ListItemIcon>
                  <ListItemText primary="Bank Details" />
                </ListItemButton>
              </Box>
            </List>
          </Box>
        </Box>
        <Box
          sx={{
            // border: "2px solid orange",
            width: "100%",
            height: 1000,
            pt: 2,
            ml: 1,
            backgroundColor: "#fff",
          }}
        >
          {renderComponent()}
        </Box>
      </Box>
    </>
  );
};

export default TransporterNavbar;
