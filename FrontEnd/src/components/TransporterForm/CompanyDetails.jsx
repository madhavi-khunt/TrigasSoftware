import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const CompanyDetails = () => {
  const { id } = useParams();
  // const navigate = useNavigate();
  console.log(id);

  const [formData, setFormData] = useState(() => {
    const savedFormData = localStorage.getItem("companyFormData");
    return (
      JSON.parse(savedFormData) || {
        transportercompanyname: "",
        email: "",
        addressstreet1: "",
        addressstreet2: "",
        state: "",
        country: "",
        city: "",
        zipcode: "",
        typeofcompany: "",
        pannumber: "",
        gstnumber: "",
        noofvehicle: "",
        lpgvehicle: "",
        butanevehicle: "",
        multivehicle: "",
      }
    );
  });

  console.log(formData);

  const [update, setUpdate] = useState(false);

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.transportercompanyname)
      newErrors.transportercompanyname = "TransporterCompany Name is required";
    if (!formData.email) newErrors.email = "Email is required";

    if (!formData.addressstreet1)
      newErrors.addressstreet1 = "Address Street 1 is required";
    if (!formData.addressstreet2)
      newErrors.addressstreet2 = "Address Street 2 is required";
    if (!formData.state) newErrors.state = "State is required";
    if (!formData.country) newErrors.country = "Country is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.zipcode) newErrors.zipcode = "Zip Code is required";

    if (!formData.typeofcompany)
      newErrors.typeofcompany = "Typeof Company is required";

    if (!formData.pannumber) newErrors.pannumber = "PAN Number is required";
    if (!formData.gstnumber) newErrors.gstnumber = "GST Number is required";
    if (!formData.noofvehicle)
      newErrors.noofvehicle = "noofvehicle is required";
    if (!formData.lpgvehicle) newErrors.lpgvehicle = "lpgvehicle is required";
    if (!formData.propanevehicle)
      newErrors.propanevehicle = "propanevehicle is required";
    if (!formData.butanevehicle)
      newErrors.butanevehicle = "butanevehicle is required";
    if (!formData.multivehicle)
      newErrors.multivehicle = "multivehicle is required";
    // Add other required fields here...

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveToLocalStorage = (e) => {
    e.preventDefault();
    if (validateForm()) {
      localStorage.setItem("companyFormData", JSON.stringify(formData));
      console.log("Data saved to localStorage:", formData);
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
          companyFormData: formData, // Ensure this matches what your controller expects
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

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:5000/edit/${id}`)
        .then((response) => {
          if (response.data) {
            const companyFormData = JSON.parse(
              response.data.data.companyFormData
            );
            setFormData({
              ...companyFormData,
            });
            setUpdate(true);
          }
        })
        .catch((error) => {
          console.error("Error fetching customer data:", error);
        });
    }
  }, [id]);

  console.log(formData);

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
    <Box
      component="form"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly",
        flexWrap: "wrap",
        "& > :not(style)": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
      // onSubmit={handleSubmit}
    >
      <Typography sx={{ fontSize: "32px", fontWeight: "bold", minWidth: 960 }}>
        Transporter Company Details
      </Typography>

      <TextField
        required
        id="outlined-basic"
        label="Transporter Company Name"
        variant="outlined"
        name="transportercompanyname"
        value={formData.transportercompanyname}
        onChange={handleChange}
        sx={{ minWidth: 480 }}
        error={!!errors.transportercompanyname}
        helperText={errors.transportercompanyname}
      />
      <TextField
        id="outlined-basic"
        label="Email"
        variant="outlined"
        sx={{ minWidth: 480 }}
        name="email"
        value={formData.email}
        onChange={handleChange}
        error={!!errors.email}
        helperText={errors.email}
      />

      <TextField
        id="outlined-basic"
        label="Address Street 1"
        variant="outlined"
        sx={{ minWidth: 480 }}
        name="addressstreet1"
        value={formData.addressstreet1}
        onChange={handleChange}
        error={!!errors.addressstreet1}
        helperText={errors.addressstreet1}
      />
      <TextField
        id="outlined-basic"
        label="Address Street 2"
        variant="outlined"
        sx={{ minWidth: 480 }}
        name="addressstreet2"
        value={formData.addressstreet2}
        onChange={handleChange}
        error={!!errors.addressstreet2}
        helperText={errors.addressstreet2}
      />

      <FormControl fullWidth sx={{ minWidth: 480 }} error={!!errors.state}>
        <InputLabel id="state-label">State</InputLabel>
        <Select
          labelId="state-label"
          id="state-select"
          label="State"
          name="state"
          value={formData.state || ""}
          onChange={handleChange}
        >
          <MenuItem value="Gujarat">Gujarat</MenuItem>
          <MenuItem value="Rajasthan">Rajasthan</MenuItem>
          <MenuItem value="Maharashtra">Maharashtra</MenuItem>
        </Select>
        {!!errors.state && (
          <Typography variant="body2" color="error">
            {errors.state}
          </Typography>
        )}
      </FormControl>

      <FormControl fullWidth sx={{ minWidth: 480 }} error={!!errors.country}>
        <InputLabel id="country-label">Country</InputLabel>
        <Select
          labelId="country-label"
          id="country-select"
          value={formData.country || ""}
          name="country"
          label="Country"
          onChange={handleChange}
        >
          <MenuItem value="India">India</MenuItem>
        </Select>
        {!!errors.country && (
          <Typography variant="body2" color="error">
            {errors.country}
          </Typography>
        )}
      </FormControl>

      <FormControl fullWidth sx={{ minWidth: 480 }} error={!!errors.city}>
        <InputLabel id="city-label">City</InputLabel>
        <Select
          labelId="city-label"
          id="city-select"
          value={formData.city || ""}
          name="city"
          label="City"
          onChange={handleChange}
        >
          <MenuItem value="Morbi">Morbi</MenuItem>
          <MenuItem value="OutSide-Morbi">OutSide-Morbi</MenuItem>
        </Select>
        {!!errors.city && (
          <Typography variant="body2" color="error">
            {errors.city}
          </Typography>
        )}
      </FormControl>

      <TextField
        id="outlined-basic"
        label="Zip Code"
        variant="outlined"
        sx={{ minWidth: 480 }}
        name="zipcode"
        value={formData.zipcode}
        onChange={handleChange}
        error={!!errors.zipcode}
        helperText={errors.zipcode}
      />

      <FormControl
        fullWidth
        sx={{ minWidth: 480 }}
        error={!!errors.typeofcompany}
      >
        <InputLabel id="company-type-label">Type Of Company</InputLabel>
        <Select
          labelId="company-type-label"
          id="company-type-select"
          value={formData.typeofcompany || ""}
          label="Type of Company"
          name="typeofcompany"
          onChange={handleChange}
        >
          <MenuItem value="Partnership">Partnership</MenuItem>
          <MenuItem value="LLP">LLP</MenuItem>
          <MenuItem value="Limited">Limited</MenuItem>
          <MenuItem value="Private Limited">Private Limited</MenuItem>
        </Select>
        {!!errors.typeofcompany && (
          <Typography variant="body2" color="error">
            {errors.typeofcompany}
          </Typography>
        )}
      </FormControl>
      <TextField
        id="outlined-basic"
        label="PAN Number"
        variant="outlined"
        sx={{ minWidth: 480 }}
        name="pannumber"
        value={formData.pannumber}
        onChange={handleChange}
        error={!!errors.pannumber}
        helperText={errors.pannumber}
      />
      <TextField
        id="outlined-basic"
        label="GST Number"
        variant="outlined"
        sx={{ minWidth: 480 }}
        name="gstnumber"
        value={formData.gstnumber}
        onChange={handleChange}
        error={!!errors.gstnumber}
        helperText={errors.gstnumber}
      />
      <TextField
        id="outlined-basic"
        label="Total No. of Vehicles"
        variant="outlined"
        sx={{ minWidth: 480 }}
        name="noofvehicle"
        value={formData.noofvehicle}
        onChange={handleChange}
        error={!!errors.noofvehicle}
        helperText={errors.noofvehicle}
      />
      <TextField
        id="outlined-basic"
        label="No. of Propane Vehicles"
        variant="outlined"
        sx={{ minWidth: 480 }}
        name="propanevehicle"
        value={formData.propanevehicle}
        onChange={handleChange}
        error={!!errors.propanevehicle}
        helperText={errors.propanevehicle}
      />
      <TextField
        id="outlined-basic"
        label="No. of LPG Vehicles"
        variant="outlined"
        sx={{ minWidth: 480 }}
        name="lpgvehicle"
        value={formData.lpgvehicle}
        onChange={handleChange}
        error={!!errors.lpgvehicle}
        helperText={errors.lpgvehicle}
      />
      <TextField
        id="outlined-basic"
        label="No. of Butane Vehicles"
        variant="outlined"
        sx={{ minWidth: 480 }}
        name="butanevehicle"
        value={formData.butanevehicle}
        onChange={handleChange}
        error={!!errors.butanevehicle}
        helperText={errors.butanevehicle}
      />
      <TextField
        id="outlined-basic"
        label="No. of Multi Vehicles"
        variant="outlined"
        sx={{ minWidth: 480 }}
        name="multivehicle"
        value={formData.multivehicle}
        onChange={handleChange}
        error={!!errors.multivehicle}
        helperText={errors.multivehicle}
      />
      <Box
        sx={{
          height: 60,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Stack spacing={2} direction="row">
          <Link>
            <Button
              variant="contained"
              color="success"
              sx={{ minWidth: 100 }}
              type="submit"
              onClick={update ? handleUpdate : handleSaveToLocalStorage}
            >
              {update ? "Update" : "Save"}
            </Button>
          </Link>
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
  );
};

export default CompanyDetails;
