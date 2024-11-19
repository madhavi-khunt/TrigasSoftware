import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import {
  Typography,
  Snackbar,
  Alert,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const VehicleDetails = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    tankercapacitys: [""],
    tankernumber: [""],
    products: [""],
    drivername: [""],
    drivernumber: [""],
  });

  const [errors, setErrors] = useState({});
  const [update, setUpdate] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [savedData, setSavedData] = useState(null);

  // Fetch existing data if editing
  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:5000/edit/${id}`)
        .then((response) => {
          if (response.data) {
            const TankerFormData = JSON.parse(
              response.data.data.TankerFormData
            );
            setFormData(TankerFormData);
            setUpdate(true);
          }
        })
        .catch((error) => {
          console.error("Error fetching customer data:", error);
        });
    }
  }, [id]);

  useEffect(() => {
    // Load data from localStorage on component mount
    const savedFormData = JSON.parse(localStorage.getItem("TankerFormData"));
    if (savedFormData) {
      setFormData({
        tankercapacitys: savedFormData.tankercapacitys || [""],
        tankernumber: savedFormData.tankernumber || [""],
        products: savedFormData.products || [""],
        drivername: savedFormData.drivername || [""],
        drivernumber: savedFormData.drivernumber || [""],
      });
    }
  }, []);

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: prev[name].map((item, i) => (i === index ? value : item)),
    }));
  };

  const addInputField = () => {
    setFormData((prev) => ({
      ...prev,
      tankercapacitys: [...prev.tankercapacitys, ""],
      tankernumber: [...prev.tankernumber, ""],
      products: [...prev.products, ""],
      drivername: [...prev.drivername, ""],
      drivernumber: [...prev.drivernumber, ""],
    }));
  };

  const removeInputFields = (index) => {
    setFormData((prev) => {
      const updatedData = {
        ...prev,
        tankercapacitys: prev.tankercapacitys.filter((_, i) => i !== index),
        tankernumber: prev.tankernumber.filter((_, i) => i !== index),
        products: prev.products.filter((_, i) => i !== index),
        drivername: prev.drivername.filter((_, i) => i !== index),
        drivernumber: prev.drivernumber.filter((_, i) => i !== index),
      };

      // Update localStorage with the updated data
      localStorage.setItem("TankerFormData", JSON.stringify(updatedData));

      return updatedData;
    });
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    formData.tankercapacitys.forEach((capacity, index) => {
      if (!capacity) {
        isValid = false;
        newErrors.tankercapacitys = newErrors.tankercapacitys || [];
        newErrors.tankercapacitys[index] = "Tanker capacity is required.";
      }
    });

    formData.tankernumber.forEach((number, index) => {
      if (!number) {
        isValid = false;
        newErrors.tankernumber = newErrors.tankernumber || [];
        newErrors.tankernumber[index] = "Tanker number is required.";
      }
    });

    formData.products.forEach((product, index) => {
      if (!product) {
        isValid = false;
        newErrors.products = newErrors.products || [];
        newErrors.products[index] = "Product is required.";
      }
    });

    formData.drivername.forEach((name, index) => {
      if (!name) {
        isValid = false;
        newErrors.drivername = newErrors.drivername || [];
        newErrors.drivername[index] = "Driver Name is required.";
      }
    });

    formData.drivernumber.forEach((number, index) => {
      if (!number) {
        isValid = false;
        newErrors.drivernumber = newErrors.drivernumber || [];
        newErrors.drivernumber[index] = "Driver Number is required.";
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSaveToLocalStorage = () => {
    if (!validateForm()) return; // Stop if validation fails
    localStorage.setItem("TankerFormData", JSON.stringify(formData));
    setSavedData(formData); // Update savedData state immediately
    setOpenSnackbar(true); // Show snackbar on success
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSaveToLocalStorage(); // Save data on submit
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        flexWrap: "wrap",
        p: 2,
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <Box
        sx={{
          width: "100%",
          height: "70px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography
          sx={{ fontSize: "32px", fontWeight: "bold", mb: 2, width: "300px" }}
        >
          Tanker Details
        </Typography>
        <Button
          variant="contained"
          color="success"
          onClick={addInputField}
          sx={{ width: 30, height: 43, color: "white" }}
        >
          <AddIcon />
        </Button>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          mb: 2,
          width: "100%",
          justifyContent: "start",
          border: "1px solid black",
          py: 3,
          px: 2,
        }}
      >
        {formData.tankercapacitys &&
          formData.tankercapacitys.map((_, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                flexWrap: "wrap",
              }}
            >
              <FormControl
                fullWidth
                sx={{ width: 300 }}
                error={!!errors.tankercapacitys?.[index]}
              >
                <InputLabel id={`tankercapacity-select-${index}`}>
                  Tanker Capacity
                </InputLabel>

                <Select
                  labelId={`tankercapacity-select-${index}`}
                  name="tankercapacitys"
                  label="Tanker Capacity"
                  value={formData.tankercapacitys[index]}
                  onChange={(e) => handleChange(index, e)}
                >
                  <MenuItem value="16.5">16.5</MenuItem>
                  <MenuItem value="18">18</MenuItem>
                  <MenuItem value="19">19</MenuItem>
                  <MenuItem value="21">21</MenuItem>
                </Select>
                {errors.tankercapacitys?.[index] && (
                  <Typography variant="body2" color="error">
                    {errors.tankercapacitys[index]}
                  </Typography>
                )}
              </FormControl>

              <TextField
                label="Tanker Number"
                name="tankernumber"
                value={formData.tankernumber[index]}
                onChange={(e) => handleChange(index, e)}
                error={!!errors.tankernumber?.[index]}
                helperText={errors.tankernumber?.[index]}
                sx={{ minWidth: 300 }}
              />

              <FormControl
                fullWidth
                sx={{ width: 300 }}
                error={!!errors.products?.[index]}
              >
                <InputLabel id={`product-select-${index}`}>Product</InputLabel>
                <Select
                  labelId={`product-select-${index}`}
                  name="products"
                  label="Product"
                  value={formData.products[index]}
                  onChange={(e) => handleChange(index, e)}
                >
                  <MenuItem value="LPG">LPG</MenuItem>
                  <MenuItem value="PROPANE">PROPANE</MenuItem>
                  <MenuItem value="BUTANE">BUTANE</MenuItem>
                  <MenuItem value="MULTI">MULTI</MenuItem>
                </Select>
                {errors.products?.[index] && (
                  <Typography variant="body2" color="error">
                    {errors.products[index]}
                  </Typography>
                )}
              </FormControl>
              {formData.tankercapacitys.length > 1 && (
                <Button
                  color="error"
                  variant="outlined"
                  onClick={() => removeInputFields(index)}
                  sx={{ minWidth: 40, height: 53 }}
                >
                  <DeleteIcon />
                </Button>
              )}
              <TextField
                label="Driver Name"
                name="drivername"
                value={formData.drivername[index]}
                onChange={(e) => handleChange(index, e)}
                error={!!errors.drivername?.[index]}
                helperText={errors.drivername?.[index]}
                sx={{ minWidth: 300 }}
              />

              <TextField
                label="Driver Number"
                name="drivernumber"
                value={formData.drivernumber[index]}
                onChange={(e) => handleChange(index, e)}
                error={!!errors.drivernumber?.[index]}
                helperText={errors.drivernumber?.[index]}
                sx={{ minWidth: 300 }}
              />
            </Box>
          ))}
      </Box>

      <Stack
        spacing={2}
        direction="row"
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button type="submit" variant="contained" color="success">
          {update ? "Update" : "Save"}
        </Button>
      </Stack>

      {savedData && (
        <TableContainer component={Paper} sx={{ mt: 4 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">Tanker Capacity</TableCell>
                <TableCell align="center">Tanker Number</TableCell>
                <TableCell align="center">Product</TableCell>
                <TableCell align="center">Driver Name</TableCell>
                <TableCell align="center">Driver Number</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {savedData.tankercapacitys.map((capacity, index) => (
                <TableRow key={index}>
                  <TableCell align="center">{capacity}</TableCell>
                  <TableCell align="center">
                    {savedData.tankernumber[index]}
                  </TableCell>
                  <TableCell align="center">
                    {savedData.products[index]}
                  </TableCell>
                  <TableCell align="center">
                    {savedData.drivername[index]}
                  </TableCell>
                  <TableCell align="center">
                    {savedData.drivernumber[index]}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "end", horizontal: "left" }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success">
          Data saved successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default VehicleDetails;
