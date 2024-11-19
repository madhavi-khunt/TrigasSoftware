import {
  Box,
  TextField,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Button,
  Typography,
  Snackbar,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const DocumentDetails = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    documenttypes: [""],
    tankernumber: [""],
    expirydate: [""],
  });
  const [errors, setErrors] = useState({});
  const [update, setUpdate] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false); // Snackbar state

  const [savedData, setSavedData] = useState(null); // Store saved data here

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:5000/edit/${id}`)
        .then((response) => {
          if (response.data) {
            const DocumentFormData = JSON.parse(
              response.data.data.DocumentFormData
            );
            setFormData(DocumentFormData);
            setUpdate(true);
          }
        })
        .catch((error) => {
          console.error("Error fetching customer data:", error);
        });
    }
  }, [id]);

  useEffect(() => {
    const savedFormData = JSON.parse(localStorage.getItem("DocumentFormData"));
    if (savedFormData) {
      setFormData({
        documenttypes: savedFormData.documenttypes || [""],
        tankernumber: savedFormData.tankernumber || [""],
        expirydate: savedFormData.expirydate || [""],
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
      documenttypes: [...prev.documenttypes, ""],
      tankernumber: [...prev.tankernumber, ""],
      expirydate: [...prev.expirydate, ""],
    }));
  };

  const removeInputFields = (index) => {
    setFormData((prev) => {
      const updatedData = {
        ...prev,
        documenttypes: prev.documenttypes.filter((_, i) => i !== index),
        tankernumber: prev.tankernumber.filter((_, i) => i !== index),
        expirydate: prev.expirydate.filter((_, i) => i !== index),
      };

      // Update localStorage with the updated data
      localStorage.setItem("DocumentFormData", JSON.stringify(updatedData));

      return updatedData;
    });
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    formData.documenttypes.forEach((type, index) => {
      if (!type) {
        isValid = false;
        newErrors.documenttypes = newErrors.documenttypes || [];
        newErrors.documenttypes[index] = "Document Type is required.";
      }
    });

    formData.tankernumber.forEach((number, index) => {
      if (!number) {
        isValid = false;
        newErrors.tankernumber = newErrors.tankernumber || [];
        newErrors.tankernumber[index] = "Tanker number is required.";
      }
    });

    formData.expirydate.forEach((number, index) => {
      if (!number) {
        isValid = false;
        newErrors.expirydate = newErrors.expirydate || [];
        newErrors.expirydate[index] = "Expiry Date is required.";
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSaveToLocalStorage = () => {
    if (!validateForm()) return;

    localStorage.setItem("DocumentFormData", JSON.stringify(formData));

    // Set the saved data to trigger table rendering
    setSavedData(formData);

    setOpenSnackbar(true);
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
      sx={{ p: 2 }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      {/* Existing form content */}
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
          Document Details
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
        }}
      >
        {formData.documenttypes &&
          formData.documenttypes.map((_, index) => (
            <Box
              key={index}
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              <FormControl
                fullWidth
                sx={{ width: 300 }}
                error={!!errors.documenttypes?.[index]}
              >
                <InputLabel id={`documenttype-select-${index}`}>
                  Document Type
                </InputLabel>
                <Select
                  labelId={`documenttype-select-${index}`}
                  name="documenttypes"
                  label="Document Type"
                  value={formData.documenttypes[index]}
                  onChange={(e) => handleChange(index, e)}
                >
                  <MenuItem value="License">License</MenuItem>
                  <MenuItem value="Approval">Approval</MenuItem>
                  <MenuItem value="Rule 18">Rule 18</MenuItem>
                </Select>
                {errors.documenttypes?.[index] && (
                  <Typography variant="body2" color="error">
                    {errors.documenttypes[index]}
                  </Typography>
                )}
              </FormControl>

              <TextField
                label="Tanker Number"
                name="tankernumber"
                value={formData.tankernumber?.[index] || ""}
                onChange={(e) => handleChange(index, e)}
                error={!!errors.tankernumber?.[index]}
                helperText={errors.tankernumber?.[index]}
                sx={{ minWidth: 300 }}
              />

              <TextField
                type="date"
                name="expirydate"
                label="Expiry Date"
                value={formData.expirydate?.[index] || ""}
                onChange={(e) => handleChange(index, e)}
                InputLabelProps={{ shrink: true }}
                error={!!errors.expirydate?.[index]}
                helperText={errors.expirydate?.[index]}
                sx={{ minWidth: 300 }}
              />
              <button
                style={{
                  background: "#E8E8FB",
                  border: "none",
                  color: "#6362E7",
                  borderRadius: "8px",
                  padding: "16px  26px",
                }}
              >
                Import
              </button>

              {formData.documenttypes.length > 1 && (
                <Button
                  color="error"
                  variant="outlined"
                  onClick={() => removeInputFields(index)}
                  sx={{ height: 40 }}
                >
                  <DeleteIcon />
                </Button>
              )}
            </Box>
          ))}
      </Box>

      <Box sx={{ textAlign: "center", mt: 3 }}>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          sx={{ width: 120, height: 50, backgroundColor: "#5765F2" }}
        >
          {update ? "Update" : "Save"}
        </Button>
      </Box>

      {/* Table to display saved data */}
      {savedData && (
        <TableContainer component={Paper} sx={{ mt: 4 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Document Type</TableCell>
                <TableCell>Tanker Number</TableCell>
                <TableCell>Expiry Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {savedData.documenttypes.map((type, index) => (
                <TableRow key={index}>
                  <TableCell>{type}</TableCell>
                  <TableCell>{savedData.tankernumber[index]}</TableCell>
                  <TableCell>{savedData.expirydate[index]}</TableCell>
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
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          Data saved successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default DocumentDetails;
