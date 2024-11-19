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

import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import Chip from "@mui/material/Chip";

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
        companyname: "",
        email: "",
        primaryphonenumber: "",
        secondaryphonenumber: "",
        addressstreet1: "",
        addressstreet2: "",
        state: "",
        country: "",
        city: "",
        zipcode: "",
        associatessuppliers: [],
        team: "",
        typeofcompany: "",
        licensenumber: "",
        ourcompany: "",
        tannumber: "",
        gstnumber: "",
        pannumber: "",
        licensevallidtill: "",
        licensecapacity: "",
        latitude: "",
        longitude: "",
        transporter: [],
        tanknumber: "",
      }
    );
  });

  // console.log(formData);

  const [update, setUpdate] = useState(false);

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]:
        name === "associatessuppliers" || name === "transporter"
          ? [...value]
          : value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.companyname)
      newErrors.companyname = "Company Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.primaryphonenumber)
      newErrors.primaryphonenumber = "Primary Phone Number is required";
    if (!formData.secondaryphonenumber)
      newErrors.secondaryphonenumber = "Secondary Phone Number is required";
    if (!formData.addressstreet1)
      newErrors.addressstreet1 = "Address Street 1 is required";
    if (!formData.addressstreet2)
      newErrors.addressstreet2 = "Address Street 2 is required";
    if (!formData.state) newErrors.state = "State is required";
    if (!formData.country) newErrors.country = "Country is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.zipcode) newErrors.zipcode = "Zip Code is required";
    if (
      !formData.associatessuppliers ||
      formData.associatessuppliers.length === 0
    )
      newErrors.associatessuppliers = "Associates Suppliers is required";
    if (!formData.team) newErrors.team = "Team is required";
    if (!formData.typeofcompany)
      newErrors.typeofcompany = "Typeof Company is required";
    if (!formData.licensenumber)
      newErrors.licensenumber = "License Number is required";
    if (!formData.ourcompany) newErrors.ourcompany = "Our Company is required";
    if (!formData.tannumber) newErrors.tannumber = "TAN Number is required";
    if (!formData.gstnumber) newErrors.gstnumber = "GST Number is required";
    if (!formData.pannumber) newErrors.pannumber = "PAN Number is required";
    if (!formData.licensevallidtill)
      newErrors.licensevallidtill = "License Vallidtill is required";
    if (!formData.licensecapacity)
      newErrors.licensecapacity = "License Capacity is required";
    if (!formData.latitude) newErrors.latitude = "Latitude is required";
    if (!formData.longitude) newErrors.longitude = "Longitude is required";
    if (!formData.transporter || formData.transporter.length === 0)
      newErrors.transporter = "Transporter is required";
    if (!formData.tanknumber) newErrors.tanknumber = "Tank Number is required";
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
              associatessuppliers: companyFormData.associatessuppliers || [],
              transporter: companyFormData.transporter || [],
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

  const transporterOptions = ["Gopinath Logistics", "R H Shah", "Balaji"];
  const associatesSuppliers = [
    "Reliance",
    "IOCL",
    "HPCL",
    "BPCL",
    "Adani",
    "Gail",
  ];

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
      <Typography sx={{ fontSize: "32px", fontWeight: "bold" }}>
        Company Details
      </Typography>

      <Box sx={{ minWidth: 480 }}></Box>

      <TextField
        required
        id="outlined-basic"
        label="Company Name"
        variant="outlined"
        name="companyname"
        value={formData.companyname}
        onChange={handleChange}
        sx={{ minWidth: 480 }}
        error={!!errors.companyname}
        helperText={errors.companyname}
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
        label="Primary Phone Number"
        variant="outlined"
        sx={{ minWidth: 480 }}
        name="primaryphonenumber"
        value={formData.primaryphonenumber}
        onChange={handleChange}
        error={!!errors.primaryphonenumber}
        helperText={errors.primaryphonenumber}
      />
      <TextField
        id="outlined-basic"
        label="Secondary Phone Number"
        variant="outlined"
        sx={{ minWidth: 480 }}
        name="secondaryphonenumber"
        value={formData.secondaryphonenumber}
        onChange={handleChange}
        error={!!errors.secondaryphonenumber}
        helperText={errors.secondaryphonenumber}
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
        error={!!errors.associatessuppliers}
      >
        <InputLabel id="suppliers-label">Associated Suppliers</InputLabel>
        <Select
          labelId="suppliers-label"
          id="suppliers-select"
          multiple
          value={formData.associatessuppliers || ""}
          name="associatessuppliers"
          label="Associated Suppliers"
          onChange={handleChange}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip
                  key={value}
                  label={value}
                  sx={{ backgroundColor: "rgb(33, 34, 45)", color: "#fff" }}
                />
              ))}
            </Box>
          )}
        >
          {associatesSuppliers.map((associatessuppliers) => (
            <MenuItem key={associatessuppliers} value={associatessuppliers}>
              <Checkbox
                checked={
                  formData.associatessuppliers.indexOf(associatessuppliers) > -1
                }
              />
              <ListItemText primary={associatessuppliers} />
            </MenuItem>
          ))}
        </Select>
        {!!errors.associatessuppliers && (
          <Typography variant="body2" color="error">
            {errors.associatessuppliers}
          </Typography>
        )}
      </FormControl>

      <FormControl fullWidth sx={{ minWidth: 480 }} error={!!errors.team}>
        <InputLabel id="team-label">Team</InputLabel>
        <Select
          labelId="team-label"
          id="team-select"
          value={formData.team || ""}
          name="team"
          label="Team"
          onChange={handleChange}
        >
          <MenuItem value="Team 1">Team 1</MenuItem>
          <MenuItem value="Team 2">Team 2</MenuItem>
        </Select>
        {!!errors.team && (
          <Typography variant="body2" color="error">
            {errors.team}
          </Typography>
        )}
      </FormControl>

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
        label="License Number"
        variant="outlined"
        sx={{ minWidth: 480 }}
        name="licensenumber"
        value={formData.licensenumber}
        onChange={handleChange}
        error={!!errors.licensenumber}
        helperText={errors.licensenumber}
      />

      <FormControl fullWidth sx={{ minWidth: 480 }} error={!!errors.ourcompany}>
        <InputLabel id="our-company-label">Our Company</InputLabel>
        <Select
          labelId="our-company-label"
          id="our-company-select"
          value={formData.ourcompany || ""}
          name="ourcompany"
          label="Our Company"
          onChange={handleChange}
        >
          <MenuItem value="Trinity Engi Tech">Trinity Engi Tech</MenuItem>
          <MenuItem value="Harikrishna Commercial Bharat Gas">
            Harikrishna Commercial Bharat Gas
          </MenuItem>
          <MenuItem value="Harikrishna Tradelink">
            Harikrishna Tradelink
          </MenuItem>
          <MenuItem value="Anquie Nonwoven Pvt Ltd & Merc Inc">
            Anquie Nonwoven Pvt Ltd
          </MenuItem>
          <MenuItem value="Merc Inc">Merc Inc</MenuItem>
          <MenuItem value="Mahavir Impex">Mahavir Impex</MenuItem>
          <MenuItem value="Mahavir Import Export">
            Mahavir Import Export
          </MenuItem>
          <MenuItem value="Gopinath Energy">Gopinath Energy</MenuItem>
          <MenuItem value="Gopinath Engineering">Gopinath Engineering</MenuItem>
        </Select>
        {!!errors.ourcompany && (
          <Typography variant="body2" color="error">
            {errors.ourcompany}
          </Typography>
        )}
      </FormControl>

      <TextField
        id="outlined-basic"
        label="TAN Number"
        variant="outlined"
        sx={{ minWidth: 480 }}
        name="tannumber"
        value={formData.tannumber}
        onChange={handleChange}
        error={!!errors.tannumber}
        helperText={errors.tannumber}
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
        label="License Valid Till"
        variant="outlined"
        type="date"
        InputLabelProps={{ shrink: true }}
        sx={{ minWidth: 480 }}
        name="licensevallidtill"
        value={formData.licensevallidtill}
        onChange={handleChange}
        error={!!errors.licensevallidtill}
        helperText={errors.licensevallidtill}
      />
      <TextField
        id="outlined-basic"
        label="License Capacity"
        variant="outlined"
        sx={{ minWidth: 480 }}
        name="licensecapacity"
        value={formData.licensecapacity}
        onChange={handleChange}
        error={!!errors.licensecapacity}
        helperText={errors.licensecapacity}
      />
      <TextField
        id="outlined-basic"
        label="Latitude"
        variant="outlined"
        sx={{ minWidth: 480 }}
        name="latitude"
        value={formData.latitude}
        onChange={handleChange}
        error={!!errors.latitude}
        helperText={errors.latitude}
      />
      <TextField
        id="outlined-basic"
        label="Longitude"
        variant="outlined"
        sx={{ minWidth: 480 }}
        name="longitude"
        value={formData.longitude}
        onChange={handleChange}
        error={!!errors.longitude}
        helperText={errors.longitude}
      />

      <FormControl
        fullWidth
        sx={{ minWidth: 480 }}
        error={!!errors.transporter}
      >
        <InputLabel id="transporter-label">Transporter</InputLabel>
        <Select
          labelId="transporter-label"
          id="transporter-select"
          multiple
          value={formData.transporter || ""}
          name="transporter"
          label="Transporter"
          onChange={handleChange}
          // error={!!errors.transporter}
          // helperText={errors.transporter}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip
                  key={value}
                  label={value}
                  sx={{ backgroundColor: "rgb(33, 34, 45)", color: "#fff" }}
                />
              ))}
            </Box>
          )}
        >
          {transporterOptions.map((transporter) => (
            <MenuItem key={transporter} value={transporter}>
              <Checkbox
                checked={formData.transporter.indexOf(transporter) > -1}
              />
              <ListItemText primary={transporter} />
            </MenuItem>
          ))}
        </Select>
        {!!errors.transporter && (
          <Typography variant="body2" color="error">
            {errors.transporter}
          </Typography>
        )}
      </FormControl>

      <TextField
        id="outlined-basic"
        label="Tank Number"
        variant="outlined"
        sx={{ minWidth: 480 }}
        name="tanknumber"
        value={formData.tanknumber}
        onChange={handleChange}
        error={!!errors.tanknumber}
        helperText={errors.tanknumber}
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
