import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const SapCodes = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // For navigation after save/update
  const [formData, setFormData] = useState(() => {
    const savedFormData = localStorage.getItem("sapFormData");
    return (
      JSON.parse(savedFormData) || {
        suppliers: [""],
        sapcodes: [""],
        products: [""],
      }
    );
  });
  const [errors, setErrors] = useState({});
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:5000/edit/${id}`)
        .then((response) => {
          if (response.data) {
            const sapFormData = JSON.parse(response.data.data.sapFormData);
            setFormData(sapFormData);
            setUpdate(true);
          }
        })
        .catch((error) => {
          console.error("Error fetching customer data:", error);
        });
    }
  }, [id]);

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
      suppliers: [...prev.suppliers, ""],
      sapcodes: [...prev.sapcodes, ""],
      products: [...prev.products, ""],
    }));
  };

  const removeInputFields = (index) => {
    setFormData((prev) => ({
      ...prev,
      suppliers: prev.suppliers.filter((_, i) => i !== index),
      sapcodes: prev.sapcodes.filter((_, i) => i !== index),
      products: prev.products.filter((_, i) => i !== index),
    }));
  };

  const handleUpdateDatabase = async () => {
    try {
      // Create a data object with the required structure
      const data = {
        sapFormData: JSON.stringify(formData), // Convert formData to JSON string
      };

      // Send PUT request to update data
      const response = await axios.put(
        `http://localhost:5000/updatecustomer/${id}`,
        data
      );

      console.log("Data updated successfully:", response.data);

      // Reset formData and redirect
      setFormData({
        suppliers: [""],
        sapcodes: [""],
        products: [""],
      });
      navigate("/customertable"); // Redirect to another page
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  // Existing function to save data to the backend
  const handleSaveDatabase = async () => {
    try {
      // Ensure that formData is up-to-date in localStorage
      localStorage.setItem("sapFormData", JSON.stringify(formData));

      // Prepare data to send to backend
      const data = {};
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        data[key] = localStorage.getItem(key);
      }

      // Save data to backend
      const response = await axios.post(
        "http://localhost:5000/savelocalstorage",
        data
      );
      console.log("Data saved successfully:", response.data);

      // Clear localStorage after saving to backend
      localStorage.clear();
      console.log("localStorage after clear:", localStorage); // Should be empty

      // Reset formData to clear the form
      setFormData({
        suppliers: [""],
        sapcodes: [""],
        products: [""],
      });
      navigate("/customertable"); // Redirect to another page
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  // Modified handleSubmit to use the new update function
  const handleSubmit = (e) => {
    e.preventDefault();
    if (update) {
      handleUpdateDatabase(); // Call the update function if in update mode
    } else {
      handleSaveDatabase(); // Call the save function if in create mode
    }
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
          sx={{
            fontSize: "32px",
            fontWeight: "bold",
            mb: 2,
            width: "300px",
          }}
        >
          SAP Codes
        </Typography>
        <Button
          variant="contained"
          color="success"
          onClick={addInputField}
          sx={{
            width: 30,
            height: 43,
            color: "white",
          }}
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
        {formData.suppliers.map((supplier, index) => (
          <Box
            key={index}
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            <FormControl
              fullWidth
              sx={{ width: 300 }}
              error={!!(errors.suppliers && errors.suppliers[index])}
            >
              <InputLabel id={`supplier-select-${index}`}>Supplier</InputLabel>
              <Select
                labelId={`supplier-select-${index}`}
                name="suppliers"
                label="Supplier"
                value={supplier}
                onChange={(e) => handleChange(index, e)}
              >
                <MenuItem value="IOCL">IOCL</MenuItem>
                <MenuItem value="BPCL">BPCL</MenuItem>
                <MenuItem value="HPCL">HPCL</MenuItem>
                <MenuItem value="RELIANCE">RELIANCE</MenuItem>
                <MenuItem value="AEGIS">AEGIS</MenuItem>
                <MenuItem value="ADANI">ADANI</MenuItem>
                <MenuItem value="CONFIDENCE-GAS">CONFIDENCE-GAS</MenuItem>
              </Select>
              {!!errors.suppliers && errors.suppliers[index] && (
                <Typography variant="body2" color="error">
                  {errors.suppliers[index]}
                </Typography>
              )}
            </FormControl>
            <TextField
              label="SAP Code"
              name="sapcodes"
              variant="outlined"
              value={formData.sapcodes[index]}
              onChange={(e) => handleChange(index, e)}
              sx={{ minWidth: 300 }}
              error={!!(errors.sapcodes && errors.sapcodes[index])}
              helperText={errors.sapcodes && errors.sapcodes[index]}
            />
            <FormControl
              fullWidth
              sx={{ width: 300 }}
              error={!!(errors.products && errors.products[index])}
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
              </Select>
              {!!errors.products && errors.products[index] && (
                <Typography variant="body2" color="error">
                  {errors.products[index]}
                </Typography>
              )}
            </FormControl>
            {formData.suppliers.length > 1 && (
              <Button
                color="error"
                variant="outlined"
                onClick={() => removeInputFields(index)}
                sx={{ minWidth: 40, height: 53 }}
              >
                <DeleteIcon />
              </Button>
            )}
          </Box>
        ))}
      </Box>

      <Stack spacing={2} direction="row" sx={{ mb: 2 }}>
        <Button
          variant="contained"
          color="success"
          sx={{ minWidth: 100 }}
          type="submit"
        >
          {update ? "Update" : "Save"}
        </Button>
        <Button
          variant="outlined"
          color="error"
          sx={{ minWidth: 100 }}
          // onClick={() => navigate("/somewhere")}
        >
          Cancel
        </Button>
      </Stack>
    </Box>
  );
};

export default SapCodes;
