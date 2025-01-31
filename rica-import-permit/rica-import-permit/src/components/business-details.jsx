import { useEffect, useState } from "react";
import Dropdown from "../components/shared/dropdown";
import Label from "../components/shared/label";
import CustomInput from "../components/shared/custom-input";
import { Provinces } from "rwanda";
import SelectComponent from "react-select";
import { FaFileInvoice } from "react-icons/fa";

export default function BusinessDetails({ onChange }) {
  const [formData, setFormData] = useState({
    businessType: "",
    companyName: "",
    tinNumber: "",
    registrationDate: "",
    province: "",
  });

  const [errors, setErrors] = useState({
    businessType: "",
    companyName: "",
    tinNumber: "",
    registrationDate: "",
    province: "",
  });

  const [bTypes, setBTypes] = useState([
    { label: "Retailer", value: "Retailer" },
    { label: "Wholesale", value: "Wholesale" },
    { label: "Manufacturer", value: "Manufacturer" },
  ]);

  const [provinces, setProvinces] = useState([]);

  useEffect(() => {
    const arr = Provinces()?.map((d) => ({ value: d, label: d })) || [];
    setProvinces(arr);
  }, []);

  useEffect(() => {
    onChange(formData);
  }, [formData]);

  const validateField = (field, value) => {
    let errorMessage = "";
    switch (field) {
      case "businessType":
        if (!value) errorMessage = "Business type is required.";
        break;
      case "companyName":
        if (!value.trim()) errorMessage = "Company name is required.";
        break;
      case "tinNumber":
        if (!value) errorMessage = "TIN number is required.";
        else if (value.length !== 9)
          errorMessage = "TIN number must be exactly 9 digits.";
        break;
      case "registrationDate":
        if (!value) errorMessage = "Registration date is required.";
        break;
      case "province":
        if (!value) errorMessage = "Province is required.";
        break;
      default:
        break;
    }
    setErrors((prev) => ({ ...prev, [field]: errorMessage }));
    return errorMessage === "";
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    validateField(field, value);
  };

  const handleFormValidation = () => {
    let isValid = true;
    Object.keys(formData).forEach((field) => {
      const isFieldValid = validateField(field, formData[field]);
      if (!isFieldValid) isValid = false;
    });

    if (isValid) {
      document.getElementById("section2").value = "valid";
    } else {
      document.getElementById("section2").value = "invalid";
    }

    return isValid;
  };

  return (
    <div className="w-full rounded-md border-[2px] border-primary">
      <div className="bg-secondary w-full py-3 px-4 flex justify-between items-center border-b-[2px] border-primary">
        <div className="flex gap-x-2 ">
          <FaFileInvoice size={20} color={"#0063Cf"} />
          <p className="text-primary font-semibold">Business Details</p>
        </div>
      </div>
      <div className="p-6">
        <div className="mb-4">
          <p className="text-black font-semibold text-[15px] mb-2">
            Business Details
          </p>

          <div className="flex gap-x-4 mb-4">
            <div>
              <Label required={true} htmlFor="businessType">
                Business type
              </Label>
              <SelectComponent
                required={true}
                options={bTypes}
                onChange={(e) => handleInputChange("businessType", e?.value)}
              />
              {errors.businessType && (
                <span className="text-red-500 text-xs mt-1 block">
                  {errors.businessType}
                </span>
              )}
            </div>

            <div>
              <Label required={true} htmlFor="companyName">
                Company name
              </Label>
              <CustomInput
                error={!!errors.companyName}
                placeholder={"Enter company name"}
                required={true}
                value={formData.companyName}
                onChange={(e) =>
                  handleInputChange("companyName", e.target.value)
                }
              />
              {errors.companyName && (
                <span className="text-red-500 text-xs mt-1 block">
                  {errors.companyName}
                </span>
              )}
            </div>
          </div>

          <div className="flex  gap-x-4 mb-4">
            <div>
              <Label required={true} htmlFor="tinNumber">
                TIN number
              </Label>
              <CustomInput
                type="number"
                maxLength={9}
                placeholder={"Enter TIN number"}
                required={true}
                value={formData.tinNumber}
                onChange={(e) => handleInputChange("tinNumber", e.target.value)}
              />
              {errors.tinNumber && (
                <span className="text-red-500 text-xs mt-1 block">
                  {errors.tinNumber}
                </span>
              )}
            </div>

            <div>
              <Label required={true} htmlFor="registrationDate">
                Registration date
              </Label>
              <CustomInput
                placeholder={"Select date"}
                type="date"
                required={true}
                value={formData.registrationDate}
                onChange={(e) =>
                  handleInputChange("registrationDate", e.target.value)
                }
              />
              {errors.registrationDate && (
                <span className="text-red-500 text-xs mt-1 block">
                  {errors.registrationDate}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-black font-semibold text-[15px] mb-2">
            Business Address
          </p>

          <div className="flex  gap-x-4 mb-4">
            <div>
              <Label required={true} htmlFor="province">
                Province
              </Label>
              <SelectComponent
                required={true}
                options={provinces}
                onChange={(e) => handleInputChange("province", e?.value)}
                placeholder="Select province"
              />
              {errors.province && (
                <span className="text-red-500 text-xs mt-1 block">
                  {errors.province}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <button
        className="hidden"
        id={"submit-b-details"}
        onClick={handleFormValidation}
      ></button>
    </div>
  );
}