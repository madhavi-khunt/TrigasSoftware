import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const bankDetailsMapping = {
  hpcl: [
    {
      heading: "HPCL Bank Details",
      customerName: "SAICON TILES PRIVATE LIMITED",
      CustomerCodeAsassignedByHpcl: (sapCode) => sapCode,
      beneficiaryName: "Hindustan Petroleum Corporation Ltd.",
      NameOfTheBank: "HDFC Bank Ltd",
      NameOfTheBranch: "Mumbai Sandoz House Branch",
      address: "Worli, Mumbai-400018",
      micrCode: "400240002",
      RtgsIfscCodeNumberOfTheBankAndBranch: "HDFC0000240",
      TypeOfAccount: "Virtual Account",
      accountNumber: (sapCode) => `HPCLPG${sapCode}L221`,
    },
  ],
  iocl: [
    {
      heading: "IOCL Bank Details (SBI)",
      // IoclCustomerCode: "SAICON TILES PRIVATE LIMITED",
      IoclCustomerCode: (sapCode) => `${sapCode}`,
      CreditControlArea: "C002 FOR PROPAINE/LPG/BUTANE",
      NameOfAccount: "INDIAN OIL CORPORATION LIMITED OD CLEAN (C&I)",
      NatureOfAccount: "RTGS Collection",
      Bank: "SBI CAG Branch, Mumbai",
      BranchMicrCodeNumber: "400002133",
      IfscCode: "SBIN0009995",
      BankAccountNumber: (sapCode) => `30210428604E${sapCode}`,
      EmailAddressIndianOil: "iocebank@indianoil.co.in",
      TelephoneNumberIndianOil: "022-26447892/7425/7780, 079-26474221",
      BranchTelephoneNumber: "022-66356609/22671897",
    },
    {
      heading: "IOCL Bank Details (HDFC)",
      IoclCustomerCode: (sapCode) => `${sapCode}`,
      NameOfAccount: "INDIAN OIL CORPORATION LIMITED",
      Bank: "HDFC BANK LIMITED",
      BranchMicrCodeNumber: "400240002",
      IfscCode: "HDFC0000240",
      BankAccountNumber: (sapCode) => `IOCLMDTE${sapCode}`,
      EmailAddressIndianOil: "iocebank@indianoil.co.in",
      TelephoneNumberIndianOil: "022-26447892/7425/7780, 079-26474221",
    },
  ],
  bpcl: [
    {
      heading: "BPCL Bank Details",
      CustomerName: "SAICON TILES PRIVATE LIMITED",
      CustomerCode: (sapCode) => `${sapCode}`,
      beneficiaryName: "Bharat Petroleum Corporation Ltd.",
      NameOfTheBank: "HDFC Bank Ltd",
      NameOfTheBranch: "Fort Branch",
      address: "Fort, Mumbai-400001",
      Telephone: "022-33172576",
      NineDigitCodeNumberOfTheBankAndBranch: "400240015",
      RtgsIfscCodeNumberOfTheBankAndBranch: "HDFC0000060",
      TypeOfAccount: "Current Account",
      accountNumber: (sapCode) => `BPCINC${sapCode}`,
    },
  ],
  reliance: [
    {
      heading: "RELIANCE PROPANE DETAILS",
      RelianceCustomerCode: (sapCode) => sapCode,
      NameOfAccount: "Reliance Industries Limited",
      Bank: "HDCF BANK LIMITED",
      BranchMicrCodeNumber: "400240002",
      IfscCode: "HDCF0000240",
      BankAccountNumber: (sapCode) => `RILDFL000${sapCode}`,
    },
    {
      heading: "RELIANCE LPG DETAILS",
      RelianceCustomerCode: (sapCode) => sapCode,
      NameOfAccount: "Reliance Industries Limited",
      Bank: "HDCF BANK LIMITED",
      BranchMicrCodeNumber: "400240002",
      IfscCode: "HDCF0000240",
      BankAccountNumber: (sapCode) => `RILDLP000${sapCode}`,
    },
  ],
  aegis: [
    {
      heading: "AEGIS Bank Details",
      customerName: "AEGIS LOGISTICS LIMITED",
      CustomerCodeAsassignedByAegis: (sapCode) => sapCode,
      beneficiaryName: "Aegis Logistics Ltd.",
      NameOfTheBank: "ICICI Bank",
      NameOfTheBranch: "Mumbai Branch, Free Press",
      address: "House Nariman Point",
      RtgsIfscCodeNumberOfTheBankAndBranch: "ICIC0000004",
      TypeOfAccount: "Current Account",
      accountNumber: (sapCode) => `000405027771`,
    },
  ],
  adani: [
    {
      heading: "ADANI Bank Details",
      beneficiaryName: "ADANI ENTERPRISE LTD.",
      beneficiaryBank: "YES BANK LTD",
      beneficiaryAccountNumber: "000781400000010",
      Branch: "AHMEDABAD GUJARAT",
      BankIfscCode: "YESB0000007",
      TypeOfAccount: "CURRENT ACCOUNT",
    },
  ],
  confidence_gas: [
    {
      heading: "CONFIDENCE-GAS Bank Details",
      beneficiaryName: "CONFIDENCE PETROLEUM INDIA LTD",
      beneficiaryBank: "ICICI BANK LTD",
      beneficiaryAccountNumber: "624251000004",
      Branch: "RAMDASPETH MARG NAGPUR",
      BankIfscCode: "ICIC0006242",
      TypeOfAccount: "CURRENT ACCOUNT",
    },
  ],
};

