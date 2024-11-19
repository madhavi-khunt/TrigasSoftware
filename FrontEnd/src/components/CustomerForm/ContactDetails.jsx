import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
// import MenuItem from "@mui/material/MenuItem";
// import FormControl from "@mui/material/FormControl";
// import InputLabel from "@mui/material/InputLabel";
// import Select from "@mui/material/Select";
import { useState, useEffect } from "react";

import axios from "axios";

import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import { useParams, useNavigate } from "react-router-dom";

const ContactDetails = () => {
  const { id } = useParams();
  // const [data, setData] = useState([]);
  const [formData, setFormData] = useState(() => {
    const savedFormData = localStorage.getItem("contactFormData");
    return (
      JSON.parse(savedFormData) || {
        namefororder: "",
        phonenumberfororder: "",
        nameforstock: "",
        phonenumberforstock: "",
        nameforpayment: "",
        phonenumberforpayment: "",
        nameforoperator: "",
        phonenumberforoperator: "",
        nameforowner: "",
        phonenumberforowner: "",
      }
    );
  });

  console.log(formData);

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };
  const validateForm = () => {
    const newErrors = {};
    if (!formData.namefororder)
      newErrors.namefororder = "Name for Order is required";
    if (!formData.phonenumberfororder)
      newErrors.phonenumberfororder = "Phone Number for Order is required";
    if (!formData.nameforstock)
      newErrors.nameforstock = "Name for Stock is required";
    if (!formData.phonenumberforstock)
      newErrors.phonenumberforstock = "Phone Number for Stock is required";
    if (!formData.nameforpayment)
      newErrors.nameforpayment = "Name for Payment is required";
    if (!formData.phonenumberforpayment)
      newErrors.phonenumberforpayment = "Phone Number for Payment is required";
    if (!formData.nameforoperator)
      newErrors.nameforoperator = "Name for Operator is required";
    if (!formData.phonenumberforoperator)
      newErrors.phonenumberforoperator =
        "Phone Number for Operator is required";
    if (!formData.nameforowner)
      newErrors.nameforowner = "Name for Owner is required";
    if (!formData.phonenumberforowner)
      newErrors.phonenumberforowner = "Phone Number for Owner is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // useEffect(() => {
  //   localStorage.setItem("contactFormData", JSON.stringify(formData));
  // }, [formData]);

  const handleSaveToLocalStorage = (e) => {
    e.preventDefault();
    if (validateForm()) {
      localStorage.setItem("contactFormData", JSON.stringify(formData));
      console.log("Data contactFormData saved to localStorage:", formData);
      showSnackbar("Data saved successfully!"); // Show snackbar on success
    } else {
      console.log("Form validation failed");
    }
  };
  const handleUpdate = (e) => {
    e.preventDefault();

    if (validateForm()) {
      axios
        .put(`http://localhost:5000/updateotherdata/${id}`, {
          contactFormData: formData, // Ensure this matches what your controller expects
        })
        .then((response) => {
          // Optionally navigate or clear form data here
          // navigate("/customertable");
          showSnackbar("Data updated successfully!");
        })
        .catch((error) => {
          console.error("Error updating data:", error);
          showSnackbar("Error updating data.");
        });
    } else {
      showSnackbar("Form validation failed.");
    }
  };

  const [update, setUpdate] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/edit/${id}`)
      .then((response) => {
        if (response.data) {
          // Extract companyFormData from response.data.data
          const contactFormData = JSON.parse(
            response.data.data.contactFormData
          );

          // Set formData state with the extracted data
          setFormData({
            ...contactFormData,
          });
          setUpdate(true);
        }
      })
      .catch((error) => {
        console.error("Error fetching customer data:", error);
      });
  }, [id]);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.post(
  //       "http://localhost:5000/contactdetails",
  //       formData
  //     );

  //     console.log("Response", response.data);

  //   } catch (error) {
  //     console.error("There was an error submitting the form:", error);
  //   }
  // };

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:5000/customerview")
  //     .then((response) => {
  //       setData(response.data);
  //       console.log(response);
  //     })
  //     .catch((error) => {
  //       console.error("There was an error fetching the data!", error);
  //     });
  // }, []);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const showSnackbar = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  return (
    <>
      <Box
        component="form"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
          flexWrap: "wrap",
          //   mt: 2,
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
        // onSubmit={handleSubmit}
      >
        <Typography sx={{ fontSize: "32px", fontWeight: "bold" }}>
          Contact Details
        </Typography>
        <Box sx={{ minWidth: 480 }}></Box>
        {/* <FormControl fullWidth sx={{ minWidth: 480 }}>
          <InputLabel id="customer-select-label">Customer</InputLabel>
          <Select
            labelId="customer-select-label"
            id="customer-select"
            name="customer_id"
            value={formData.customer_id}
            onChange={handleChange}
            label="Customer"
          >
            {data.map((item) => (
              <MenuItem key={item._id} value={item._id}>
                {item.companyname}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          id="outlined-basic"
          label="Name ( For Order )"
          variant="outlined"
          sx={{ minWidth: 480, visibility: "hidden" }}
        /> */}
        <TextField
          id="outlined-basic"
          label="Name ( For Order )"
          variant="outlined"
          sx={{ minWidth: 480 }}
          onChange={handleChange}
          name="namefororder"
          value={formData.namefororder}
          error={!!errors.namefororder}
          helperText={errors.namefororder}
        />
        <TextField
          id="outlined-basic"
          label="Phone Number ( For Order )"
          variant="outlined"
          sx={{ minWidth: 480 }}
          onChange={handleChange}
          name="phonenumberfororder"
          value={formData.phonenumberfororder}
          error={!!errors.phonenumberfororder}
          helperText={errors.phonenumberfororder}
        />
        {/* --------- */}
        <TextField
          id="outlined-basic"
          label="Name ( For Stock )"
          variant="outlined"
          sx={{ minWidth: 480 }}
          onChange={handleChange}
          name="nameforstock"
          value={formData.nameforstock}
          error={!!errors.nameforstock}
          helperText={errors.nameforstock}
        />
        <TextField
          id="outlined-basic"
          label="Phone Number ( For Stock )"
          variant="outlined"
          sx={{ minWidth: 480 }}
          onChange={handleChange}
          name="phonenumberforstock"
          value={formData.phonenumberforstock}
          error={!!errors.phonenumberforstock}
          helperText={errors.phonenumberforstock}
        />
        {/* ---------------- */}
        <TextField
          id="outlined-basic"
          label="Name ( For Payment )"
          variant="outlined"
          sx={{ minWidth: 480 }}
          onChange={handleChange}
          name="nameforpayment"
          value={formData.nameforpayment}
          error={!!errors.nameforpayment}
          helperText={errors.nameforpayment}
        />
        <TextField
          id="outlined-basic"
          label="Phone Number ( For Payment )"
          variant="outlined"
          sx={{ minWidth: 480 }}
          onChange={handleChange}
          name="phonenumberforpayment"
          value={formData.phonenumberforpayment}
          error={!!errors.phonenumberforpayment}
          helperText={errors.phonenumberforpayment}
        />
        {/* ------------------ */}
        <TextField
          id="outlined-basic"
          label="Name ( For Operator )"
          variant="outlined"
          sx={{ minWidth: 480 }}
          onChange={handleChange}
          name="nameforoperator"
          value={formData.nameforoperator}
          error={!!errors.nameforoperator}
          helperText={errors.nameforoperator}
        />
        <TextField
          id="outlined-basic"
          label="Phone Number ( For Operator )"
          variant="outlined"
          sx={{ minWidth: 480 }}
          onChange={handleChange}
          name="phonenumberforoperator"
          value={formData.phonenumberforoperator}
          error={!!errors.phonenumberforoperator}
          helperText={errors.phonenumberforoperator}
        />
        {/* ---------------- */}
        <TextField
          id="outlined-basic"
          label="Name ( For Owner )"
          variant="outlined"
          sx={{ minWidth: 480 }}
          onChange={handleChange}
          name="nameforowner"
          value={formData.nameforowner}
          error={!!errors.nameforowner}
          helperText={errors.nameforowner}
        />
        <TextField
          id="outlined-basic"
          label="Phone Number ( For Owner )"
          variant="outlined"
          sx={{ minWidth: 480 }}
          onChange={handleChange}
          name="phonenumberforowner"
          value={formData.phonenumberforowner}
          error={!!errors.phonenumberforowner}
          helperText={errors.phonenumberforowner}
        />
        {/* ---------------    */}
        <Box
          sx={{
            height: 60,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Stack spacing={2} direction="row">
            <Button
              variant="contained"
              color="success"
              sx={{ minWidth: 100 }}
              type="submit"
              onClick={update ? handleUpdate : handleSaveToLocalStorage}
            >
              {update ? "Update" : "Save"}
            </Button>
            <Button variant="outlined" color="error" sx={{ minWidth: 100 }}>
              Cancel
            </Button>
          </Stack>
        </Box>
        {/* Snackbar for success message */}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
        >
          <Alert onClose={handleSnackbarClose} severity="success">
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Box>
    </>
  );
};

export default ContactDetails;
