import * as React from "react";
import Box from "@mui/material/Box";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const BankDetailsTable = ({ bankData }) => {
  console.log("bank Data:", bankData); // Debug log

  return (
    <div>
      {bankData.map((data, index) => (
        <Accordion key={index}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${index}-content`}
            id={`panel${index}-header`}
          >
            <h4>
              {data.bank} - {data.product} (SAP Code: {data.sapcode})
            </h4>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              display: "flex",
              flexWrap: "wrap",
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
            {data.dynamicFields.map((field, fieldIndex) => (
              <Box
                key={fieldIndex}
                sx={{
                  width: 400,
                  mb: 2,
                  p: 2,
                  border: "1px solid #ccc",
                  borderRadius: 1,
                }}
              >
                <h4>Account {fieldIndex + 1} Details</h4>
                <hr />
                <p>
                  <b>Name of Account:</b> {field.accountname}
                </p>
                <p>
                  <b>Bank Name:</b> {field.bankname}
                </p>
                <p>
                  <b>Account No:</b> {field.accountno}
                </p>
                <p>
                  <b>Type of Account:</b> {field.typeofaccounnt}
                </p>
                <p>
                  <b>IFSC:</b> {field.ifsc}
                </p>
                <p>
                  <b>Branch:</b> {field.branch}
                </p>
              </Box>
            ))}
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default BankDetailsTable;
