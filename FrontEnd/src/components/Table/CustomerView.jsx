import Box from "@mui/material/Box";
// import { TextField } from "@mui/material";
import { Link } from "react-router-dom";
import { exportToExcel } from "./ExpotToExcel";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import HomeIcon from "@mui/icons-material/Home";
import EditIcon from "@mui/icons-material/Edit";
import BackupIcon from "@mui/icons-material/Backup";
import VisibilityIcon from "@mui/icons-material/Visibility";

import Switch from "@mui/material/Switch";
import { styled } from "@mui/material/styles";

import FormControlLabel from "@mui/material/FormControlLabel";

// import SearchIcon from "@mui/icons-material/Search";
import { useState, useEffect } from "react";
import axios from "axios";
import { IconButton } from "@mui/material";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";

const columns = [
  { id: "index", label: "ID", minWidth: 170, align: "center" },
  {
    id: "formattedCustomerCode",
    label: "Customer Code",
    minWidth: 170,
    align: "center",
  },
  { id: "companyname", label: "Customer Name", minWidth: 170 },

  { id: "team", label: "Team", minWidth: 170, align: "center" },
  {
    id: "primaryphonenumber",
    label: "Phone No.",
    minWidth: 170,
    align: "center",
  },
  {
    id: "active",
    label: "Active?",
    minWidth: 170,
    align: "center",
  },

  {
    id: "action",
    label: "Action",
    align: "center",
  },
];

// ----Switch---------
const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.mode === "dark" ? "#2ECA45" : "#65C466",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 22,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));
// ----Switch---------

