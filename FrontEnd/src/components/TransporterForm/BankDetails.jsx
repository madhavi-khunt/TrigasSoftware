import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import { Typography } from "@mui/material";
import { useState } from "react";

import axios from "axios";

import { useParams, useNavigate } from "react-router-dom";

const BankDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    accountname: "",
    bankname: "",
    accountno: "",
    ifsc: "",
    branch: "",
    typeofaccounnt: "",
  });

  console.log(formData);

  const [update, setUpdate] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  console.log(setUpdate);

  // Load data from localStorage on component mount
  const validateForm = () => {
    const newErrors = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (!value.trim()) {
        newErrors[key] = `${key.replace(/([A-Z])/g, " $1")} is required`;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };
  const handleUpdateDatabase = async () => {
    try {
      // Create a data object with the required structure
      const data = {
        BankFormData: JSON.stringify(formData), // Convert formData to JSON string
      };

      // Send PUT request to update data
      const response = await axios.put(
        `http://localhost:5000/updatecustomer/${id}`,
        data
      );

      console.log("Data updated successfully:", response.data);

      navigate("/customertable"); // Redirect to another page
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  // // Existing function to save data to the backend
  const handleSaveDatabase = async () => {
    try {
      // Ensure that formData is up-to-date in localStorage
      localStorage.setItem("BankFormData", JSON.stringify(formData));

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

      navigate("/transportertable"); // Redirect to another page
    } catch (error) {
      console.error("Error saving data:", error); // // Modified handleSubmit to use the new update function
    }
  };

  // Modified handleSubmit to use the new update function
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      update ? handleUpdateDatabase() : handleSaveDatabase();
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box noValidate autoComplete="off">
          <Typography
            sx={{
              fontSize: "32px",
              fontWeight: "bold",
              minWidth: 960,
              paddingLeft: 3,
            }}
          >
            Bank Details
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-evenly",
              flexWrap: "wrap",
              pt: 1,
              pb: 1,
              "& > :not(style)": { m: 1, width: "25ch" },
            }}
          >
            {[
              { label: "Account Name", name: "accountname" },
              { label: "Bank Name", name: "bankname" },
              { label: "Account No.", name: "accountno" },
              { label: "IFSC", name: "ifsc" },
              { label: "Branch", name: "branch" },
              { label: "Type Of Account", name: "typeofaccounnt" },
            ].map(({ label, name }) => (
              <div key={name} style={{ minWidth: 310 }}>
                <TextField
                  id={name}
                  label={label}
                  variant="outlined"
                  fullWidth
                  onChange={handleChange}
                  name={name}
                  value={formData[name]}
                  error={!!errors[name]} // Highlight field if error exists
                  helperText={errors[name]} // Show error message if field is empty
                />
              </div>
            ))}
          </Box>

          <Box
            sx={{
              height: 60,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Stack spacing={2} direction="row">
              <Button
                type="submit"
                variant="contained"
                color="success"
                sx={{ minWidth: 100 }}
              >
                Save
              </Button>
              <Button
                variant="outlined"
                color="error"
                sx={{ minWidth: 100 }}
                onClick={() => navigate(-1)}
              >
                Cancel
              </Button>
            </Stack>
          </Box>
        </Box>
      </form>
    </>
  );
};

export default BankDetails;
