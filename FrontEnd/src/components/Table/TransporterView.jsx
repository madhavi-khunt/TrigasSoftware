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
import EditIcon from "@mui/icons-material/Edit";
import BackupIcon from "@mui/icons-material/Backup";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Switch from "@mui/material/Switch";
import { styled } from "@mui/material/styles";

// import FormControlLabel from "@mui/material/FormControlLabel";

// import SearchIcon from "@mui/icons-material/Search";
import { useState, useEffect } from "react";
import axios from "axios";
import { Button, Checkbox, IconButton, Typography } from "@mui/material";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
// import TankerDetailsComponent from "./TankerDetailsComponent";
// import TankerDetails from "./TankerDetails";

const columns = [
  { id: "checkbox", minWidth: 10, align: "center", type: "checkbox" },
  { id: "index", label: "ID", minWidth: 10, align: "center" },
  {
    id: "transportercompanyname",
    label: "Transporter Name",
    minWidth: 190,
    align: "center",
  },
  { id: "createdby", label: "Created By", minWidth: 170 },
  { id: "createdon", label: "Created On", minWidth: 170, align: "center" },
  {
    id: "nooftankers",
    label: "No. of Tankers",
    minWidth: 170,
    align: "center",
  },
  { id: "active", label: "Status", minWidth: 170, align: "center" },
  { id: "action", label: "Action", align: "center" },
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

const TransporterView = () => {
  const [rows, setRows] = useState([]);

  // const [fetchedData, setFetchedData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/getlocalstorage")
      .then((response) => {
        console.log(response);

        const formattedData = response.data.map((item, index) => {
          // Parse the JSON strings into objects
          // const contactFormData = JSON.parse(item.data.contactFormData);
          const companyFormData = JSON.parse(item.data.companyFormData);
          // const productFormData = JSON.parse(item.data.productFormData);
          // const sapFormData = JSON.parse(item.data.sapFormData);
          // console.log(sapFormData.sapcodes);

          return {
            id: index + 1,
            transportercompanyname:
              companyFormData?.transportercompanyname || "N/A",

            createdby: companyFormData.createdby, // Ensure this field exists in companyFormData
            createdon: new Date(item.createdAt).toLocaleDateString(), // Format the createdOn date
            nooftankers: companyFormData.noofvehicle, // Ensure this field exists in sapFormData
            active: true,
            _id: item._id,
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
          // const contactFormData = JSON.parse(item.data.contactFormData);
          const companyFormData = JSON.parse(item.data.companyFormData);
          // const productFormData = JSON.parse(item.data.productFormData);
          // const sapFormData = JSON.parse(item.data.sapFormData);

          // Handle SAP data (assuming they are arrays)
          // const suppliers = sapFormData.suppliers
          //   ? sapFormData.suppliers.join(" , ")
          //   : "";
          // const sapcodes = sapFormData.sapcodes
          //   ? sapFormData.sapcodes.join(", ")
          //   : "";
          // const products = sapFormData.products
          //   ? sapFormData.products.join(" , ")
          //   : "";

          return {
            id: item.id,
            transportercompanyname: companyFormData.transportercompanyname,
            email: companyFormData.email,
            addressstreet1: companyFormData.addressstreet1,
            addressstreet2: companyFormData.addressstreet2,
            state: companyFormData.state,
            city: companyFormData.city,
            country: companyFormData.country,
            zipcode: companyFormData.zipcode,
            typeofcompany: companyFormData.typeofcompany,
            ourcompany: companyFormData.ourcompany,
            pannumber: companyFormData.pannumber,
            gstnumber: companyFormData.gstnumber,
            noofvehicle: companyFormData.noofvehicle,
            lpgvehicle: companyFormData.lpgvehicle,
            butanevehicle: companyFormData.butanevehicle,
            multivehicle: companyFormData.multivehicle,
            active: item.data.active,

            // contactFormData Details

            // namefororder: contactFormData.namefororder,
            // phonenumberfororder: contactFormData.phonenumberfororder,
            // nameforstock: contactFormData.nameforstock,
            // phonenumberforstock: contactFormData.phonenumberforstock,
            // nameforpayment: contactFormData.nameforpayment,
            // phonenumberforpayment: contactFormData.phonenumberforpayment,
            // nameforoperator: contactFormData.nameforoperator,
            // phonenumberforoperator: contactFormData.phonenumberforoperator,
            // nameforowner: contactFormData.emnameforownerail,
            // phonenumberforowner: contactFormData.phonenumberforowner,

            // Product Form Data Details

            // productsegment: productFormData.productsegment,
            // nokiln: productFormData.nokiln,
            // lengthofkiln: productFormData.lengthofkiln,
            // dailynaturalgasconsumption:
            //   productFormData.dailynaturalgasconsumption,
            // dailypropaneconsumption: productFormData.dailypropaneconsumption,
            // hourlypropaneconsumption: productFormData.hourlypropaneconsumption,
            // monthlypropaneconsumption:
            //   productFormData.monthlypropaneconsumption,
            // startingstock: productFormData.startingstock,
            // newpurchase: productFormData.newpurchase,
            // remaininghourseofstock: productFormData.remaininghourseofstock,

            // Sap CODE Form data deatils

            // suppliers: suppliers,
            // sapcodes: sapcodes,
            // products: products,
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

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // const filteredRows = rows.filter((row) =>
  //   row.transportercompanyname.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  return (
    <>
      {/* <Link
          to="/transportertable"
          component="div"
          sx={{ textDecoration: "none" }}
        > */}
      <Box
        style={{ width: "100%" }}
        sx={{
          height: 100,
          ml: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "start",
          // border: "1px solid red",
          cursor: "pointer",
        }}
      >
        <IconButton aria-label="Go Back" sx={{ mr: 1 }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography
          variant="h5"
          component="h2"
          sx={{ fontWeight: "bold", color: "#000" }}
        >
          Transporter Listing
        </Typography>
      </Box>
      {/* </Link> */}

      <Box
        style={{ width: "100%" }}
        sx={{
          height: "auto",
          ml: 1,
          p: 2,
          bgcolor: "#fff",
          color: "#000",
          display: "flex",
          flexWrap: "wrap", // Allows items to wrap to the next line if there's not enough space
          alignItems: "center",
          justifyContent: "start", // Align items to the left initially
          border: "1px solid #ccc",
          borderBottom: "none",
          borderRadius: "4px 4px 0px 0px", // Optional, adds rounded corners
        }}
      >
        {/* Search Input */}
        <Box sx={{ flexBasis: "30%", maxWidth: 250 }}>
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearchChange}
            style={{
              width: "100%",
              padding: "7px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
        </Box>
        {/* Active Button */}
        <Box sx={{ m: 1 }}>
          <Button
            variant="contained"
            sx={{ padding: "8px 10px" }}
            style={{
              background: "#47B87233", // Set background color
              color: "#47B872",
              border: "none", // Remove default button border
              // padding: "5px", // Adjust padding as necessary
              cursor: "pointer", // Make button clickable
              borderRadius: "4px",
            }}
          >
            Active
          </Button>
        </Box>
        {/* Inactive Button */}
        <Box sx={{ m: 1 }}>
          <Button
            variant="contained"
            sx={{ p: 1 }}
            style={{
              background: "#F3C32F33", // Set background color
              color: "#D4A20D",
              border: "none", // Remove default button border
              cursor: "pointer", // Make button clickable
              borderRadius: "4px",
            }}
          >
            Inactive
          </Button>
        </Box>
        {/*  */}
        {/* Spacer to push the export/import box to the end */}
        <Box sx={{ flexGrow: 1 }} />{" "}
        {/* This will push the next box to the right */}
        {/* Export and Import buttons (at the end) */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "end", // Align Export and Import at the end
            alignItems: "center",
            gap: 2, // Add space between the buttons
          }}
        >
          <Link to="" style={{ color: "#fff" }}>
            <LightTooltip title="Export" placement="top">
              <button
                onClick={handleExport}
                style={{
                  background: "#6362E6", // Set background color
                  border: "none", // Remove default button border
                  padding: "5px", // Adjust padding as necessary
                  cursor: "pointer", // Make button clickable
                  borderRadius: "4px", // Optional, adds rounded corners
                }}
              >
                <CloudDownloadIcon sx={{ fontSize: "2rem", color: "#fff" }} />
              </button>
            </LightTooltip>
          </Link>

          <Link to="" style={{ color: "#fff", textDecoration: "none" }}>
            <LightTooltip title="Import" placement="top">
              <button
                style={{
                  background: "#6362E6", // Set background color
                  border: "none", // Remove default button border
                  padding: "5px", // Adjust padding as necessary
                  cursor: "pointer", // Make button clickable
                  borderRadius: "4px", // Optional, adds rounded corners
                }}
              >
                <BackupIcon sx={{ fontSize: "2rem", color: "white" }}>
                  <input type="file" />
                </BackupIcon>
              </button>
            </LightTooltip>
          </Link>

          <Link to="/transporter">
            <LightTooltip title="Add Transporter" placement="top">
              {/* <GroupAddIcon sx={{ fontSize: "2rem", color: "#000" }} /> */}
              <button
                style={{
                  color: "#fff",
                  background: "#6362E6", // Set background color
                  border: "none", // Remove default button border
                  padding: "9px", // Adjust padding as necessary
                  cursor: "pointer", // Make button clickable
                  borderRadius: "4px", // Optional, adds rounded corners
                }}
              >
                Add New Transporter
              </button>
            </LightTooltip>
          </Link>
        </Box>
      </Box>

      <Paper
        style={{ width: "100%" }}
        sx={{
          overflow: "hidden",
          ml: 1,
          border: "1px solid #ccc",
          borderTop: "none",
        }}
      >
        {/* <TableContainer sx={{ maxHeight: 500 }}>
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
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>        
            <TableBody>
              {rows.map((row, index) => {
                const formattedValue = (index + 1).toString().padStart(3, "0");

                return (
                  <TableRow key={`row-${row.id}-${index}`}>
                    {" "}
                    {/* Use row._id for unique key */}
        {/* {columns.map((column) => {
                      let value;
                      if (column.id === "index") {
                        value = formattedValue;
                      } else {
                        value = row[column.id];
                      } */}
        {/* // Render checkbox in the "index" column
                      if (
                        column.id === "checkbox" &&
                        column.type === "checkbox"
                      ) {
                        return (
                          <TableCell
                            key={`${column.id}-${index}`}
                            align={column.align}
                          >
                            {" "}
                            {/* Use unique key for checkboxes */}
        {/* <Checkbox />
                          </TableCell>
                        );
                      } */}{" "}
        {/* } */}
        {/* // Apply border radius specifically to "nooftankers" column cells
                      if (column.id === "nooftankers") {
                        return (
                          <TableCell
                            key={`${column.id}-${index}`}
                            align={column.align}
                          >
                            <Link to={`/tankerdetail/view/${row.id}`}>
                              <Box
                                sx={{
                                  display: "inline-flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  width: 40, // Adjust size as needed
                                  height: 40,
                                  borderRadius: "50%",
                                  backgroundColor: "#6362E6", // Example color
                                  color: "#fff",
                                }}
                              >
                                {value}
                              </Box>
                            </Link>
                          </TableCell>
                        );
                      }

                      // Render "action" and "active" columns separately
                      if (column.id === "action") {
                        return (
                          <TableCell
                            key={`${column.id}-${index}`}
                            align={column.align}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                paddingLeft: "30px",
                                width: 170,
                              }}
                            >
                              <Link to={`/transporter/view/${row._id}`}>
                                <IconButton>
                                  <VisibilityIcon />
                                </IconButton>
                              </Link>
                              <Link to={`/transporter/edit/${row._id}`}>
                                <IconButton>
                                  <EditIcon />
                                </IconButton>
                              </Link>
                            </Box>
                          </TableCell>
                        );
                      }

                      if (column.id === "active") {
                        return (
                          <TableCell
                            key={`${column.id}-${index}`}
                            align={column.align}
                          >
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
                        <TableCell
                          key={`${column.id}-${index}`}
                          align={column.align}
                        >
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
        </TableContainer> */}{" "}
        {/* } */}
        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .filter((row) =>
                  row.transportercompanyname
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
                )
                .map((row) => (
                  <TableRow key={row.id}>
                    <TableCell align="center">
                      <Checkbox />
                    </TableCell>
                    <TableCell align="center">{row.id}</TableCell>
                    <TableCell align="center">
                      {row.transportercompanyname}
                    </TableCell>
                    <TableCell>{row.createdby}</TableCell>
                    <TableCell align="center">{row.createdon}</TableCell>

                    <TableCell align="center">
                      <Link
                        to={`/tankerdetail/view/${row._id}`}
                        style={{ textDecoration: "none" }}
                      >
                        <div
                          style={{
                            display: "inline-flex",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "40px", // Adjust size as needed
                            height: "40px", // Equal to width for perfect circle
                            // border: "1px solid black",
                            textDecoration: "none",
                            borderRadius: "50%",
                            backgroundColor: "#6262E6", // Optional: Add background color
                            fontWeight: "bold", // Optional: Make text bold
                            color: "#fff", // Text color
                          }}
                        >
                          {row.nooftankers}
                        </div>
                      </Link>
                    </TableCell>

                    <TableCell align="center">
                      <IOSSwitch checked={row.active} />
                    </TableCell>
                    <TableCell align="center">
                      <Link to={`/transporter/view/${row._id}`}>
                        <IconButton aria-label="View">
                          <VisibilityIcon />
                        </IconButton>
                      </Link>
                      <Link to={`/edittransporter/${row._id}`}>
                        <IconButton aria-label="Edit">
                          <EditIcon />
                        </IconButton>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
};

export default TransporterView;