const CustomerView = () => {
  const [rows, setRows] = useState([]);

  // const [fetchedData, setFetchedData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/getlocalstorage")
      .then((response) => {
        console.log(response);

        const formattedData = response.data.map((item, index) => {
          // Parse the JSON strings into objects
          const contactFormData = JSON.parse(item.data.contactFormData);
          const companyFormData = JSON.parse(item.data.companyFormData);
          // const productFormData = JSON.parse(item.data.productFormData);
          const sapFormData = JSON.parse(item.data.sapFormData);
          console.log(sapFormData.sapcodes);

          return {
            id: index + 1, // Create an ID from the index
            formattedCustomerCode: companyFormData.customercode, // Customer code
            companyname: companyFormData.companyname, // Company name
            team: companyFormData.team, // Team name
            primaryphonenumber: contactFormData.phonenumberfororder, // Phone number
            active: true, // Active status (placeholder)
            _id: item._id, // Mongoose _id
            // Add any other fields you need here
          };
        });
        setRows(formattedData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // const handleExport = () => {
  //   const exportData = rows.map((row) => ({
  //     id: row.id,
  //     formattedCustomerCode: row.formattedCustomerCode,
  //     companyname: row.companyname,
  //     team: row.team,
  //     primaryphonenumber: row.primaryphonenumber,
  //     active: row.active,
  //     _id: row._id, // Include the Mongoose _id field
  //     // Include any other fields you want to export
  //   }));

  //   exportToExcel(exportData, columns);
  // };
  const handleExport = () => {
    axios
      .get("http://localhost:5000/getlocalstorage")
      .then((response) => {
        const exportData = response.data.map((item) => {
          const contactFormData = JSON.parse(item.data.contactFormData);
          const companyFormData = JSON.parse(item.data.companyFormData);
          const productFormData = JSON.parse(item.data.productFormData);
          const sapFormData = JSON.parse(item.data.sapFormData);

          // Handle SAP data (assuming they are arrays)
          const suppliers = sapFormData.suppliers
            ? sapFormData.suppliers.join(" , ")
            : "";
          const sapcodes = sapFormData.sapcodes
            ? sapFormData.sapcodes.join(", ")
            : "";
          const products = sapFormData.products
            ? sapFormData.products.join(" , ")
            : "";

          return {
            id: item.id,
            customercode: companyFormData.customercode,
            companyname: companyFormData.companyname,
            email: companyFormData.email,
            primaryphonenumber: companyFormData.phonenumberfororder,
            secondaryphonenumber: companyFormData.secondaryphonenumber,
            addressstreet1: companyFormData.addressstreet1,
            addressstreet2: companyFormData.addressstreet2,
            state: companyFormData.state,
            city: companyFormData.city,
            country: companyFormData.country,
            zipcode: companyFormData.zipcode,
            associatessuppliers: companyFormData.associatessuppliers,
            team: companyFormData.team,
            typeofcompany: companyFormData.typeofcompany,
            licensenumber: companyFormData.licensenumber,
            ourcompany: companyFormData.ourcompany,
            tannumber: companyFormData.tannumber,
            gstnumber: companyFormData.gstnumber,
            pannumber: companyFormData.pannumber,
            licensevallidtill: companyFormData.licensevallidtill,
            licensecapacity: companyFormData.licensecapacity,
            latitude: companyFormData.latitude,
            longitude: companyFormData.longitude,
            transporter: companyFormData.transporter,
            active: item.data.active,

            // contactFormData Details

            namefororder: contactFormData.namefororder,
            phonenumberfororder: contactFormData.phonenumberfororder,
            nameforstock: contactFormData.nameforstock,
            phonenumberforstock: contactFormData.phonenumberforstock,
            nameforpayment: contactFormData.nameforpayment,
            phonenumberforpayment: contactFormData.phonenumberforpayment,
            nameforoperator: contactFormData.nameforoperator,
            phonenumberforoperator: contactFormData.phonenumberforoperator,
            nameforowner: contactFormData.emnameforownerail,
            phonenumberforowner: contactFormData.phonenumberforowner,

            // Product Form Data Details

            productsegment: productFormData.productsegment,
            nokiln: productFormData.nokiln,
            lengthofkiln: productFormData.lengthofkiln,
            dailynaturalgasconsumption:
              productFormData.dailynaturalgasconsumption,
            dailypropaneconsumption: productFormData.dailypropaneconsumption,
            hourlypropaneconsumption: productFormData.hourlypropaneconsumption,
            monthlypropaneconsumption:
              productFormData.monthlypropaneconsumption,
            startingstock: productFormData.startingstock,
            newpurchase: productFormData.newpurchase,
            remaininghourseofstock: productFormData.remaininghourseofstock,

            // Sap CODE Form data deatils

            suppliers: suppliers,
            sapcodes: sapcodes,
            products: products,
          };
        });
        exportToExcel(exportData, columns);
      })

      .catch((error) => {
        console.error("Error fetching full data for export:", error);
      });
  };
  // ------------Tooltip----------
  const LightTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.white,
      color: "rgba(0, 0, 0, 0.87)",
      boxShadow: theme.shadows[1],
      fontSize: 11,
    },
  }));
  // ------------Tooltip----------

  return (
    <>
      <Box
        style={{ width: "100%" }}
        sx={{
          height: 50,
          ml: 1,
          // border: "1px solid black",
          bgcolor: "rgb(33, 34, 45)",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "end",
        }}
      >
        <Box
          sx={{
            width: 190,
            // border: "1px solid yellow",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          <Link to="/dashboard">
            <LightTooltip title="Dashboard" placement="top">
              <HomeIcon sx={{ fontSize: "2rem", color: "#fff" }} />
            </LightTooltip>
          </Link>
          <Link to="/customer">
            <LightTooltip title="Add Customer" placement="top">
              <GroupAddIcon sx={{ fontSize: "2rem", color: "#fff" }} />
            </LightTooltip>
          </Link>
          <Link
            style={{
              color: "#fff",
            }}
          >
            <LightTooltip title="Export" placement="top">
              <CloudDownloadIcon
                onClick={handleExport}
                sx={{ fontSize: "2rem" }}
              />
            </LightTooltip>
          </Link>
          <Link
            style={{
              color: "#fff",
            }}
          >
            <LightTooltip title="Import" placement="top">
              <BackupIcon sx={{ fontSize: "2rem" }}>
                <input type="file" />
              </BackupIcon>
            </LightTooltip>
          </Link>
        </Box>
      </Box>
      <Paper style={{ width: "100%" }} sx={{ overflow: "hidden", ml: 1 }}>
        <TableContainer sx={{ maxHeight: 500 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{
                      minWidth: column.minWidth,
                      background: "whitesmoke",
                      color: "black",
                    }}
                  >
                    <b>{column.label}</b>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => {
                const formattedValue = (index + 1).toString().padStart(3, "0");

                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                    {columns.map((column) => {
                      let value;
                      if (column.id === "index") {
                        value = formattedValue;
                        // } else if (column.id === "formattedCustomerCode") {
                        //   value = formattedValue;
                      } else {
                        value = row[column.id];
                      }

                      // Render "action" and "active" columns separately to avoid duplication
                      if (column.id === "action") {
                        return (
                          <TableCell key={column.id} align={column.align}>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                paddingLeft: "30px",
                                width: 170,
                              }}
                            >
                              <Link to={`/customer/view/${row._id}`}>
                                <IconButton>
                                  <VisibilityIcon />
                                </IconButton>
                              </Link>

                              <IconButton>
                                <Link to={`/customer/edit/${row._id}`}>
                                  <EditIcon />
                                </Link>
                              </IconButton>
                            </Box>
                          </TableCell>
                        );
                      }

                      if (column.id === "active") {
                        return (
                          <TableCell key={column.id} align={column.align}>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                paddingLeft: "45px",
                                width: 170,
                              }}
                            >
                              <FormControlLabel
                                control={
                                  <IOSSwitch sx={{ m: 0 }} defaultChecked />
                                }
                              />
                            </Box>
                          </TableCell>
                        );
                      }

                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
};

export default CustomerView;
