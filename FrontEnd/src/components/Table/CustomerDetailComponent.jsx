import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Button from "@mui/material/Button";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import ContactDetailsTable from "./Sub Tables/ContactDetailsTable";
import ProductDetailsTable from "./Sub Tables/ProductDetailsTable";
import SapCodesTable from "./Sub Tables/SapCodesTable";

const CustomerDetailComponent = () => {
  const { id } = useParams(); // get the ID from the route params
  const [contactFormData, setcontactFormData] = useState(null);
  const [companyFormData, setcompanyFormData] = useState(null);
  const [productFormData, setproductFormData] = useState(null);
  const [sapFormData, setsapFormData] = useState(null);

  // console.log(contactFormData);
  // console.log(companyFormData);
  // console.log(productFormData);
  // console.log(sapFormData);
  // console.log("bankdata", bankFormData);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/getlocalstorage/${id}`)
      .then((response) => {
        // console.log("API Response:", response); // Log the response
        const data = response.data.data;
        // console.log("Data:", data); // Log the data
        const contactFormData = JSON.parse(data.contactFormData);
        const companyFormData = JSON.parse(data.companyFormData);
        const productFormData = JSON.parse(data.productFormData);
        const sapFormData = JSON.parse(data.sapFormData);
        // console.log("Bank Form Data:", bankFormData); // Log the parsed data
        // console.log("companyFormData Form Data:", companyFormData); // Log the parsed data
        setcontactFormData(contactFormData);
        setcompanyFormData(companyFormData);
        setproductFormData(productFormData);
        setsapFormData(sapFormData);
      })
      .catch((error) => {
        console.error("Error fetching customer data:", error);
      });
  }, [id]);

  const [activeTab, setActiveTab] = useState("contact");

  const handleButtonClick = (tab) => {
    setActiveTab(tab);
  };
  const renderActiveTab = () => {
    switch (activeTab) {
      case "contact":
        return <ContactDetailsTable contactData={contactFormData} />;
      case "product":
        return <ProductDetailsTable productData={productFormData} />;

      case "sap":
        return <SapCodesTable sapData={sapFormData} />;
      default:
        return <div>Please select a tab</div>;
    }
  };

  return (
    <div>
      <Box
        sx={{
          flexGrow: 1,
          width: 1390,
          ml: 1,
          // border: "1px solid red",
          height: 100,
        }}
      >
        <Typography variant="h5" component="div">
          <Link to="/customertable">
            <ArrowBackIcon
              sx={{ fontWeight: 500, fontSize: 25, mr: 1, color: "darkblue" }}
            />
          </Link>
          Customer Details
        </Typography>
        <Typography variant="p" component="div" sx={{ m: 1 }}>
          <span style={{ color: "blue" }}>
            <Link to="/customertable" style={{ textDecoration: "none" }}>
              Customer
            </Link>
          </span>
          / Customer Details
        </Typography>
      </Box>
      <Box
        sx={{
          boxShadow: 3,
          flexGrow: 1,
          display: "flex",
          flexWrap: "wrap",
          width: 1390,
          ml: 1,
          background: "#fff",
          // border: "1px solid gray",
          borderRadius: "10px",
          height: 350,
          mb: 1,
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
            width: 1400,
            // border: "1px soliokd red",
            height: 35,
          }}
        >
          {companyFormData && (
            <>
              <Typography
                variant="h5"
                sx={{ fontWeight: 600, p: 1 }}
                component="div"
              >
                <b>{companyFormData.companyname || "N/A"}</b>
                &nbsp; (<b>{companyFormData.customercode || "N/A"}</b>)
              </Typography>
            </>
          )}
        </Box>

        <Box
          sx={{
            flexGrow: 1,
            width: "auto",
            p: 1,
            // borderBottom: "1px solid gray",
            height: 60,
            display: "flex",
            flexDirection: "column",
            // border: "1px solid red",
            // justifyContent:"start",
            alignItems: "start",
          }}
        >
          <span>Email Address </span>
          {companyFormData && (
            <>
              <b style={{ fontWeight: "bold" }}>
                {companyFormData.email || "N/A"}
              </b>
            </>
          )}
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            width: "auto",
            p: 1,
            // borderBottom: "1px solid gray",
            height: 60,
            display: "flex",
            flexDirection: "column",
            // border: "1px solid red",
            // justifyContent:"start",
            alignItems: "start",
          }}
        >
          <span>Phone Number </span>
          {companyFormData && (
            <>
              <b style={{ fontWeight: "bold" }}>
                {companyFormData.primaryphonenumber || "N/A"}
              </b>
            </>
          )}
        </Box>
        <Box
          sx={{
            // flexGrow: 1,
            width: "auto",
            p: 1,
            // borderBottom: "1px solid #9f9f9f",
            height: 60,
            display: "flex",
            flexDirection: "column",
            // border: "1px solid red",
            // justifyContent:"start",
            alignItems: "start",
          }}
        >
          <span>Address Street 1 </span>
          {companyFormData && (
            <>
              <b style={{ fontWeight: "bold" }}>
                {companyFormData.addressstreet1 || "N/A"}
              </b>
            </>
          )}
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            width: "auto",
            p: 1,
            // borderBottom: "1px solid gray",
            height: 60,
            display: "flex",
            flexDirection: "column",
            // border: "1px solid red",
            // justifyContent:"start",
            alignItems: "start",
          }}
        >
          <span>Address Street 2 </span>
          {companyFormData && (
            <>
              <b style={{ fontWeight: "bold" }}>
                {companyFormData.addressstreet2 || "N/A"}
              </b>
            </>
          )}
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            width: 100,
            p: 1,
            // borderBottom: "1px solid gray",
            height: 60,
            display: "flex",
            flexDirection: "column",
            // border: "1px solid red",
            // justifyContent:"start",
            alignItems: "start",
          }}
        >
          <span>Country </span>
          {companyFormData && (
            <>
              <b style={{ fontWeight: "bold" }}>
                {companyFormData.country || "N/A"}
              </b>
            </>
          )}
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            width: 130,
            p: 1,
            // borderBottom: "1px solid gray",
            height: 60,
            display: "flex",
            flexDirection: "column",
            // border: "1px solid red",
            // justifyContent:"start",
            alignItems: "start",
          }}
        >
          <span>State </span>
          {companyFormData && (
            <>
              <b style={{ fontWeight: "bold" }}>
                {companyFormData.state || "N/A"}
              </b>
            </>
          )}
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            width: 130,
            p: 1,
            // borderBottom: "1px solid gray",
            height: 60,
            display: "flex",
            flexDirection: "column",
            // border: "1px solid red",
            // justifyContent:"start",
            alignItems: "start",
          }}
        >
          <span>City:-</span>
          {companyFormData && (
            <>
              <b style={{ fontWeight: "bold" }}>
                {companyFormData.city || "N/A"}
              </b>
            </>
          )}
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            width: 210,
            p: 1,
            // borderBottom: "1px solid gray",
            height: 60,
            display: "flex",
            flexDirection: "column",
            // border: "1px solid red",
            // justifyContent:"start",
            alignItems: "start",
          }}
        >
          <span>Associated Gas Company </span>
          {companyFormData && (
            <>
              <b style={{ fontWeight: "bold" }}>
                {companyFormData.associatessuppliers &&
                companyFormData.associatessuppliers.length > 0
                  ? companyFormData.associatessuppliers.join(", ") // Join elements with a space
                  : "N/A"}
              </b>
            </>
          )}
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            width: 180,
            p: 1,
            // borderBottom: "1px solid gray",
            height: 60,
            display: "flex",
            flexDirection: "column",
            // border: "1px solid red",
            // justifyContent:"start",
            alignItems: "start",
          }}
        >
          <span>Type Of Company </span>
          {companyFormData && (
            <>
              <b style={{ fontWeight: "bold" }}>
                {companyFormData.typeofcompany || "N/A"}
              </b>
            </>
          )}
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            width: 310,
            p: 1,
            // borderBottom: "1px solid gray",
            height: 60,
            display: "flex",
            flexDirection: "column",
            // border: "1px solid red",
            // justifyContent:"start",
            alignItems: "start",
          }}
        >
          <span>Our Company </span>
          <span> </span>
          {companyFormData && (
            <>
              <b style={{ fontWeight: "bold" }}>
                {companyFormData.ourcompany || "N/A"}
              </b>
            </>
          )}
        </Box>
        {/* <Box
          sx={{
            flexGrow: 1,
            width: 230,
            borderBottom:"1px solid gray",
            height: 60,
          display:"flex",
          flexDirection:"column",
          // justifyContent:"start",
          alignItems:"start"
          }}
        >
   
        </Box> */}
        <Box
          sx={{
            flexGrow: 1,
            width: 120,
            p: 1,
            // borderBottom: "1px solid gray",
            height: 60,
            display: "flex",
            flexDirection: "column",
            // border: "1px solid red",
            // justifyContent:"start",
            alignItems: "start",
          }}
        >
          <span>Team </span>
          {companyFormData && (
            <>
              <b style={{ fontWeight: "bold" }}>
                {companyFormData.team || "N/A"}
              </b>
            </>
          )}
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            width: 130,
            p: 1,
            // borderBottom: "1px solid gray",
            height: 60,
            display: "flex",
            flexDirection: "column",
            // border: "1px solid red",
            // justifyContent:"start",
            alignItems: "start",
          }}
        >
          <span>Transporter </span>
          {companyFormData && (
            <>
              <b style={{ fontWeight: "bold" }}>
                {Array.isArray(companyFormData.transporter) &&
                companyFormData.transporter.length > 0
                  ? companyFormData.transporter.join(", ") // Join elements with a space
                  : "N/A"}
              </b>
            </>
          )}
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            width: 180,
            p: 1,
            // borderBottom: "1px solid gray",
            height: 60,
            display: "flex",
            flexDirection: "column",
            // border: "1px solid red",
            // justifyContent:"start",
            alignItems: "start",
          }}
        >
          <span>PAN number</span>
          {companyFormData && (
            <>
              <b style={{ fontWeight: "bold" }}>
                {companyFormData.pannumber || "N/A"}
              </b>
            </>
          )}
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            width: 180,
            p: 1,
            // borderBottom: "1px solid gray",
            height: 60,
            display: "flex",
            flexDirection: "column",
            // border: "1px solid red",
            // justifyContent:"start",
            alignItems: "start",
          }}
        >
          <span>TAN Number </span>
          {companyFormData && (
            <>
              <b style={{ fontWeight: "bold" }}>
                {companyFormData.tannumber || "N/A"}
              </b>
            </>
          )}
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            width: 150,
            p: 1,
            // borderBottom: "1px solid gray",
            height: 60,
            display: "flex",
            flexDirection: "column",
            // border: "1px solid red",
            // justifyContent:"start",
            alignItems: "start",
          }}
        >
          <span>License Number </span>
          {companyFormData && (
            <>
              <b style={{ fontWeight: "bold" }}>
                {companyFormData.licensenumber || "N/A"}
              </b>
            </>
          )}
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            width: 150,
            p: 1,
            // borderBottom: "1px solid gray",
            height: 60,
            display: "flex",
            flexDirection: "column",
            // border: "1px solid red",
            // justifyContent:"start",
            alignItems: "start",
          }}
        >
          <span>GST Number </span>
          {companyFormData && (
            <>
              <b style={{ fontWeight: "bold" }}>
                {companyFormData.gstnumber || "N/A"}
              </b>
            </>
          )}
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            width: 180,
            p: 1,
            // borderBottom: "1px solid gray",
            height: 60,
            display: "flex",
            flexDirection: "column",
            // border: "1px solid red",
            // justifyContent:"start",
            alignItems: "start",
          }}
        >
          <span>License Vallidity </span>
          {companyFormData && (
            <>
              <b style={{ fontWeight: "bold" }}>
                {companyFormData.licensevallidtill || "N/A"}
              </b>
            </>
          )}
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            width: 200,
            p: 1,
            // borderBottom: "1px solid gray",
            height: 60,
            display: "flex",
            flexDirection: "column",
            // border: "1px solid red",
            // justifyContent:"start",
            alignItems: "start",
          }}
        >
          <span>License Capacity </span>
          {companyFormData && (
            <>
              <b style={{ fontWeight: "bold" }}>
                {companyFormData.licensecapacity || "N/A"}
              </b>
            </>
          )}
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            width: 130,
            p: 1,
            // borderBottom: "1px solid gray",
            height: 60,
            display: "flex",
            flexDirection: "column",
            // border: "1px solid red",
            // justifyContent:"start",
            alignItems: "start",
          }}
        >
          <span>Latitude </span>
          {companyFormData && (
            <>
              <b style={{ fontWeight: "bold" }}>
                {companyFormData.latitude || "N/A"}
              </b>
            </>
          )}
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            width: 180,
            p: 1,
            // borderBottom: "1px solid gray",
            height: 60,
            display: "flex",
            flexDirection: "column",
            // border: "1px solid red",
            // justifyContent:"start",
            alignItems: "start",
          }}
        >
          <span>Longtitude </span>
          {companyFormData && (
            <>
              <b style={{ fontWeight: "bold" }}>
                {companyFormData.longitude || "N/A"}
              </b>
            </>
          )}
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            width: 180,
            p: 1,
            // borderBottom: "1px solid gray",
            height: 60,
            display: "flex",
            flexDirection: "column",
            // border: "1px solid red",
            // justifyContent:"start",
            alignItems: "start",
          }}
        >
          <span>Status</span>
          <b style={{ fontWeight: "bold" }}>Active</b>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
          width: 900,
          // border: "1px solid red",
          height: 60,
        }}
      >
        {/* -------------------------------------------------- */}
        <Button
          variant="contained"
          onClick={() => handleButtonClick("contact")}
        >
          Contact Details
        </Button>
        <Button
          variant="contained"
          onClick={() => handleButtonClick("product")}
        >
          Product Details
        </Button>

        <Button variant="contained" onClick={() => handleButtonClick("sap")}>
          SAP Codes
        </Button>
      </Box>
      <Box
        sx={{
          alignItems: "start",
          width: 900,
          m: 2,
          // border: "1px solid red",
          height: 365,
        }}
      >
        {renderActiveTab()}
      </Box>
    </div>
  );
};

export default CustomerDetailComponent;


