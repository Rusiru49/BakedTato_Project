import React, { useState, useEffect, useRef } from "react";

import Delivery from "../Delivery/Delivery.js";
import axios from "axios";
import "./Deliveries.css";
//import { useReactToPrint } from "react-to-print";
//import html2pdf from "/html2pdf.js";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const URL = "http://localhost:5000/delivery";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

function Deliveries() {
  const [deliveries, setDeliveries] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);

  const componentsRef = useRef();

  useEffect(() => {
    fetchHandler().then((data) => setDeliveries(data.delivery));
  }, []);

  //print
  /*const handlePrint = useReactToPrint({
    content: () => componentsRef.current,
    documentTitle: "Delivery Report",
    onAfterPrint: () => alert("Delivery Report Successfully Downloaded!"),
  });*/

  /*const handleDownload = (index) => {
    const element = componentsRef.current[index];
    if (element) {
      html2pdf()
        .set({
          margin: 1,
          filename: `delivery_${index + 1}.pdf`,
          html2canvas: { scale: 2 },
          jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
        })
        .from(element)
        .save();
    }
  };*/
  const handleDownloadAll = () => {
    const doc = new jsPDF();
  
    const headers = [["Name", "Email", "Address", "T.P Number", "Order","Price", "Payment Method"]];
    
    const data = deliveries.map((d) => [
      d.name,
      d.email,
      d.address,
      d.number,
      d.order,
      d.price,
      "Cash on Delivery", // Add static payment method
    ]);
  
    autoTable(doc, {
      head: headers,
      body: data,
      styles: { fontSize: 10 },
      theme: "grid",
    });
  
    doc.save("delivery_data.pdf");
  };
  
  
  //Search
  const handleSearch = () => {
    fetchHandler().then((data) => {
      const filteredData = data.delivery.filter((delivery) =>
        Object.values(delivery).some((field) =>
          field.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      setDeliveries(filteredData);
      setNoResults(filteredData.length === 0);
    });
  };

  //whatsapp
  const handleSendReport = () => {
    const phoneNumber = "+94714682032";
  
    const message = deliveries.map((d, i) => (
      `*Delivery ${i + 1}*\n` +
      `Name: ${d.name}\n` +
      `Email: ${d.email}\n` +
      `Address: ${d.address}\n` +
      `T.P Number: ${d.number}\n` +
      `Order: ${d.order}\n` +
      `Payment Method: Cash on Delivery\n`
    )).join("\n--------------------\n");
  
    const whatsappUrl = `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };
  
  

  

  return (
    <div>
      
      <h1>Delivery Details</h1>

      <input
        onChange={(e) => setSearchQuery(e.target.value)}
        type="text"
        name="search"
        placeholder="Search..."
        className="search-bar-container"
      />
      <button className="search-bar-container button" onClick={handleSearch}>Search</button>

      {noResults ? (
        <div>
          <p>No Delivery Found</p>
        </div>
      ) : (
        <div ref={componentsRef} className="delivery-list-container">
          {deliveries.map((delivery, i) => (
            <div key={i} className="delivery-card">
              <Delivery ref={componentsRef} delivery={delivery} />
     
            </div>
            
          ))}
           

      
        </div>
      )}
     
     <button onClick={handleDownloadAll} className="download">
            Download All Report as PDF
          </button>
          <button onClick={handleSendReport} className="download">
        Send Report to WhatsApp
      </button>
   </div>
   
  );
}

export default Deliveries;
