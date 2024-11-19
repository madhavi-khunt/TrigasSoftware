import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";

function AddTransaction() {
  const navigate = useNavigate();
  const { id } = useParams(); // Get the transaction ID from the URL (for edit mode)

  const [formData, setFormData] = useState({
    transactionid: "",
    customer: "",
    typeoftransaction: "",
    referenceno: "",
    invoiceweight: "",
    transactionamount: "",
    createdby: "",
  });

  const [errors, setErrors] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    if (id) {
      // Fetch transaction data if in edit mode (i.e., there's an ID)
      axios
        .get(`http://localhost:5000/gettransaction/${id}`)
        .then((response) => {
          setFormData(response.data); // Populate form with existing data
        })
        .catch((error) => {
          console.error("Error fetching transaction:", error);
        });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setErrors((prev) => ({
      ...prev,
      [name]: value.trim() ? "" : "This field is required",
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate form
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const value = formData[key];
      if (typeof value === "string" && !value.trim()) {
        newErrors[key] = "This field is required";
      } else if (value == null || value === "") {
        newErrors[key] = "This field is required";
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      let response;
      if (id) {
        // Edit mode: update transaction
        response = await axios.put(
          `http://localhost:5000/updatetransaction/${id}`,
          formData
        );
        console.log("Transaction updated:", response.data);
        showSnackbar("Transaction updated successfully!");
      } else {
        // Add mode: create new transaction
        response = await axios.post(
          "http://localhost:5000/addtransaction",
          formData
        );
        console.log("Transaction created:", response.data);
        showSnackbar("Data saved successfully!");
      }

      // Reset form after submit
      setFormData({
        transactionid: "",
        customer: "",
        typeoftransaction: "",
        referenceno: "",
        invoiceweight: "",
        transactionamount: "",
        createdby: "",
      });
      navigate("/transactiontable"); // Redirect to another page after saving/updating
    } catch (error) {
      console.error(
        "Error creating/updating transaction:",
        error.response?.data || error.message
      );
      showSnackbar("Form validation failed.");
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const showSnackbar = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  return (
    <div>
      <Box
        sx={{
          flexGrow: 1,
          width: "100%",
          px: 5,
          my: 3,
          background: "whitesmoke",
          height: "auto",
          mt: 10,
        }}
      >
        <Typography
          variant="h5"
          component="div"
          sx={{
            fontWeight: 700,
            fontSize: 35,
          }}
        >
          <Link to="/transactiontable">
            <ArrowBackIcon
              sx={{
                fontWeight: 500,
                fontSize: 35,
                mr: 1,
                color: "darkblue",
              }}
            />
          </Link>
          {id ? "Edit Transaction" : "Add Transaction"}
        </Typography>
        <Typography variant="p" component="div" sx={{ m: 1, fontSize: "18px" }}>
          <span style={{ color: "blue" }}>
            <Link to="/transactiontable" style={{ textDecoration: "none" }}>
              Transaction
            </Link>
          </span>
          <span> / Transaction Details</span>
        </Typography>
      </Box>
      <Box
        sx={{
          height: "auto",
          width: "80%",
          backgroundColor: "#fff",
          color: "#fff",
          mx: 5,
          py: 3,
        }}
      >
        <form onSubmit={handleSubmit}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
              flexWrap: "wrap",
              "& > :not(style)": { m: 1, width: "25ch" },
            }}
          >
            <TextField
              id="outlined-basic"
              label="Transaction Id"
              variant="outlined"
              sx={{ minWidth: "30%" }}
              name="transactionid"
              value={formData.transactionid}
              onChange={handleChange}
              onBlur={handleBlur} // Validate on blur
              error={!!errors.transactionid}
              helperText={errors.transactionid || " "}
            />
            <FormControl
              fullWidth
              sx={{ minWidth: "30%" }}
              error={!!errors.customer}
            >
              <InputLabel id="state-label">Customer</InputLabel>
              <Select
                labelId="customer-label"
                id="customer-select"
                label="Customer"
                name="customer"
                variant="outlined"
                value={formData.customer || ""}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <MenuItem value="abc">abc</MenuItem>
                <MenuItem value="xyz">xyz</MenuItem>
                <MenuItem value="jkl">jkl</MenuItem>
              </Select>
              {!!errors.customer && (
                <Typography variant="body2" color="error">
                  {errors.customer || " "}
                </Typography>
              )}
            </FormControl>

            <FormControl
              fullWidth
              sx={{ minWidth: "30%" }}
              error={!!errors.typeoftransaction}
            >
              <InputLabel id="state-label">Type of Transaction</InputLabel>
              <Select
                labelId="typeoftransaction-label"
                id="typeoftransaction-select"
                label="Type of Transaction"
                name="typeoftransaction"
                variant="outlined"
                value={formData.typeoftransaction || ""}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <MenuItem value="Credit">Credit</MenuItem>
                <MenuItem value="Debit">Debit</MenuItem>
              </Select>
              {!!errors.typeoftransaction && (
                <Typography variant="body2" color="error">
                  {errors.typeoftransaction || " "}
                </Typography>
              )}
            </FormControl>

            <TextField
              id="outlined-basic"
              label="Reference No."
              variant="outlined"
              sx={{ minWidth: "30%" }}
              name="referenceno"
              value={formData.referenceno}
              onChange={handleChange}
              onBlur={handleBlur}
              error={!!errors.referenceno}
              helperText={errors.referenceno || " "}
            />
            <TextField
              id="outlined-basic"
              label="Invoice Weight (Tons)"
              variant="outlined"
              sx={{ minWidth: "30%" }}
              name="invoiceweight"
              value={formData.invoiceweight}
              onChange={handleChange}
              onBlur={handleBlur}
              error={!!errors.invoiceweight}
              helperText={errors.invoiceweight || " "}
            />
            <TextField
              id="outlined-basic"
              label="Transaction Amount"
              variant="outlined"
              sx={{ minWidth: "30%" }}
              name="transactionamount"
              value={formData.transactionamount}
              onChange={handleChange}
              onBlur={handleBlur}
              error={!!errors.transactionamount}
              helperText={errors.transactionamount || " "}
            />
            <TextField
              id="outlined-basic"
              label="Created By"
              variant="outlined"
              sx={{ minWidth: "30%" }}
              name="createdby"
              value={formData.createdby}
              onChange={handleChange}
              onBlur={handleBlur}
              error={!!errors.createdby}
              helperText={errors.createdby || " "}
            />
          </Box>

          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Button
              type="submit"
              variant="contained"
              color="success"
              sx={{
                padding: "8px 20px",
                fontSize: "18px",
                borderRadius: "10px",
              }}
            >
              {id ? "Update" : "Save"}
            </Button>
          </Box>
        </form>

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={handleSnackbarClose}
          message={snackbarMessage}
        />
      </Box>
    </div>
  );
}

export default AddTransaction;
