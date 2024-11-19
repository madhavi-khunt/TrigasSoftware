import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import Button from "@mui/material/Button";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  Paper,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";

const TransporterDetailComponent = () => {
  const { id } = useParams(); // get the ID from the route params
  const [companyFormData, setcompanyFormData] = useState(null);
  const [contactFormData, setcontactFormData] = useState(null);
  const [tankerFormData, settankerFormData] = useState(null);
  const [createdDate, setCreatedDate] = useState("");

  const [documentFormData, setdocumentFormData] = useState(null);
  // const [sapFormData, setsapFormData] = useState(null);

  // console.log(contactFormData);
  console.log(companyFormData);
  console.log(tankerFormData);
  console.log(documentFormData);
  // console.log(sapFormData);
  // console.log("bankdata", bankFormData);
  // console.log(id);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/getlocalstorage/${id}`)
      .then((response) => {
        // console.log("API Response:", response); // Log the response
        const { data, createdAt } = response.data;
        console.log("Data:", data); // Log the data
        const companyFormData = JSON.parse(data.companyFormData);
        const contactFormData = JSON.parse(data.contactFormData);
        const tankerFormData = JSON.parse(data.TankerFormData);
        const documentFormData = JSON.parse(data.DocumentFormData);

        // const productFormData = JSON.parse(data.productFormData);
        // const sapFormData = JSON.parse(data.sapFormData);
        // console.log("Bank Form Data:", bankFormData); // Log the parsed data
        // console.log("companyFormData Form Data:", companyFormData); // Log the parsed data
        setcompanyFormData(companyFormData);
        setcontactFormData(contactFormData);
        settankerFormData(tankerFormData);
        setdocumentFormData(documentFormData);
        // setCreatedDate(createdAt); // Save createdAt to state
        let formattedDate = new Date(createdAt).toLocaleString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        });
        formattedDate = formattedDate.replace(",", " |");

        setCreatedDate(formattedDate);

        // setproductFormData(productFormData);
        // setsapFormData(sapFormData);
      })
      .catch((error) => {
        console.error("Error fetching customer data:", error);
      });
  }, [id]);

  // States for pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Handle pagination changes
  const handleChangePage = (event, newPage) => {
    setPage(newPage); // Update the current page
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10)); // Update rows per page
    setPage(0); // Reset to the first page when changing rows per page
  };

  // const currentData = tankerFormData
  //   ? tankerFormData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
  //   : []; // Use an empty array as fallback when tankerFormData is null

  const handleStatusToggle = (index) => {
    const updatedTankerFormData = [...tankerFormData];
    updatedTankerFormData[index].status = !updatedTankerFormData[index].status;
    console.log(updatedTankerFormData); // Log to see if status is toggling
    settankerFormData(updatedTankerFormData);
  };

  return (
    <div>
      <Box
        sx={{
          flexGrow: 1,
          width: "100%",
          mx: 5,
          my: 3,
          // border: "1px solid red",
          height: "auto",
          // p: 3,
        }}
      >
        <Typography variant="h5" component="div">
          <Link to="/transportertable">
            <ArrowBackIcon
              sx={{ fontWeight: 500, fontSize: 25, mr: 1, color: "darkblue" }}
            />
          </Link>
          Transporter Details
        </Typography>
        <Typography variant="p" component="div" sx={{ m: 1 }}>
          <span style={{ color: "blue" }}>
            <Link to="/transportertable" style={{ textDecoration: "none" }}>
              Transporter
            </Link>
          </span>
          / Transporter Details
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
          // padding: "10px 50px",
          background: "#fff",
          // border: "1px solid red",
          borderRadius: "10px",
          height: "auto",
          mb: 1,
          // m:
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
            <b>Transporter Details</b>
          </Typography>
        </Box>
        <Box
          sx={{
            p: 2,
            height: "auto",
            width: "auto",
            display: "flex",
            justifyContent: "start",
            alignItems: "start",
            flexWrap: "wrap",
            border: "1px solid #ccc",
            borderRadius: "10px",
          }}
        >
          <Box
            sx={{
              flexGrow: 1,
              width: "auto",
              p: 1,
              px: 3,
              // border: "1px solid gray",
              height: "auto",
              display: "flex",
              flexDirection: "column",
              // border: "1px solid red",
              // justifyContent:"start",
              // alignItems: "start",
            }}
          >
            <span>Id </span>
            <b style={{ fontWeight: "bold" }}>{id}</b>
          </Box>
          <Box
            sx={{
              // flexGrow: 1,
              width: "auto",
              p: 1,
              px: 3,
              // border: "1px solid gray",
              height: "auto",
              display: "flex",
              flexDirection: "column",
              // border: "1px solid red",
              // justifyContent:"start",
              // alignItems: "start",
            }}
          >
            <span>Transporter Name </span>
            {companyFormData && (
              <>
                <b style={{ fontWeight: "bold" }}>
                  {companyFormData.transportercompanyname || "N/A"}
                </b>
              </>
            )}
          </Box>
          <Box
            sx={{
              flexGrow: 4,
              width: "auto",
              p: 1,
              px: 3,
              // borderBottom: "1px solid gray",
              height: "auto",
              display: "flex",
              flexDirection: "column",
              // border: "1px solid red",
              // justifyContent:"start",
              alignItems: "start",
            }}
          >
            <span>Owner Mobile Number</span>
            {contactFormData && (
              <>
                <b style={{ fontWeight: "bold" }}>
                  {contactFormData.phonenumberofowner || "N/A"}
                </b>
              </>
            )}
          </Box>
          {/* <Box
            sx={{
              flexGrow: 1,
              width: "auto",
              p: 1,
              px: 3,
              // borderBottom: "1px solid #9f9f9f",
              height: 60,
              display: "flex",
              flexDirection: "column",
              // border: "1px solid red",
              // justifyContent:"start",
              alignItems: "start",
            }}
          >
            <span>Driver Mobile Number </span>
            {companyFormData && (
              <>
                <b style={{ fontWeight: "bold" }}>
                  {companyFormData.addressstreet1 || "N/A"}
                </b>
              </>
            )}
          </Box> */}
          <Box
            sx={{
              flexGrow: 4,
              width: "auto",
              p: 1,
              px: 3,
              // borderBottom: "1px solid gray",
              height: "auto",
              display: "flex",
              flexDirection: "column",
              // border: "1px solid red",
              // justifyContent:"start",
              alignItems: "start",
            }}
          >
            <span>Manager1 Mobile Number</span>
            {contactFormData && (
              <>
                <b style={{ fontWeight: "bold" }}>
                  {contactFormData.phonenumberofmanager1 || "N/A"}
                </b>
              </>
            )}
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              width: "auto",
              p: 1,
              px: 3,
              // borderBottom: "1px solid gray",
              height: "auto",
              display: "flex",
              flexDirection: "column",
              // border: "1px solid red",
              // justifyContent:"start",
              alignItems: "start",
            }}
          >
            <span>Manager2 Mobile Number </span>
            {contactFormData && (
              <>
                <b style={{ fontWeight: "bold" }}>
                  {contactFormData.phonenumberofmanager2 || "N/A"}
                </b>
              </>
            )}
          </Box>
          <Box
            sx={{
              // flexGrow: 0.2,
              width: "auto",
              p: 1,
              px: 3,
              // borderBottom: "1px solid gray",
              height: "auto",
              display: "flex",
              flexDirection: "column",
              // border: "1px solid red",
              justifyContent: "start",
              alignItems: "start",
            }}
          >
            <span> Manager3 Mobile Number</span>
            {contactFormData && (
              <>
                <b style={{ fontWeight: "bold" }}>
                  {contactFormData.phonenumberofmanager3 || "N/A"}
                </b>
              </>
            )}
          </Box>
          <Box
            sx={{
              // flexGrow: 0.2,
              width: "auto",
              p: 1,
              px: 3,
              // borderBottom: "1px solid gray",
              height: "auto",
              display: "flex",
              flexDirection: "column",
              // border: "1px solid red",
              justifyContent: "start",
              alignItems: "start",
            }}
          >
            <span>Created On</span>
            <b style={{ fontWeight: "bold" }}>{createdDate || "N/A"}</b>
            {/* Show N/A if no date */}{" "}
          </Box>
        </Box>
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
            <b>Tanker Details</b>{" "}
            {companyFormData && (
              <>
                <b style={{ fontWeight: "bold" }}>
                  ({companyFormData.noofvehicle || "N/A"})
                </b>
              </>
            )}
          </Typography>
        </Box>
        <Box
          sx={{
            p: 2,
            height: "auto",
            width: "100%",
            display: "flex",
            justifyContent: "start",
            alignItems: "start",
            flexWrap: "wrap",
            border: "1px solid #ccc",
            borderRadius: "10px",
          }}
        >
          <TableContainer component={Paper}>
            <Table sx={{ width: "100%" }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Tanker Number</TableCell>
                  <TableCell>Tanker Capacity</TableCell>
                  <TableCell>Product</TableCell>
                  <TableCell>Driver Number</TableCell>
                  <TableCell>Driver Name</TableCell>
                  <TableCell align="right">Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tankerFormData &&
                Array.isArray(tankerFormData.tankernumber) ? (
                  tankerFormData.tankernumber.map((number, index) => (
                    <TableRow key={index}>
                      <TableCell style={{ fontWeight: "bold" }}>
                        {number}
                      </TableCell>
                      <TableCell style={{ fontWeight: "bold" }}>
                        {tankerFormData.tankercapacitys &&
                        tankerFormData.tankercapacitys[index]
                          ? tankerFormData.tankercapacitys[index]
                          : "N/A"}
                      </TableCell>
                      <TableCell style={{ fontWeight: "bold" }}>
                        {tankerFormData.products &&
                        tankerFormData.products[index]
                          ? tankerFormData.products[index]
                          : "N/A"}
                      </TableCell>
                      <TableCell style={{ fontWeight: "bold" }}>
                        {tankerFormData.drivername &&
                        tankerFormData.drivername[index]
                          ? tankerFormData.drivername[index]
                          : "N/A"}
                      </TableCell>
                      <TableCell style={{ fontWeight: "bold" }}>
                        {tankerFormData.drivernumber &&
                        tankerFormData.drivernumber[index]
                          ? tankerFormData.drivernumber[index]
                          : "N/A"}
                      </TableCell>
                      <TableCell align="right">
                        <Switch
                          onChange={() => handleStatusToggle(index)}
                          color="primary"
                        />
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      No tanker data available.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>

            {/* Pagination Component */}
            <TablePagination
              rowsPerPageOptions={[5, 10, 15]}
              component="div"
              count={tankerFormData?.length || 0} // Total number of items (rows) in the table
              rowsPerPage={rowsPerPage} // Number of rows per page
              page={page} // Current page index
              onPageChange={handleChangePage} // Handler for page change
              onRowsPerPageChange={handleChangeRowsPerPage} // Handler for changing rows per page
            />
          </TableContainer>
        </Box>
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
            <b>Document Details</b>{" "}
          </Typography>
        </Box>
        <Box
          sx={{
            p: 2,
            height: "auto",
            width: "100%",
            display: "flex",
            justifyContent: "start",
            alignItems: "start",
            flexWrap: "wrap",
            border: "1px solid #ccc",
            borderRadius: "10px",
          }}
        >
          <TableContainer component={Paper}>
            <Table sx={{ width: "40%" }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Tanker Number</TableCell>
                  <TableCell>Document</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {documentFormData &&
                Array.isArray(documentFormData.tankernumber) ? (
                  documentFormData.tankernumber.map((number, index) => (
                    <TableRow key={index}>
                      <TableCell style={{ fontWeight: "bold" }}>
                        {number}
                      </TableCell>
                      <TableCell style={{ fontWeight: "bold" }}>
                        {documentFormData.documenttypes &&
                        documentFormData.documenttypes[index]
                          ? documentFormData.documenttypes[index]
                          : "N/A"}{" "}
                        - Exp date (
                        {documentFormData.expirydate &&
                        documentFormData.expirydate[index]
                          ? documentFormData.expirydate[index]
                          : "N/A"}
                        )
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={2} align="center">
                      No document data available.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>

            {/* Pagination Component */}
            <TablePagination
              rowsPerPageOptions={[5, 10, 15]}
              component="div"
              count={tankerFormData?.length || 0} // Total number of items (rows) in the table
              rowsPerPage={rowsPerPage} // Number of rows per page
              page={page} // Current page index
              onPageChange={handleChangePage} // Handler for page change
              onRowsPerPageChange={handleChangeRowsPerPage} // Handler for changing rows per page
            />
          </TableContainer>
        </Box>
      </Box>
    </div>
  );
};

export default TransporterDetailComponent;
