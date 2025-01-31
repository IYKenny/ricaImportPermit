import { useState } from "react";
import Dropdown from "../components/shared/dropdown";
import Label from "../components/shared/label";
import PhonenumberInput from "../components/shared/phone-number-input";
import CustomInput from "../components/shared/custom-input";
import SelectComponent from "react-select";
import { FaFileInvoice } from "react-icons/fa";

export default function ProductInfo({ sendEmail, onChange }) {
  const [formData, setFormData] = useState({
    purposeOfImportation: "",
    productCategory: "",
    productName: "",
    weight: "",
    unitOfMeasurement: "",
    quantity: "",
    productDescription: "",
  });

  const [errors, setErrors] = useState({});

  const purpose = [
    { label: "Direct sale", value: "Direct sale" },
    { label: "Personal use", value: "Personal use" },
    { label: "Trial use", value: "Trial use" },
    { label: "Other", value: "Other" },
  ];

  const categories = [
    { label: "General purpose", value: "General purpose" },
    { label: "Construction materials", value: "Construction materials" },
    { label: "Chemicals", value: "Chemicals" },
  ];

  const units = [
    { label: "Kgs", value: "Kgs" },
    { label: "Tonnes", value: "Tonnes" },
  ];

  const handleInputChange = (field, value) => {
    const updatedData = { ...formData, [field]: value };
    setFormData(updatedData);
    if (onChange) onChange(updatedData);
  };

  const validateField = (field, value) => {
    switch (field) {
      case "purposeOfImportation":
      case "productCategory":
      case "unitOfMeasurement":
        return value.trim() !== "";

      case "productName":
        return value.trim().length > 0;

      case "weight":
      case "quantity":
        return value > 0;

      case "productDescription":
        return value.trim().length > 0;

      default:
        return true;
    }
  };

  const handleFormValidation = () => {
    let isValid = true;
    const newErrors = {};

    Object.keys(formData).forEach((field) => {
      const isFieldValid = validateField(field, formData[field]);
      if (!isFieldValid) {
        isValid = false;
        newErrors[field] = `Invalid ${field
          .replace(/([A-Z])/g, " $1")
          .toLowerCase()}`;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = () => {
    if (handleFormValidation()) {
      document.getElementById("section3").value = "valid";
    } else {
      document.getElementById("section3").value = "invalid";
    }
  };

  return (
    <div className="w-full rounded-md border-[2px] border-primary">
      <div className="bg-secondary w-full py-3 px-4 flex justify-between items-center border-b-[2px] border-primary">
        <div className="flex gap-x-2 items-center">
          <FaFileInvoice size={20} color={"#0063Cf"} />
          <p className="text-primary font-semibold">Product Information</p>
        </div>
      </div>
      <div className="p-6">
        <div className="mb-4">
          <p className="text-black font-semibold text-[15px] mb-2">
            Importation Details
          </p>
          <div className="flex items-center gap-x-4 mb-4">
            <div>
              <Label required={true} htmlFor="purposeOfImportation">
                Purpose of importation
              </Label>
              <SelectComponent
                required={true}
                options={purpose}
                onChange={(e) =>
                  handleInputChange("purposeOfImportation", e?.value)
                }
              />
              {errors.purposeOfImportation && (
                <p className="text-red-500 text-sm">
                  {errors.purposeOfImportation}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-black font-semibold text-[15px] mb-2">
            Product Details
          </p>
          <div className="flex items-center gap-x-4 mb-4">
            <div>
              <Label required={true} htmlFor="productCategory">
                Product category
              </Label>
              <SelectComponent
                required={true}
                options={categories}
                onChange={(e) => handleInputChange("productCategory", e?.value)}
              />
              {errors.productCategory && (
                <p className="text-red-500 text-sm">{errors.productCategory}</p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-x-4 mb-4">
            <div className="relative">
              <Label required={true} htmlFor="productName">
                Product name
              </Label>
              <CustomInput
                placeholder={"Enter product name"}
                value={formData.productName}
                onChange={(e) =>
                  handleInputChange("productName", e.target.value)
                }
              />
              {errors.productName && (
                <p className="text-red-500 text-sm">{errors.productName}</p>
              )}
            </div>

            <div className="relative">
              <Label required={true} htmlFor="weight">
                Weight(kg)
              </Label>
              <CustomInput
                type="number"
                placeholder={"Weight(kg)"}
                value={formData.weight}
                onChange={(e) => handleInputChange("weight", e.target.value)}
              />
              {errors.weight && (
                <p className="text-red-500 text-sm">{errors.weight}</p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-x-4 mb-4">
            <div className="relative">
              <Label required={true} htmlFor="unitOfMeasurement">
                Unit of measurement
              </Label>
              <SelectComponent
                required={true}
                placeholder={"Enter unit of measurement"}
                options={units}
                onChange={(e) =>
                  handleInputChange("unitOfMeasurement", e?.value)
                }
              />
              {errors.unitOfMeasurement && (
                <p className="text-red-500 text-sm">
                  {errors.unitOfMeasurement}
                </p>
              )}
            </div>

            <div className="relative">
              <Label required={true} htmlFor="quantity">
                Quantity of product(s)
              </Label>
              <CustomInput
                type="number"
                placeholder={"Enter quantity"}
                value={formData.quantity}
                onChange={(e) => handleInputChange("quantity", e.target.value)}
              />
              {errors.quantity && (
                <p className="text-red-500 text-sm">{errors.quantity}</p>
              )}
            </div>
          </div>

          <div className="items-center gap-x-4 mb-4">
            <Label required={true} htmlFor="productDescription">
              Description of products
            </Label>
            <div>
              <textarea
                className="w-full px-4 py-2 border rounded-md text-sm focus:outline-none border-[#ccc] focus:border-[#0063Cf] focus:ring-1 focus:ring-[#0063Cf]"
                placeholder="Description of products"
                value={formData.productDescription}
                onChange={(e) =>
                  handleInputChange("productDescription", e.target.value)
                }
              ></textarea>
              {errors.productDescription && (
                <p className="text-red-500 text-sm">
                  {errors.productDescription}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="mb-6 pr-6">
        <div className="flex justify-end gap-x-4">
          <button
            onClick={sendEmail}
            className="px-4 py-2 rounded-md text-white bg-primary hover:bg-primary-dark"
          >
            Submit
          </button>
        </div>

        <button
          id={"submit-pi-details-btn"}
          onClick={handleSubmit}
          className="bg-primary text-white py-2 px-4 rounded-md hidden"
        ></button>
      </div>
    </div>
  );
}