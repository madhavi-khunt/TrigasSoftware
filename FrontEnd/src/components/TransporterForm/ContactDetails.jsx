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

import { useParams } from "react-router-dom";

const ContactDetails = () => {
  const { id } = useParams();
  // const [data, setData] = useState([]);
  const [formData, setFormData] = useState(() => {
    const savedFormData = localStorage.getItem("contactFormData");
    return (
      JSON.parse(savedFormData) || {
        nameofowner: "",
        phonenumberofowner: "",
        nameofmanager1: "",
        phonenumberofmanager1: "",
        nameofmanager2: "",
        phonenumberofmanager2: "",
        nameofmanager3: "",
        phonenumberofmanager3: "",
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
    if (!formData.nameofowner)
      newErrors.nameofowner = "Name for Owner is required";
    if (!formData.phonenumberofowner)
      newErrors.phonenumberofowner = "Phone Number for Owner is required";
    if (!formData.nameofmanager1)
      newErrors.nameofmanager1 = "Name for Manager1 is required";
    if (!formData.phonenumberofmanager1)
      newErrors.phonenumberofmanager1 = "Phone Number for Manager1 is required";
    if (!formData.nameofmanager2)
      newErrors.nameofmanager2 = "Name for Manager2 is required";
    if (!formData.phonenumberofmanager2)
      newErrors.phonenumberofmanager2 = "Phone Number for Manager2 is required";
    if (!formData.nameofmanager3)
      newErrors.nameofmanager3 = "Name for Manager3 is required";
    if (!formData.phonenumberofmanager3)
      newErrors.phonenumberofmanager3 = "Phone Number for Manager3 is required";

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
        .then(() => {
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
        <Typography
          sx={{ fontSize: "32px", fontWeight: "bold", minWidth: 960 }}
        >
          Transporter Contact Details
        </Typography>
        <TextField
          id="outlined-basic"
          label="Name ( Owner )"
          variant="outlined"
          sx={{ minWidth: 480 }}
          onChange={handleChange}
          name="nameofowner"
          value={formData.nameofowner}
          error={!!errors.nameofowner}
          helperText={errors.nameofowner}
        />
        <TextField
          id="outlined-basic"
          label="Phone Number ( Owner )"
          variant="outlined"
          sx={{ minWidth: 480 }}
          onChange={handleChange}
          name="phonenumberofowner"
          value={formData.phonenumberofowner}
          error={!!errors.phonenumberofowner}
          helperText={errors.phonenumberofowner}
        />
        {/* --------- */}
        <TextField
          id="outlined-basic"
          label="Name ( Manager1 )"
          variant="outlined"
          sx={{ minWidth: 480 }}
          onChange={handleChange}
          name="nameofmanager1"
          value={formData.nameofmanager1}
          error={!!errors.nameofmanager1}
          helperText={errors.nameofmanager1}
        />
        <TextField
          id="outlined-basic"
          label="Phone Number ( Manager1 )"
          variant="outlined"
          sx={{ minWidth: 480 }}
          onChange={handleChange}
          name="phonenumberofmanager1"
          value={formData.phonenumberofmanager1}
          error={!!errors.phonenumberofmanager1}
          helperText={errors.phonenumberofmanager1}
        />
        {/* ---------------- */}
        <TextField
          id="outlined-basic"
          label="Name ( Manager2 )"
          variant="outlined"
          sx={{ minWidth: 480 }}
          onChange={handleChange}
          name="nameofmanager2"
          value={formData.nameofmanager2}
          error={!!errors.nameofmanager2}
          helperText={errors.nameofmanager2}
        />
        <TextField
          id="outlined-basic"
          label="Phone Number ( Manager2 )"
          variant="outlined"
          sx={{ minWidth: 480 }}
          onChange={handleChange}
          name="phonenumberofmanager2"
          value={formData.phonenumberofmanager2}
          error={!!errors.phonenumberofmanager2}
          helperText={errors.phonenumberofmanager2}
        />
        {/* ------------------ */}
        <TextField
          id="outlined-basic"
          label="Name ( Manager3 )"
          variant="outlined"
          sx={{ minWidth: 480 }}
          onChange={handleChange}
          name="nameofmanager3"
          value={formData.nameofmanager3}
          error={!!errors.nameofmanager3}
          helperText={errors.nameofmanager3}
        />
        <TextField
          id="outlined-basic"
          label="Phone Number ( Manager3 )"
          variant="outlined"
          sx={{ minWidth: 480 }}
          onChange={handleChange}
          name="phonenumberofmanager3"
          value={formData.phonenumberofmanager3}
          error={!!errors.phonenumberofmanager3}
          helperText={errors.phonenumberofmanager3}
        />
        {/* ---------------- */}

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
