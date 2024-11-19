import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import Button from "@mui/material/Button";
import { Link, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import { styled } from "@mui/material/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
// import Typography from "@mui/material/Typography";
import axios from "axios";
import {
  Button,
  Chip,
  InputAdornment,
  Pagination,
  Paper,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
// import DeleteIcon from "@mui/icons-material/Delete";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import SearchIcon from "@mui/icons-material/Search";

const TankerDetailsComponent = () => {
  const { id } = useParams(); // get the ID from the route params

  const [bankFormData, setBankFormData] = useState({});
  const [contactFormData, setContactFormData] = useState({});
  const [tankerNumbers, setTankerNumbers] = useState([]);
  const [companyData, setCompanyData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // console.log(tankerNumbers);
  const [tankerData, setTankerData] = useState([]);
  useEffect(() => {
    if (!id) return; // Only proceed if `id` is defined

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/getlocalstorage/${id}`
        );

        const rawData = response.data;
        console.log(rawData);

        // Parse serialized JSON data and update states
        setBankFormData(JSON.parse(rawData.data.BankFormData || "{}"));
        setContactFormData(JSON.parse(rawData.data.contactFormData || "{}"));
        setTankerNumbers(JSON.parse(rawData.data.TankerFormData || "[]"));
        setCompanyData(JSON.parse(rawData.data.companyFormData || "{}"));

        const parsedTankerData = JSON.parse(
          rawData.data.TankerFormData || "{}"
        );
        const tankers = (parsedTankerData.tankernumber || []).map(
          (tanker, index) => ({
            number: tanker,
            capacity: parsedTankerData.tankercapacitys[index] || "N/A",
            product: parsedTankerData.products[index] || "N/A",
            availability: "Available", // Default value (or map from another field if applicable)
            status: "Active", // Default value (or map from another field if applicable)
            geoLocation: "Not Available", // Default value (or map from another field if applicable)
          })
        );

        setTankerData(tankers);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching customer data:", error);
        setIsLoading(false); // Stop loading even if there's an error
      }
    };

    fetchData();
  }, [id]);

  const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
  ))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&::before": {
      display: "none",
    },
  }));

  const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
      expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
      {...props}
    />
  ))(({ theme }) => ({
    backgroundColor: "rgba(0, 0, 0, .03)",
    flexDirection: "row-reverse",
    "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
      transform: "rotate(90deg)",
    },
    "& .MuiAccordionSummary-content": {
      marginLeft: theme.spacing(1),
    },
    ...theme.applyStyles("dark", {
      backgroundColor: "rgba(255, 255, 255, .05)",
    }),
  }));

  const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: "1px solid rgba(0, 0, 0, .125)",
  }));
  const [expanded, setExpanded] = React.useState("panel1");

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const [page, setPage] = useState(1);

  const handleToggleStatus = () => {};

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <div
      style={{
        // border: "1px solid blue",
        width: "auto",
        paddingRight: "50px",
        marginBottom: "100px",
      }}
    >
      <Box
        sx={{
          flexGrow: 1,
          width: "100%",
          mx: 5,
          my: 3,
          //   border: "1px solid red",
          height: "auto",
          // p: 3,
        }}
      >
        <Typography variant="h5" component="div">
          <Link to="/transportertable">
            <ArrowBackIcon
              sx={{
                fontWeight: 500,
                fontSize: 25,
                mr: 1,
                color: "darkblue",
              }}
            />
          </Link>
          <span style={{ fontWeight: "bold", fontSize: "30px" }}>
            Tanker Numbers
          </span>
        </Typography>
        <Typography variant="p" component="div" sx={{ m: 1 }}>
          <span style={{ color: "blue" }}>
            <Link to="/transportertable" style={{ textDecoration: "none" }}>
              Tanker Numbers
            </Link>
          </span>
          / Tanker Numbers
        </Typography>
      </Box>
      <Box
        sx={{
          boxShadow: 3,
          // flexGrow: 1,
          display: "flex",
          // flexWrap: "wrap",
          flexDirection: "column",
          width: "100%",
          ml: 5,
          p: 2,
          //   margin: "10px 50px",
          background: "#fff",
          //   border: "1px solid red",
          borderRadius: "10px",
          height: "auto",
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
            width: "100%",
            // border: "1px solid red",
            height: "auto",
            mb: 2,
          }}
        >
          <Typography
            variant="h5"
            sx={{ fontWeight: 600, p: 1 }}
            component="div"
          >
            <b>Tanker Statistics</b>
          </Typography>
        </Box>
        <div
          style={{
            width: "100%",
            height: "auto",
            // backgroundColor: "#f4f4f4",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "start",
            // border: "1px solid black",
            flexWrap: "wrap",
            p: 4,
            // padding: "50px",
          }}
        >
          <Accordion
            style={{
              flexBasis: "32%",
              borderRadius: "10px",
              border: "none",
              marginBottom: "20px",
            }}
            expanded={expanded === "panel4"}
            onChange={handleChange("panel4")}
          >
            <AccordionSummary
              expandIcon={
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    // border: "2px solid #6362E5", // Add border to the arrow
                    background: "#B8B8F3",
                    borderRadius: "8px", // Make the border circular around the arrow
                    padding: "8px", // Optional, adjust for better spacing
                    marginRight: "30px",
                  }}
                >
                  <ExpandMoreIcon sx={{ color: "#fff" }} />
                </Box>
              }
              aria-controls="panel4bh-content"
              id="panel4bh-header"
              sx={{
                background: "#D2D2F7",
                borderRadius: "10px",
                height: "160px",
                display: "flex",
                alignItems: "center",
                flexDirection: "row", // Default: Text on the left, arrow on the right
                paddingLeft: "16px", // Adjust padding for better spacing
                paddingRight: 0,
                mb: 1, // Remove right padding
              }}
            >
              <Box
                sx={{
                  textAlign: "center",
                  flexGrow: 1,
                }}
              >
                <Typography
                  sx={{
                    color: "#6362E5",
                    display: "flex",
                    fontSize: "15px",
                    flexDirection: "column",
                    alignItems: "start", // Align the text to the left
                  }}
                >
                  Propane
                  <Typography
                    variant="subtitle2"
                    sx={{
                      color: "#6362E5",
                      fontWeight: "bold",
                      fontSize: "32px",
                      fontFamily: "Roboto",
                    }}
                  >
                    {companyData.propanevehicle}
                  </Typography>
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails
              sx={{ border: "1px solid #898C8E33", borderRadius: "8px" }}
            >
              <Typography>
                <TableContainer component={Paper}>
                  <Table
                    // sx={{ minWidth: 650 }}
                    size="small"
                    aria-label="a dense table"
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">Quantity</TableCell>
                        <TableCell align="center">No. of Tankers</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {/* {rows.map((row) => ( */}
                      <TableRow
                        //   key={row.name}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row" align="center">
                          {/* {row.name} */}abc
                        </TableCell>
                        <TableCell align="center">
                          {/* {row.calories} */}abc
                        </TableCell>
                      </TableRow>

                      {/* ))} */}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion
            style={{
              flexBasis: "32%",
              borderRadius: "10px",
              border: "none",
              marginBottom: "20px",
            }}
            expanded={expanded === "panel3"}
            onChange={handleChange("panel3")}
          >
            <AccordionSummary
              expandIcon={
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    // border: "2px solid #6362E5", // Add border to the arrow
                    background: "#B8B8F3",
                    borderRadius: "8px", // Make the border circular around the arrow
                    padding: "8px", // Optional, adjust for better spacing
                    marginRight: "30px",
                  }}
                >
                  <ExpandMoreIcon sx={{ color: "#fff" }} />
                </Box>
              }
              aria-controls="panel3bh-content"
              id="panel3bh-header"
              sx={{
                background: "#D2D2F7",
                borderRadius: "10px",
                height: "160px",
                display: "flex",
                alignItems: "center",
                flexDirection: "row", // Default: Text on the left, arrow on the right
                paddingLeft: "16px", // Adjust padding for better spacing
                paddingRight: 0,
                mb: 1, // Remove right padding
              }}
            >
              <Box
                sx={{
                  textAlign: "center",
                  flexGrow: 1,
                }}
              >
                <Typography
                  sx={{
                    color: "#6362E5",
                    display: "flex",
                    fontSize: "15px",
                    flexDirection: "column",
                    alignItems: "start", // Align the text to the left
                  }}
                >
                  LPG
                  <Typography
                    variant="subtitle2"
                    sx={{
                      color: "#6362E5",
                      fontWeight: "bold",
                      fontSize: "32px",
                      fontFamily: "Roboto",
                    }}
                  >
                    {companyData.lpgvehicle}
                  </Typography>
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails
              sx={{ border: "1px solid #898C8E33", borderRadius: "8px" }}
            >
              <Typography>
                <TableContainer component={Paper}>
                  <Table
                    // sx={{ minWidth: 650 }}
                    size="small"
                    aria-label="a dense table"
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">Quantity</TableCell>
                        <TableCell align="center">No. of Tankers</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {/* {rows.map((row) => ( */}
                      <TableRow
                        //   key={row.name}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row" align="center">
                          {/* {row.name} */}abc
                        </TableCell>
                        <TableCell align="center">
                          {/* {row.calories} */}abc
                        </TableCell>
                      </TableRow>

                      {/* ))} */}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion
            style={{
              flexBasis: "32%",
              borderRadius: "10px",
              border: "none",
              marginBottom: "20px",
            }}
            expanded={expanded === "panel2"}
            onChange={handleChange("panel2")}
          >
            <AccordionSummary
              expandIcon={
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    // border: "2px solid #6362E5", // Add border to the arrow
                    background: "#B8B8F3",
                    borderRadius: "8px", // Make the border circular around the arrow
                    padding: "8px", // Optional, adjust for better spacing
                    marginRight: "30px",
                  }}
                >
                  <ExpandMoreIcon sx={{ color: "#fff" }} />
                </Box>
              }
              aria-controls="panel2bh-content"
              id="panel2bh-header"
              sx={{
                background: "#D2D2F7",
                borderRadius: "10px",
                height: "160px",
                display: "flex",
                alignItems: "center",
                flexDirection: "row", // Default: Text on the left, arrow on the right
                paddingLeft: "16px", // Adjust padding for better spacing
                paddingRight: 0,
                mb: 1, // Remove right padding
              }}
            >
              <Box
                sx={{
                  textAlign: "center",
                  flexGrow: 1,
                }}
              >
                <Typography
                  sx={{
                    color: "#6362E5",
                    display: "flex",
                    fontSize: "15px",
                    flexDirection: "column",
                    alignItems: "start", // Align the text to the left
                  }}
                >
                  Butane
                  <Typography
                    variant="subtitle2"
                    sx={{
                      color: "#6362E5",
                      fontWeight: "bold",
                      fontSize: "32px",
                      fontFamily: "Roboto",
                    }}
                  >
                    {companyData.butanevehicle}
                  </Typography>
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails
              sx={{ border: "1px solid #898C8E33", borderRadius: "8px" }}
            >
              <Typography>
                <TableContainer component={Paper}>
                  <Table
                    // sx={{ minWidth: 650 }}
                    size="small"
                    aria-label="a dense table"
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">Quantity</TableCell>
                        <TableCell align="center">No. of Tankers</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {/* {rows.map((row) => ( */}
                      <TableRow
                        //   key={row.name}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row" align="center">
                          {/* {row.name} */}abc
                        </TableCell>
                        <TableCell align="center">
                          {/* {row.calories} */}abc
                        </TableCell>
                      </TableRow>

                      {/* ))} */}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion
            style={{
              flexBasis: "32%",
              borderRadius: "10px",
              border: "none",
              marginBottom: "20px",
            }}
            expanded={expanded === "panel5"}
            onChange={handleChange("panel5")}
          >
            <AccordionSummary
              expandIcon={
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    // border: "2px solid #6362E5", // Add border to the arrow
                    background: "#B8B8F3",
                    borderRadius: "8px", // Make the border circular around the arrow
                    padding: "8px", // Optional, adjust for better spacing
                    marginRight: "30px",
                  }}
                >
                  <ExpandMoreIcon sx={{ color: "#fff" }} />
                </Box>
              }
              aria-controls="panel5bh-content"
              id="panel5bh-header"
              sx={{
                background: "#D2D2F7",
                borderRadius: "10px",
                height: "160px",
                display: "flex",
                alignItems: "center",
                flexDirection: "row", // Default: Text on the left, arrow on the right
                paddingLeft: "16px", // Adjust padding for better spacing
                paddingRight: 0,
                mb: 1, // Remove right padding
              }}
            >
              <Box
                sx={{
                  textAlign: "center",
                  flexGrow: 1,
                }}
              >
                <Typography
                  sx={{
                    color: "#6362E5",
                    display: "flex",
                    fontSize: "15px",
                    flexDirection: "column",
                    alignItems: "start", // Align the text to the left
                  }}
                >
                  Multi License
                  <Typography
                    variant="subtitle2"
                    sx={{
                      color: "#6362E5",
                      fontWeight: "bold",
                      fontSize: "32px",
                      fontFamily: "Roboto",
                    }}
                  >
                    {companyData.multivehicle}
                  </Typography>
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails
              sx={{ border: "1px solid #898C8E33", borderRadius: "8px" }}
            >
              <Typography>
                <TableContainer component={Paper}>
                  <Table
                    // sx={{ minWidth: 650 }}
                    size="small"
                    aria-label="a dense table"
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">Quantity</TableCell>
                        <TableCell align="center">No. of Tankers</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {/* {rows.map((row) => ( */}
                      <TableRow
                        //   key={row.name}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row" align="center">
                          {/* {row.name} */}abc
                        </TableCell>
                        <TableCell align="center">
                          {/* {row.calories} */}abc
                        </TableCell>
                      </TableRow>

                      {/* ))} */}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>

        <Box
          sx={{
            flexGrow: 1,
            width: "100%",
            // border: "1px solid red",
            height: "auto",
            mb: 2,
          }}
        >
          <Typography
            variant="h5"
            sx={{ fontWeight: 600, p: 1, mt: 3 }}
            component="div"
          >
            <b>Tanker Number Listing</b>{" "}
          </Typography>
        </Box>
        <TableContainer component={Paper}>
          <TextField
            variant="outlined"
            placeholder="Search"
            size="small"
            sx={{ margin: 2 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          {/* <Button variant="contained" color="error" sx={{ margin: 2 }}>
            Delete
          </Button> */}
          <Table sx={{ minWidth: 650 }} aria-label="tanker table">
            <TableHead>
              <TableRow
                sx={{
                  borderTop: "1px solid gray",
                  borderBottom: "1px solid gray",
                }}
              >
                <TableCell
                  align="center"
                  sx={{ fontWeight: "bold", border: "none" }}
                >
                  Tanker Number
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ fontWeight: "bold", border: "none" }}
                >
                  Tanker Capacity
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ fontWeight: "bold", border: "none" }}
                >
                  Availability
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ fontWeight: "bold", border: "none" }}
                >
                  Product
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ fontWeight: "bold", border: "none" }}
                >
                  Status
                </TableCell>
                {/* <TableCell>Action</TableCell> */}
                <TableCell
                  align="center"
                  sx={{ fontWeight: "bold", border: "none" }}
                >
                  Geo Location
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tankerData.map((tanker, index) => (
                <TableRow key={index}>
                  <TableCell align="center">{tanker.number}</TableCell>
                  <TableCell align="center">{tanker.capacity}</TableCell>
                  <TableCell align="center">{tanker.availability}</TableCell>
                  <TableCell align="center">{tanker.product}</TableCell>
                  <TableCell align="center">{tanker.status}</TableCell>
                  <TableCell align="center">
                    <Button 
                      sx={{
                        // border: "1px solid black",
                        background: "#F3B234",
                        color: "#fff",
                        borderRadius: "8px",

                        // px: 3,
                        // py: 4,
                      }}
                    >
                      GPS
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Pagination
            count={4} // Adjust based on total pages
            page={page}
            onChange={handlePageChange}
            sx={{ display: "flex", justifyContent: "center", padding: 2 }}
          />
        </TableContainer>
      </Box>
    </div>
  );
};

export default TankerDetailsComponent;

// import Box from "@mui/material/Box";
// import Typography from "@mui/material/Typography";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// // import Button from "@mui/material/Button";
// import { Link, useLocation, useParams } from "react-router-dom";
// import { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   Paper,
//   Switch,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TablePagination,
//   TableRow,
// } from "@mui/material";

// const TankerDetailsComponent = () => {
//   const location = useLocation();
//   const params = new URLSearchParams(location.search);
//   const company = params.get("company");
//   const tankers = params.get("tankers");
//   const createdBy = params.get("createdby");

//   const { id } = useParams(); // get the ID from the route params
//   const [companyFormData, setcompanyFormData] = useState(null);
//   const [contactFormData, setcontactFormData] = useState(null);
//   const [tankerFormData, settankerFormData] = useState(null);
//   const [createdDate, setCreatedDate] = useState("");

//   const [documentFormData, setdocumentFormData] = useState(null);
//   // const [sapFormData, setsapFormData] = useState(null);

//   // console.log(contactFormData);
//   console.log(companyFormData);
//   console.log(tankerFormData);
//   console.log(documentFormData);
//   // console.log(sapFormData);
//   // console.log("bankdata", bankFormData);
//   console.log("id", id);

//   useEffect(() => {
//     axios
//       .get(`http://localhost:5000/getlocalstorage/${id}`)
//       .then((response) => {
//         // console.log("API Response:", response); // Log the response
//         const { data, createdAt } = response.data;
//         console.log("Data:", data); // Log the data
//         const companyFormData = JSON.parse(data.companyFormData);
//         const contactFormData = JSON.parse(data.contactFormData);
//         const tankerFormData = JSON.parse(data.TankerFormData);
//         const documentFormData = JSON.parse(data.DocumentFormData);

//         // const productFormData = JSON.parse(data.productFormData);
//         // const sapFormData = JSON.parse(data.sapFormData);
//         // console.log("Bank Form Data:", bankFormData); // Log the parsed data
//         // console.log("companyFormData Form Data:", companyFormData); // Log the parsed data
//         setcompanyFormData(companyFormData);
//         setcontactFormData(contactFormData);
//         settankerFormData(tankerFormData);
//         setdocumentFormData(documentFormData);
//         // setCreatedDate(createdAt); // Save createdAt to state
//         let formattedDate = new Date(createdAt).toLocaleString("en-GB", {
//           day: "2-digit",
//           month: "2-digit",
//           year: "numeric",
//           hour: "2-digit",
//           minute: "2-digit",
//           second: "2-digit",
//           hour12: false,
//         });
//         formattedDate = formattedDate.replace(",", " |");

//         setCreatedDate(formattedDate);

//         // setproductFormData(productFormData);
//         // setsapFormData(sapFormData);
//       })
//       .catch((error) => {
//         console.error("Error fetching customer data:", error);
//       });
//   }, [id]);

//   const [data, setData] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(`/tankerdetail/view/${id}`);
//         setData(response.data);
//         console.log(data);
//       } catch (error) {
//         console.error("Error fetching tanker data", error);
//       }
//     };

//     fetchData();
//   }, [id]);
//   //   console.log("all data", data);

//   // States for pagination
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);

//   // Handle pagination changes
//   const handleChangePage = (event, newPage) => {
//     setPage(newPage); // Update the current page
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10)); // Update rows per page
//     setPage(0); // Reset to the first page when changing rows per page
//   };

//   // const currentData = tankerFormData
//   //   ? tankerFormData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//   //   : []; // Use an empty array as fallback when tankerFormData is null

//   const handleStatusToggle = (index) => {
//     const updatedTankerFormData = [...tankerFormData];
//     updatedTankerFormData[index].status = !updatedTankerFormData[index].status;
//     console.log(updatedTankerFormData); // Log to see if status is toggling
//     settankerFormData(updatedTankerFormData);
//   };

//   return (
//     <div>
//       <Box
//         sx={{
//           flexGrow: 1,
//           width: "100%",
//           mx: 5,
//           my: 3,
//           // border: "1px solid red",
//           height: "auto",
//           // p: 3,
//         }}
//       >
//         <Typography variant="h5" component="div">
//           <Link to="/transportertable">
//             <ArrowBackIcon
//               sx={{ fontWeight: 500, fontSize: 25, mr: 1, color: "darkblue" }}
//             />
//           </Link>
//           Transporter Details
//         </Typography>
//         <Typography variant="p" component="div" sx={{ m: 1 }}>
//           <span style={{ color: "blue" }}>
//             <Link to="/transportertable" style={{ textDecoration: "none" }}>
//               Transporter
//             </Link>
//           </span>
//           / Transporter Details
//         </Typography>
//       </Box>
//       <Box
//         sx={{
//           boxShadow: 3,
//           // flexGrow: 1,
//           display: "flex",
//           // flexWrap: "wrap",
//           flexDirection: "column",
//           width: "100%",
//           ml: 5,
//           p: 2,
//           // padding: "10px 50px",
//           background: "#fff",
//           // border: "1px solid red",
//           borderRadius: "10px",
//           height: "auto",
//           mb: 1,
//           // m:
//         }}
//       >
//         <Box
//           sx={{
//             flexGrow: 1,
//             width: "100%",
//             // border: "1px solid red",
//             height: "auto",
//             mb: 2,
//           }}
//         >
//           <Typography
//             variant="h5"
//             sx={{ fontWeight: 600, p: 1 }}
//             component="div"
//           >
//             <b>Transporter Details</b>
//           </Typography>
//         </Box>
//         <Box
//           sx={{
//             p: 2,
//             height: "auto",
//             width: "auto",
//             display: "flex",
//             justifyContent: "start",
//             alignItems: "start",
//             flexWrap: "wrap",
//             border: "1px solid #ccc",
//             borderRadius: "10px",
//           }}
//         >
//           <Box
//             sx={{
//               flexGrow: 1,
//               width: "auto",
//               p: 1,
//               px: 3,
//               // border: "1px solid gray",
//               height: "auto",
//               display: "flex",
//               flexDirection: "column",
//               // border: "1px solid red",
//               // justifyContent:"start",
//               // alignItems: "start",
//             }}
//           >
//             <h1>Tanker Details</h1>
//             <p>Company: {company}</p>
//             <p>No. of Tankers: {tankers}</p>
//             <p>Created By: {createdBy}</p>
//             <span>Id </span>
//             <b style={{ fontWeight: "bold" }}>{id}</b>
//           </Box>
//           <Box
//             sx={{
//               // flexGrow: 1,
//               width: "auto",
//               p: 1,
//               px: 3,
//               // border: "1px solid gray",
//               height: "auto",
//               display: "flex",
//               flexDirection: "column",
//               // border: "1px solid red",
//               // justifyContent:"start",
//               // alignItems: "start",
//             }}
//           >
//             <span>Transporter Name </span>
//             {companyFormData && (
//               <>
//                 <b style={{ fontWeight: "bold" }}>
//                   {companyFormData.transportercompanyname || "N/A"}
//                 </b>
//               </>
//             )}
//           </Box>
//           <Box
//             sx={{
//               flexGrow: 4,
//               width: "auto",
//               p: 1,
//               px: 3,
//               // borderBottom: "1px solid gray",
//               height: "auto",
//               display: "flex",
//               flexDirection: "column",
//               // border: "1px solid red",
//               // justifyContent:"start",
//               alignItems: "start",
//             }}
//           >
//             <span>Owner Mobile Number</span>
//             {contactFormData && (
//               <>
//                 <b style={{ fontWeight: "bold" }}>
//                   {contactFormData.phonenumberofowner || "N/A"}
//                 </b>
//               </>
//             )}
//           </Box>
//           <Box
//             sx={{
//               flexGrow: 1,
//               width: "auto",
//               p: 1,
//               px: 3,
//               // borderBottom: "1px solid #9f9f9f",
//               height: 60,
//               display: "flex",
//               flexDirection: "column",
//               // border: "1px solid red",
//               // justifyContent:"start",
//               alignItems: "start",
//             }}
//           >
//             <span>Driver Mobile Number </span>
//             {companyFormData && (
//               <>
//                 <b style={{ fontWeight: "bold" }}>
//                   {companyFormData.addressstreet1 || "N/A"}
//                 </b>
//               </>
//             )}
//           </Box>
//           <Box
//             sx={{
//               flexGrow: 4,
//               width: "auto",
//               p: 1,
//               px: 3,
//               // borderBottom: "1px solid gray",
//               height: "auto",
//               display: "flex",
//               flexDirection: "column",
//               // border: "1px solid red",
//               // justifyContent:"start",
//               alignItems: "start",
//             }}
//           >
//             <span>Manager1 Mobile Number</span>
//             {contactFormData && (
//               <>
//                 <b style={{ fontWeight: "bold" }}>
//                   {contactFormData.phonenumberofmanager1 || "N/A"}
//                 </b>
//               </>
//             )}
//           </Box>
//           <Box
//             sx={{
//               flexGrow: 1,
//               width: "auto",
//               p: 1,
//               px: 3,
//               // borderBottom: "1px solid gray",
//               height: "auto",
//               display: "flex",
//               flexDirection: "column",
//               // border: "1px solid red",
//               // justifyContent:"start",
//               alignItems: "start",
//             }}
//           >
//             ``
//             <span>Manager2 Mobile Number </span>
//             {contactFormData && (
//               <>
//                 <b style={{ fontWeight: "bold" }}>
//                   {contactFormData.phonenumberofmanager2 || "N/A"}
//                 </b>
//               </>
//             )}
//           </Box>
//           <Box
//             sx={{
//               // flexGrow: 0.2,
//               width: "auto",
//               p: 1,
//               px: 3,
//               // borderBottom: "1px solid gray",
//               height: "auto",
//               display: "flex",
//               flexDirection: "column",
//               // border: "1px solid red",
//               justifyContent: "start",
//               alignItems: "start",
//             }}
//           >
//             <span> Manager3 Mobile Number</span>
//             {contactFormData && (
//               <>
//                 <b style={{ fontWeight: "bold" }}>
//                   {contactFormData.phonenumberofmanager3 || "N/A"}
//                 </b>
//               </>
//             )}
//           </Box>
//           <Box
//             sx={{
//               // flexGrow: 0.2,
//               width: "auto",
//               p: 1,
//               px: 3,
//               // borderBottom: "1px solid gray",
//               height: "auto",
//               display: "flex",
//               flexDirection: "column",
//               // border: "1px solid red",
//               justifyContent: "start",
//               alignItems: "start",
//             }}
//           >
//             <span>Created On</span>
//             <b style={{ fontWeight: "bold" }}>{createdDate || "N/A"}</b>
//             {/* Show N/A if no date */}{" "}
//           </Box>
//         </Box>
//         <Box
//           sx={{
//             flexGrow: 1,
//             width: "100%",
//             // border: "1px solid red",
//             height: "auto",
//             mb: 2,
//           }}
//         >
//           <Typography
//             variant="h5"
//             sx={{ fontWeight: 600, p: 1, mt: 3 }}
//             component="div"
//           >
//             <b>Tanker Details</b>{" "}
//             {companyFormData && (
//               <>
//                 <b style={{ fontWeight: "bold" }}>
//                   ({companyFormData.noofvehicle || "N/A"})
//                 </b>
//               </>
//             )}
//           </Typography>
//         </Box>
//         <Box
//           sx={{
//             p: 2,
//             height: "auto",
//             width: "100%",
//             display: "flex",
//             justifyContent: "start",
//             alignItems: "start",
//             flexWrap: "wrap",
//             border: "1px solid #ccc",
//             borderRadius: "10px",
//           }}
//         >
//           <TableContainer component={Paper}>
//             <Table sx={{ width: "100%" }} aria-label="simple table">
//               <TableHead>
//                 <TableRow>
//                   <TableCell>Tanker Number</TableCell>
//                   <TableCell>Tanker Capacity</TableCell>
//                   <TableCell>Product</TableCell>
//                   <TableCell align="right">Status</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {tankerFormData &&
//                   tankerFormData.tankernumber.map((number, index) => (
//                     <TableRow key={index}>
//                       <TableCell style={{ fontWeight: "bold" }}>
//                         {number}
//                       </TableCell>
//                       <TableCell style={{ fontWeight: "bold" }}>
//                         {tankerFormData.tankercapacitys[index] || "N/A"}
//                       </TableCell>
//                       <TableCell style={{ fontWeight: "bold" }}>
//                         {tankerFormData.products[index] || "N/A"}
//                       </TableCell>
//                       {/* <TableCell align="right"> */}
//                       <TableCell align="right">
//                         <Switch
//                           // checked={tanker.status || false} // This binds the Switch to the current status
//                           onChange={() => handleStatusToggle(index)} // Toggles the status
//                           color="primary"
//                         />
//                       </TableCell>
//                     </TableRow>
//                   ))}
//               </TableBody>
//             </Table>

//             {/* Pagination Component */}
//             <TablePagination
//               rowsPerPageOptions={[5, 10, 15]}
//               component="div"
//               count={tankerFormData?.length || 0} // Total number of items (rows) in the table
//               rowsPerPage={rowsPerPage} // Number of rows per page
//               page={page} // Current page index
//               onPageChange={handleChangePage} // Handler for page change
//               onRowsPerPageChange={handleChangeRowsPerPage} // Handler for changing rows per page
//             />
//           </TableContainer>
//         </Box>
//         <Box
//           sx={{
//             flexGrow: 1,
//             width: "100%",
//             // border: "1px solid red",
//             height: "auto",
//             mb: 2,
//           }}
//         >
//           <Typography
//             variant="h5"
//             sx={{ fontWeight: 600, p: 1, mt: 3 }}
//             component="div"
//           >
//             <b>Document Details</b>{" "}
//           </Typography>
//         </Box>
//         <Box
//           sx={{
//             p: 2,
//             height: "auto",
//             width: "100%",
//             display: "flex",
//             justifyContent: "start",
//             alignItems: "start",
//             flexWrap: "wrap",
//             border: "1px solid #ccc",
//             borderRadius: "10px",
//           }}
//         >
//           <TableContainer component={Paper}>
//             <Table sx={{ width: "40%" }} aria-label="simple table">
//               <TableHead>
//                 <TableRow>
//                   <TableCell>Tanker Number</TableCell>
//                   <TableCell>Document</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {documentFormData &&
//                   documentFormData.tankernumber.map((number, index) => (
//                     <TableRow key={index}>
//                       <TableCell style={{ fontWeight: "bold" }}>
//                         {number}
//                       </TableCell>
//                       <TableCell style={{ fontWeight: "bold" }}>
//                         {documentFormData.documenttypes[index] || "N/A"} - Exp
//                         date ({documentFormData.expirydate[index] || "N/A"})
//                       </TableCell>
//                     </TableRow>
//                   ))}
//               </TableBody>
//             </Table>

//             {/* Pagination Component */}
//             <TablePagination
//               rowsPerPageOptions={[5, 10, 15]}
//               component="div"
//               count={tankerFormData?.length || 0} // Total number of items (rows) in the table
//               rowsPerPage={rowsPerPage} // Number of rows per page
//               page={page} // Current page index
//               onPageChange={handleChangePage} // Handler for page change
//               onRowsPerPageChange={handleChangeRowsPerPage} // Handler for changing rows per page
//             />
//           </TableContainer>
//         </Box>
//       </Box>
//     </div>
//   );
// };

// export default TankerDetailsComponent;