const SapCodesTable = ({ sapData }) => {
  const [expandedRow, setExpandedRow] = useState(false);

  const handleAccordionChange = (index) => {
    setExpandedRow(expandedRow === index ? false : index); // Toggle row expansion
  };

  // Check if sapData is available and contains valid arrays
  if (
    !sapData ||
    !Array.isArray(sapData.suppliers) ||
    !Array.isArray(sapData.sapcodes) ||
    !Array.isArray(sapData.products)
  ) {
    return (
      <div>
        <p>No SAP data available</p>
      </div>
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table aria-label="sap codes table">
        <TableHead>
          <TableRow>
            <TableCell>Sr.No</TableCell>
            <TableCell>Supplier</TableCell>
            <TableCell>SAP Code</TableCell>
            <TableCell>Product</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sapData.suppliers.map((supplier, index) => {
            const supplierKey = supplier.toLowerCase().replace(/[\s-]+/g, "_"); // Replace both spaces and hyphens with underscores
            const bankDetailsArray = bankDetailsMapping[supplierKey] || [];

            return (
              <React.Fragment key={index}>
                <TableRow
                  hover
                  onClick={() => handleAccordionChange(index)}
                  style={{ cursor: "pointer" }}
                >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{supplier || "N/A"}</TableCell>
                  <TableCell>{sapData.sapcodes[index] || "N/A"}</TableCell>
                  <TableCell>{sapData.products[index] || "N/A"}</TableCell>
                </TableRow>
                {expandedRow === index ? (
                  bankDetailsArray.length > 0 ? (
                    bankDetailsArray.map((bankDetails, bankIndex) => (
                      <TableRow key={bankIndex}>
                        <TableCell colSpan={4}>
                          <Accordion expanded>
                            <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls={`panel${index}-${bankIndex}-content`}
                              id={`panel${index}-${bankIndex}-header`}
                            >
                              <Typography>{bankDetails.heading}</Typography>
                            </AccordionSummary>
                            <AccordionDetails
                              sx={{
                                backgroundColor: "#f0eff4",
                              }}
                            >
                              <Typography component="div">
                                <Table>
                                  <TableBody>
                                    {Object.entries(bankDetails).map(
                                      ([key, value]) => {
                                        // Handle function values for accountNumber and CustomerCode
                                        if (typeof value === "function") {
                                          value = value(
                                            sapData.sapcodes[index]
                                          );
                                        }

                                        // Skip the heading key
                                        if (key === "heading") return null;

                                        return (
                                          <TableRow key={key}>
                                            <TableCell>
                                              <strong>
                                                {key
                                                  .replace(/([A-Z])/g, " $1")
                                                  .replace(/^./, (str) =>
                                                    str.toUpperCase()
                                                  )}
                                                :
                                              </strong>
                                            </TableCell>
                                            <TableCell>{value}</TableCell>
                                          </TableRow>
                                        );
                                      }
                                    )}
                                    <TableRow>
                                      <TableCell>
                                        <strong>Share Details</strong>
                                      </TableCell>
                                      <TableCell>
                                        <Button variant="contained">
                                          Share
                                        </Button>
                                      </TableCell>
                                    </TableRow>
                                  </TableBody>
                                </Table>
                              </Typography>
                            </AccordionDetails>
                          </Accordion>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4}>
                        <Typography>
                          No bank details available for this supplier.
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )
                ) : null}
              </React.Fragment>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SapCodesTable;
