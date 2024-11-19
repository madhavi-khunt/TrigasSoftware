import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Typography } from "@mui/material";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const ProductDetails = () => {
  const { id } = useParams();
  // const [data, setData] = useState([]);

  const [formData, setFormData] = useState(() => {
    const savedFormData = localStorage.getItem("productFormData");
    return (
      JSON.parse(savedFormData) || {
        productsegment: "",
        nokiln: "",
        lengthofkiln: "",
        dailynaturalgasconsumption: "",
        dailypropaneconsumption: "",
        hourlypropaneconsumption: "",
        monthlypropaneconsumption: "",
        startingstock: "",
        newpurchase: "",
        updatedstock: "",
        remaininghourseofstock: "",
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
    if (!formData.productsegment)
      newErrors.productsegment = "Product Segment is required";
    if (!formData.nokiln) newErrors.nokiln = "No. Kiln is required";
    if (!formData.lengthofkiln)
      newErrors.lengthofkiln = "Length of kiln is required";
    if (!formData.dailynaturalgasconsumption)
      newErrors.dailynaturalgasconsumption =
        "Daily Natural Gas Consumption is required";
    if (!formData.dailypropaneconsumption)
      newErrors.dailypropaneconsumption =
        "Daily Propane Consumption is required";
    if (!formData.hourlypropaneconsumption)
      newErrors.hourlypropaneconsumption =
        "Hourly Propane Consumption is required";
    if (!formData.monthlypropaneconsumption)
      newErrors.monthlypropaneconsumption =
        "Monthly Propane Consumption is required";
    if (!formData.startingstock)
      newErrors.startingstock = "Starting Stock is required";
    if (!formData.newpurchase)
      newErrors.newpurchase = "New Purchase is required";
    if (!formData.updatedstock)
      newErrors.updatedstock = "Updated Stock is required";
    if (!formData.remaininghourseofstock)
      newErrors.remaininghourseofstock = "Remaining Hours of Stock is required";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // useEffect(() => {
  //   localStorage.setItem("productFormData", JSON.stringify(formData));
  // }, [formData]);

  const handleSaveToLocalStorage = (e) => {
    e.preventDefault();
    if (validateForm()) {
      localStorage.setItem("productFormData", JSON.stringify(formData));
      console.log("productFormData saved to localStorage:", formData);
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
          productFormData: formData, // Ensure this matches what your controller expects
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
          const productFormData = JSON.parse(
            response.data.data.productFormData
          );

          // Set formData state with the extracted data
          setFormData({
            ...productFormData,
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
  //       "http://localhost:5000/productdetailsinsert",
  //       formData
  //     );
  //     console.log("Response:", response.data);

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
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
        // onSubmit={handleSubmit}
      >
        <Typography sx={{ fontSize: "32px", fontWeight: "bold" }}>
          General Details
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
        </FormControl> */}

        <FormControl
          fullWidth
          sx={{ minWidth: 480 }}
          error={!!errors.productsegment}
        >
          <InputLabel id="demo-simple-select-label">Product Segment</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Product Segment"
            name="productsegment"
            value={formData.productsegment}
            onChange={handleChange}
          >
            <MenuItem value="Gujarat">Gujarat</MenuItem>
            <MenuItem value="Rajasthan">Rajasthan</MenuItem>
            <MenuItem value="Maharashtra">Maharashtra</MenuItem>
          </Select>
          {!!errors.productsegment && (
            <Typography variant="body2" color="error">
              {errors.productsegment}
            </Typography>
          )}
        </FormControl>
        <TextField
          id="outlined-basic"
          label="No. Kiln"
          variant="outlined"
          sx={{ minWidth: 480 }}
          name="nokiln"
          value={formData.nokiln}
          onChange={handleChange}
          error={!!errors.nokiln}
          helperText={errors.nokiln}
        />
        <TextField
          id="outlined-basic"
          label="Length of kiln(meters)"
          variant="outlined"
          sx={{ minWidth: 480 }}
          name="lengthofkiln"
          value={formData.lengthofkiln}
          onChange={handleChange}
          error={!!errors.lengthofkiln}
          helperText={errors.lengthofkiln}
        />
        <TextField
          id="outlined-basic"
          label="Daily Natural Gas Consumption (scm)"
          variant="outlined"
          sx={{ minWidth: 480 }}
          name="dailynaturalgasconsumption"
          value={formData.dailynaturalgasconsumption}
          onChange={handleChange}
          error={!!errors.dailynaturalgasconsumption}
          helperText={errors.dailynaturalgasconsumption}
        />
        <TextField
          id="outlined-basic"
          label="Daily Propane Consumption (mt)"
          variant="outlined"
          sx={{ minWidth: 480 }}
          name="dailypropaneconsumption"
          value={formData.dailypropaneconsumption}
          onChange={handleChange}
          error={!!errors.dailypropaneconsumption}
          helperText={errors.dailypropaneconsumption}
        />
        <TextField
          id="outlined-basic"
          label="Hourly Propane Consumption (kg)"
          variant="outlined"
          sx={{ minWidth: 480 }}
          name="hourlypropaneconsumption"
          value={formData.hourlypropaneconsumption}
          onChange={handleChange}
          error={!!errors.hourlypropaneconsumption}
          helperText={errors.hourlypropaneconsumption}
        />
        {/* // name="numberoftank" // value={formData.numberoftank}
        // onChange={handleChange}
        // required */}
        <TextField
          id="outlined-basic"
          label="Monthly Propane Consumption (mt)"
          variant="outlined"
          sx={{ minWidth: 480 }}
          name="monthlypropaneconsumption"
          value={formData.monthlypropaneconsumption}
          onChange={handleChange}
          error={!!errors.monthlypropaneconsumption}
          helperText={errors.monthlypropaneconsumption}
        />
        <TextField
          id="outlined-basic"
          label="New Purchase"
          variant="outlined"
          sx={{ minWidth: 480, visibility: "hidden" }}
        />

        <Typography sx={{ fontSize: "32px", fontWeight: "bold" }}>
          Stock Details
        </Typography>

        <TextField
          id="outlined-basic"
          label="New Purchase"
          variant="outlined"
          sx={{ minWidth: 480, visibility: "hidden" }}
        />

        <TextField
          id="outlined-basic"
          label="Starting Stock (mt)"
          variant="outlined"
          sx={{ minWidth: 480 }}
          name="startingstock"
          value={formData.startingstock}
          onChange={handleChange}
          error={!!errors.startingstock}
          helperText={errors.startingstock}
        />
        <TextField
          id="outlined-basic"
          label="New Purchase (mt)"
          variant="outlined"
          sx={{ minWidth: 480 }}
          name="newpurchase"
          value={formData.newpurchase}
          onChange={handleChange}
          error={!!errors.newpurchase}
          helperText={errors.newpurchase}
        />
        <TextField
          id="outlined-basic"
          label="Updated Stock (mt)"
          variant="outlined"
          sx={{ minWidth: 480 }}
          name="updatedstock"
          value={formData.updatedstock}
          onChange={handleChange}
          error={!!errors.updatedstock}
          helperText={errors.updatedstock}
        />

        <TextField
          id="outlined-basic"
          label="Remaining Hourse Of Stock"
          variant="outlined"
          sx={{ minWidth: 480 }}
          name="remaininghourseofstock"
          value={formData.remaininghourseofstock}
          onChange={handleChange}
          error={!!errors.remaininghourseofstock}
          helperText={errors.remaininghourseofstock}
        />

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

export default ProductDetails;
