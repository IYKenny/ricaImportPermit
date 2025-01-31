import { useEffect, useState } from "react";
import BusinessOwnerDetails from "../components/business-owner-details";
import BusinessDetails from "../components/business-details";
import ProductInfo from "../components/product-info";
import axios from "axios";

export default function Registration() {
  const [formData, setFormData] = useState({
    citizenship: "",
    passport: "",
    nid: "",
    nationality: "",
    otherNames: "",
    surname: "",
    phoneNumber: "",
    email: "",
    district: "",
  });

  const [formData2, setFormData2] = useState({
    businessType: "",
    companyName: "",
    tinNumber: "",
    registrationDate: "",
    province: "",
  });

  const [formData3, setFormData3] = useState({
    purposeOfImportation: "",
    productCategory: "",
    productName: "",
    weight: "",
    unitOfMeasurement: "",
    quantity: "",
    productDescription: "",
  });

  const sendMail = async () => {
    if (formData?.email) {
      const res = await axios.post("http://localhost:8000/sendEmail", {
        ...formData,
        ...formData2,
        ...formData3,
      });
      alert("Submitted successfully");
    }
  };

  const sendEmail = async () => {
    try {
      document.getElementById("submit-b-details")?.click();
      document.getElementById("submit-bo-details-btn")?.click();
      document.getElementById("submit-pi-details-btn")?.click();

      setTimeout(() => {
        const val1 = document.getElementById("section1")?.value;
        const val2 = document.getElementById("section2")?.value;
        const val3 = document.getElementById("section3")?.value;

        if (val1 == "valid" && val2 == "valid" && val3 == "valid") {
          sendMail();
        }
      }, 1000);
    } catch (error) {
      console.error("Error sending email", error);
    }
  };

  return (
    <div className="bg-white flex flex-col py-5 items-center justify-center min-h-[100vh]">
      <div className="mb-4 w-[70%]">
        <BusinessOwnerDetails
          onChange={(data) => {
            setFormData(data);
          }}
        />
      </div>
      <div className="mb-4 w-[70%]">
        <BusinessDetails
          onChange={(data) => {
            setFormData2(data);
          }}
        />
      </div>

      <div className="mb-4 w-[70%]">
        <ProductInfo
          onChange={(data) => {
            setFormData3(data);
          }}
          sendEmail={sendEmail}
        />
      </div>

      <div>
        <input id="section1" className="hidden" placeholder="1"></input>
        <input id="section2" className="hidden" placeholder="2"></input>
        <input id="section3" className="hidden" placeholder="3"></input>
      </div>
    </div>
  );
}