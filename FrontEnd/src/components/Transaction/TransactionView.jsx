// import { useState, useEffect } from "react";
// import {
//   Box,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Checkbox,
//   Button,
//   Typography,
//   IconButton,
// } from "@mui/material";
// import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
// import BackupIcon from "@mui/icons-material/Backup";
// import { Tooltip } from "@mui/material";
// import { styled } from "@mui/material/styles";
// import Paper from "@mui/material/Paper";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import axios from "axios";
// import { Link } from "react-router-dom";

// const TransactionView = () => {
//   const [transactions, setTransactions] = useState([]);
//   const [selected, setSelected] = useState([]);
//   const [selectAll, setSelectAll] = useState(false);

//   console.log(transactions);

//   // Fetch data from API
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:5000/getalltransaction`
//         ); // Replace with your API endpoint

//         console.log(response.data);
//         setTransactions(response.data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };
//     fetchData();
//   }, []);

//   // Handle "Select All" checkbox
//   const handleSelectAll = (event) => {
//     setSelectAll(event.target.checked);
//     if (event.target.checked) {
//       setSelected(transactions.map((transaction) => transaction.id));
//     } else {
//       setSelected([]);
//     }
//   };

//   //   Handle individual row checkbox
//   const handleSelectRow = (id) => {
//     setSelected((prevSelected) =>
//       prevSelected.includes(id)
//         ? prevSelected.filter((selectedId) => selectedId !== id)
//         : [...prevSelected, id]
//     );
//   };

//   const LightTooltip = styled(({ className, ...props }) => (
//     <Tooltip {...props} classes={{ popper: className }} />
//   ))(({ theme }) => ({
//     [`& .MuiTooltip-tooltip`]: {
//       backgroundColor: theme.palette.common.white,
//       color: theme.palette.text.primary,
//       boxShadow: theme.shadows[1],
//       fontSize: 12,
//     },
//   }));
//   return (
//     <>
//       {/* Header */}
//       <Box
//         sx={{
//           display: "flex",
//           alignItems: "center",
//           padding: "16px",
//           backgroundColor: "#f5f5f5",
//         }}
//       >
//         <IconButton>
//           <ArrowBackIcon />
//         </IconButton>
//         <Typography variant="h5" sx={{ marginLeft: "8px" }}>
//           Transaction Listing
//         </Typography>
//       </Box>
//
//         {/* Table */}
//         <Paper
//           style={{ width: "100%" }}
//           sx={{
//             overflow: "hidden",
//             ml: 1,
//             border: "1px solid #ccc",
//             borderTop: "none",
//           }}
//         >
//           <TableContainer component={Paper}>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell padding="checkbox">
//                     <Checkbox
//                       color="primary"
//                       checked={selectAll}
//                       onChange={handleSelectAll}
//                     />
//                   </TableCell>
//                   <TableCell>ID</TableCell>
//                   <TableCell>Customer Name</TableCell>
//                   <TableCell>Type</TableCell>
//                   <TableCell>Reference No.</TableCell>
//                   <TableCell>Amount</TableCell>
//                   <TableCell>Invoice Weight</TableCell>
//                   <TableCell>Created By</TableCell>
//                   <TableCell>Transaction Time</TableCell>
//                   <TableCell>Actions</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {transactions.map((transaction) => (
//                   <TableRow key={transaction.id}>
//                     <TableCell padding="checkbox">
//                       <Checkbox
//                         color="primary"
//                         checked={selected.includes(transaction.id)}
//                         onChange={() => handleSelectRow(transaction.id)}
//                       />
//                     </TableCell>
//                     <TableCell>{transaction.transactionid}</TableCell>
//                     <TableCell>{transaction.customer}</TableCell>
//                     <TableCell>{transaction.typeoftransaction}</TableCell>
//                     <TableCell>{transaction.referenceno}</TableCell>
//                     <TableCell>{transaction.invoiceweight}</TableCell>
//                     <TableCell>{transaction.transactionamount}</TableCell>
//                     <TableCell>{transaction.createdby}</TableCell>
//                     <TableCell>
//                       {new Date(transaction.createdAt).toLocaleString("en-GB", {
//                         day: "2-digit",
//                         month: "2-digit",
//                         year: "2-digit",
//                         hour: "2-digit",
//                         minute: "2-digit",
//                         second: "2-digit",
//                         hour12: false,
//                       })}
//                     </TableCell>
//                     <TableCell>
//                       <Button
//                         variant="outlined"
//                         color="primary"
//                         size="small"
//                         onClick={() => console.log(`Edit ${transaction.id}`)}
//                       >
//                         Edit
//                       </Button>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </Paper>
//       </Box>
//     </>
//   );
// };

// export default TransactionView;
import { useState, useEffect } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Typography,
  IconButton,
  Switch,
  Tooltip,
  Button,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import BackupIcon from "@mui/icons-material/Backup";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";

import { Link, useParams } from "react-router-dom";

const TransactionView = () => {
  const { id } = useParams();
  const [transactions, setTransactions] = useState([]);
  const [selected, setSelected] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/getalltransaction`
        );
        setTransactions(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [id]);

  // Handle toggle switch
  const handleToggleStatus = async (transactionId, currentStatus) => {
    try {
      const updatedStatus = !currentStatus; // Toggle the status
      await axios.put(
        `http://localhost:5000/updatetransactionstatus/${transactionId}`,
        {
          status: updatedStatus,
        }
      );

      // Update local state after successful API call
      setTransactions((prevTransactions) =>
        prevTransactions.map((transaction) =>
          transaction.id === transactionId
            ? { ...transaction, status: updatedStatus }
            : transaction
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };
  const LightTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.white,
      color: "rgba(0, 0, 0, 0.87)",
      boxShadow: theme.shadows[1],
      fontSize: 11,
    },
  }));

  return (
    <>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          padding: "16px",
          backgroundColor: "#f5f5f5",
        }}
      >
        <IconButton>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h5" sx={{ marginLeft: "8px" }}>
          Transaction Listing
        </Typography>
      </Box>

      <Box
        sx={{
          height: "auto",
          ml: 1,
          p: 2,
          bgcolor: "#fff",
          color: "#000",
          display: "flex",
          flexWrap: "wrap", // Allows items to wrap to the next line if there's not enough space
          alignItems: "center",
          justifyContent: "start", // Align items to the left initially
          border: "1px solid #ccc",
          //   borderBottom: "none",
          borderRadius: "4px 4px 0px 0px", // Optional, adds rounded corners
        }}
      >
        <Box
          style={{ width: "100%" }}
          sx={{
            height: "auto",
            ml: 1,
            p: 2,
            bgcolor: "#fff",
            color: "#000",
            display: "flex",
            flexWrap: "wrap", // Allows items to wrap to the next line if there's not enough space
            alignItems: "center",
            justifyContent: "start", // Align items to the left initially
            // border: "1px solid #ccc",
            // borderBottom: "none",
            borderRadius: "4px 4px 0px 0px", // Optional, adds rounded corners
          }}
        >
          {/* Search Input */}
          <Box sx={{ flexBasis: "30%", maxWidth: 250 }}>
            <input
              type="text"
              placeholder="Search"
              // value={searchTerm}
              // onChange={handleSearchChange}
              style={{
                width: "100%",
                padding: "7px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
          </Box>
          {/* Active Button */}
          <Box sx={{ m: 1 }}>
            <Button
              variant="contained"
              sx={{ padding: "8px 10px" }}
              style={{
                background: "#47B87233", // Set background color
                color: "#47B872",
                border: "none", // Remove default button border
                // padding: "5px", // Adjust padding as necessary
                cursor: "pointer", // Make button clickable
                borderRadius: "4px",
              }}
            >
              Active
            </Button>
          </Box>
          {/* Inactive Button */}
          <Box sx={{ m: 1 }}>
            <Button
              variant="contained"
              sx={{ p: 1 }}
              style={{
                background: "#F3C32F33", // Set background color
                color: "#D4A20D",
                border: "none", // Remove default button border
                cursor: "pointer", // Make button clickable
                borderRadius: "4px",
              }}
            >
              Inactive
            </Button>
          </Box>
          {/*  */}
          {/* Spacer to push the export/import box to the end */}
          <Box sx={{ flexGrow: 1 }} />{" "}
          {/* This will push the next box to the right */}
          {/* Export and Import buttons (at the end) */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "end", // Align Export and Import at the end
              alignItems: "center",
              gap: 2, // Add space between the buttons
            }}
          >
            <Link to="" style={{ color: "#fff" }}>
              <LightTooltip title="Export" placement="top">
                <button
                  // onClick={handleExport}
                  style={{
                    background: "#6362E6", // Set background color
                    border: "none", // Remove default button border
                    padding: "5px", // Adjust padding as necessary
                    cursor: "pointer", // Make button clickable
                    borderRadius: "4px", // Optional, adds rounded corners
                  }}
                >
                  <CloudDownloadIcon sx={{ fontSize: "2rem", color: "#fff" }} />
                </button>
              </LightTooltip>
            </Link>

            <Link to="" style={{ color: "#fff", textDecoration: "none" }}>
              <LightTooltip title="Import" placement="top">
                <button
                  style={{
                    background: "#6362E6", // Set background color
                    border: "none", // Remove default button border
                    padding: "5px", // Adjust padding as necessary
                    cursor: "pointer", // Make button clickable
                    borderRadius: "4px", // Optional, adds rounded corners
                  }}
                >
                  <BackupIcon sx={{ fontSize: "2rem", color: "white" }}>
                    <input type="file" />
                  </BackupIcon>
                </button>
              </LightTooltip>
            </Link>

            <Link to="/transaction">
              <LightTooltip title="Add Transaction" placement="top">
                {/* <GroupAddIcon sx={{ fontSize: "2rem", color: "#000" }} /> */}
                <button
                  style={{
                    color: "#fff",
                    background: "#6362E6", // Set background color
                    border: "none", // Remove default button border
                    padding: "9px", // Adjust padding as necessary
                    cursor: "pointer", // Make button clickable
                    borderRadius: "4px", // Optional, adds rounded corners
                  }}
                >
                  Add New Transaction
                </button>
              </LightTooltip>
            </Link>
          </Box>
        </Box>
        <Box sx={{ padding: "16px", backgroundColor: "#fff", width: "100%" }}>
          {/* Table */}
          <Paper>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={selectAll}
                        onChange={(e) => {
                          setSelectAll(e.target.checked);
                          setSelected(
                            e.target.checked
                              ? transactions.map(
                                  (transaction) => transaction.id
                                )
                              : []
                          );
                        }}
                      />
                    </TableCell>
                    <TableCell>ID</TableCell>
                    <TableCell>Customer Name</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Reference No.</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Invoice Weight</TableCell>
                    <TableCell>Created By</TableCell>
                    <TableCell>Transaction Time</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {transactions.map((transaction) => (
                    <TableRow key={transaction._id}>
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={selected.includes(transaction.id)}
                          onChange={() =>
                            setSelected((prevSelected) =>
                              prevSelected.includes(transaction.id)
                                ? prevSelected.filter(
                                    (selectedId) =>
                                      selectedId !== transaction.id
                                  )
                                : [...prevSelected, transaction.id]
                            )
                          }
                        />
                      </TableCell>
                      <TableCell>{transaction.transactionid}</TableCell>
                      <TableCell>{transaction.customer}</TableCell>
                      <TableCell>{transaction.typeoftransaction}</TableCell>
                      <TableCell>{transaction.referenceno}</TableCell>
                      <TableCell>{transaction.transactionamount}</TableCell>
                      <TableCell>{transaction.invoiceweight}</TableCell>
                      <TableCell>{transaction.createdby}</TableCell>
                      <TableCell>
                        {new Date(transaction.createdAt).toLocaleString(
                          "en-GB",
                          {
                            day: "2-digit",
                            month: "2-digit",
                            year: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                            hour12: false,
                          }
                        )}
                      </TableCell>
                      <TableCell>
                        <Tooltip title="Toggle Status">
                          <Switch
                            checked={transaction.status}
                            onChange={() =>
                              handleToggleStatus(
                                transaction.id,
                                transaction.status
                              )
                            }
                            color="primary"
                          />
                        </Tooltip>
                      </TableCell>
                      <TableCell>
                        <Link to={`/edit/${transaction._id}`}>
                          <IconButton aria-label="Edit">
                            <EditIcon />
                          </IconButton>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Box>
      </Box>
    </>
  );
};

export default TransactionView;
