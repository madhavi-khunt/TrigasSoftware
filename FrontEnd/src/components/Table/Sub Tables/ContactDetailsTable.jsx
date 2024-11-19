import React from "react";

const ContactDetailsTable = ({ contactData }) => {
  // Check if contactData is available and is an object
  if (!contactData || typeof contactData !== "object") {
    return (
      <div>
        <p>No contact data available</p>
      </div>
    );
  }

  console.log("Contact Data:", contactData); // Debug log

  // Convert object into an array of contact entries
  const contactEntries = [
    {
      contactFor: "Order",
      name: contactData.namefororder || "N/A",
      phoneNumber: contactData.phonenumberfororder || "N/A",
    },
    {
      contactFor: "Stock",
      name: contactData.nameforstock || "N/A",
      phoneNumber: contactData.phonenumberforstock || "N/A",
    },
    {
      contactFor: "Payment",
      name: contactData.nameforpayment || "N/A",
      phoneNumber: contactData.phonenumberforpayment || "N/A",
    },
    {
      contactFor: "Operator",
      name: contactData.nameforoperator || "N/A",
      phoneNumber: contactData.phonenumberforoperator || "N/A",
    },
    {
      contactFor: "Owner",
      name: contactData.nameforowner || "N/A",
      phoneNumber: contactData.phonenumberforowner || "N/A",
    },
  ];

  return (
    <div>
      <table className="table" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th scope="col">Sr.No</th>
            <th scope="col">Contact For</th>
            <th scope="col">Name</th>
            <th scope="col">Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {contactEntries.length > 0 ? (
            contactEntries.map((contact, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{contact.contactFor}</td>
                <td>{contact.name}</td>
                <td>{contact.phoneNumber}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No contact data available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ContactDetailsTable;
