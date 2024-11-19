import Box from "@mui/material/Box";

import * as React from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
// import Divider from "@mui/material/Divider";

import HomeIcon from "@mui/icons-material/Home";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";

import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

import CompanyDetails from "./TransporterForm/CompanyDetails";
import ContactDetails from "./TransporterForm/ContactDetails";
import DocumentDetails from "./TransporterForm/DocumentDetails";
import VehicleDetails from "./TransporterForm/VehicleDetails";
import BankDetails from "./TransporterForm/BankDetails";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";

const TransporterAdd = ({ onBackClick }) => {
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  const [currentComponent, setCurrentComponent] = useState("A");
  const navigate = useNavigate();

  const renderComponent = () => {
    switch (currentComponent) {
      case "A":
        return (
          <CompanyDetails onNavigateNext={() => setCurrentComponent("B")} />
        );
      case "B":
        return (
          <ContactDetails onNavigateNext={() => setCurrentComponent("C")} />
        );
      case "C":
        return (
          <VehicleDetails onNavigateNext={() => setCurrentComponent("D")} />
        );
      case "D":
        return (
          <DocumentDetails onNavigateNext={() => setCurrentComponent("E")} />
        );
      case "E":
        return <BankDetails onNavigateNext={() => navigate("/transporter")} />;
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
          //   border: "1px solid grey",
          width: 1280,
          height: 1100,
          display: "flex",
          justifyContent: "space-evenly",
        }}
      >
        <Box
          sx={{
            // border: "1px solid grey",
            width: 230,
            height: 1050,
            bgcolor: "rgb(33, 34, 45)",
            color: "#fff",
          }}
        >
          <Box
            sx={{
              width: "100%",
              maxWidth: 360,
              bgcolor: "background.paper",
            }}
          >
            <List
              component="nav"
              aria-label="main mailbox folders"
              sx={{ bgcolor: "rgb(33, 34, 45)", color: "#fff" }}
            >
              <Box onClick={() => setCurrentComponent("A")}>
                <ListItemButton
                  selected={selectedIndex === 0}
                  onClick={onBackClick}
                >
                  <ListItemIcon>
                    <KeyboardBackspaceIcon
                      onClick={onBackClick}
                      sx={{ color: "#fff" }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary="Transporter Listing"
                    sx={{ color: "#fff" }}
                  />
                </ListItemButton>
              </Box>

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
                    <DescriptionOutlinedIcon sx={{ color: "#fff" }} />
                  </ListItemIcon>
                  <ListItemText primary="Document Details" />
                </ListItemButton>
              </Box>
              {/* <Divider /> */}
              <Box onClick={() => setCurrentComponent("E")}>
                <ListItemButton
                  selected={selectedIndex === 4}
                  onClick={(event) => handleListItemClick(event, 4)}
                  sx={{ minHeight: 65 }}
                >
                  <ListItemIcon>
                    <AccountBalanceOutlinedIcon sx={{ color: "#fff" }} />
                  </ListItemIcon>
                  <ListItemText primary="Bank Details" />
                </ListItemButton>
              </Box>
            </List>
          </Box>
        </Box>
        <Box
          sx={{
            // border: "1px solid grey",
            width: 1030,
            height: 1050,
            pt: 2,
            backgroundColor: "#fff",
          }}
        >
          {renderComponent()}
        </Box>
      </Box>
    </>
  );
};

export default TransporterAdd;



