import { useEffect, useState } from "react";
import Dropdown from "../components/shared/dropdown";
import Label from "../components/shared/label";
import PhonenumberInput from "../components/shared/phone-number-input";
import CustomInput from "../components/shared/custom-input";
import { Provinces, Districts, Sectors, Cells, Villages } from "rwanda";
import SelectComponent from "react-select";
import { FaFileInvoice } from "react-icons/fa";
import { countries } from "../utils/countries";

export default function BusinessOwnerDetails({ onChange }) {
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

  const [errors, setErrors] = useState({});
  const [allDistricts, setAllDistricts] = useState([]);

  useEffect(() => {
    const arr = Districts()?.map((d) => ({ value: d, label: d }));
    setAllDistricts(arr);
  }, []);

  const options = [
    { label: "Rwandan", value: "Rwandan" },
    { label: "Foreigner", value: "Foreigner" },
  ];

  useEffect(() => {
    onChange(formData);
  }, [formData, onChange]);

  const handleInputChange = (key, value, required = false) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    if (required == true) {
      setErrors((prev) => ({
        ...prev,
        [key]:
          value?.toString()?.trim()?.length > 0
            ? ""
            : key?.toLowerCase() + " is required",
      }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.citizenship) {
      newErrors.citizenship = "Citizenship is required.";
    } else if (formData.citizenship === "Rwandan" && !formData.nid) {
      newErrors.nid = "NID is required for Rwandan citizenship.";
    } else if (
      formData.citizenship === "Rwandan" &&
      formData.nid &&
      formData.nid?.length != 16
    ) {
      newErrors.nid = "NID must be 16 numbers";
    } else if (formData.citizenship === "Foreigner" && !formData.passport) {
      newErrors.passport =
        "Passport number is required for foreign citizenship.";
    }

    if (!formData.otherNames) {
      newErrors.otherNames = "Other names are required.";
    }

    if (!formData.nationality) {
      newErrors.nationality = "Nationality is required.";
    }

    if (!formData.surname) {
      newErrors.surname = "Surname is required.";
    }

    if (!formData.district) {
      newErrors.district = "District is required.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      document.getElementById("section1").value = "valid";
    } else {
      document.getElementById("section1").value = "invalid";
    }
  };

  return (
    <div className="w-full rounded-md border-[2px] border-primary">
      <div className="bg-secondary w-full py-3 px-4 flex justify-between items-center border-b-[2px] border-primary">
        <div className="flex gap-x-2 ">
          <FaFileInvoice size={20} color={"#0063Cf"} />
          <p className="text-primary font-semibold">Business Owner Details</p>
        </div>
      </div>
      <div className="p-6">
        <div className="mb-4">
          <p className="text-black font-semibold text-[15px] mb-2">
            Business Owner Details
          </p>
          <div className="mb-4">
            <Label required htmlFor="citizenship">
              Applicant citizenship
            </Label>
            <SelectComponent
              required={true}
              options={options}
              onChange={(e) => handleInputChange("citizenship", e?.value, true)}
              placeholder="Applicant citizenship"
            />
            {errors.citizenship && (
              <p className="text-red-500 text-sm">{errors.citizenship}</p>
            )}
          </div>
          {formData.citizenship && (
            <div className="flex  gap-x-4 mb-4">
              {formData.citizenship === "Foreigner" ? (
                <div className="relative">
                  <Label required={true} htmlFor="passport">
                    Passport number
                  </Label>
                  <CustomInput
                    id={"passport"}
                    value={formData.passport}
                    onChange={(e) =>
                      handleInputChange("passport", e.target.value, true)
                    }
                  />
                  {errors.passport && (
                    <p className="text-red-500 text-sm">{errors.passport}</p>
                  )}
                </div>
              ) : (
                <div className="relative">
                  <Label required={true} htmlFor="nid">
                    Identification document number
                  </Label>
                  <CustomInput
                    id={"nid"}
                    value={formData.nid}
                    maxLength={16}
                    placeholder={"Enter Identification document number"}
                    onChange={(e) =>
                      handleInputChange("nid", e.target.value, true)
                    }
                  />
                  {errors.nid && (
                    <p className="text-red-500 text-sm">{errors.nid}</p>
                  )}
                </div>
              )}
              <div className="relative">
                <Label required={true} htmlFor="nationality">
                  Nationality
                </Label>
                <SelectComponent
                  required={true}
                  options={countries}
                  onChange={(e) =>
                    handleInputChange("nationality", e?.value, true)
                  }
                  placeholder="Nationality"
                />
                {errors.nationality && (
                  <p className="text-red-500 text-sm">{errors.nationality}</p>
                )}
              </div>
            </div>
          )}

          {/* Other Input Fields */}
          <div className="flex  gap-x-4 mb-4">
            <div className="relative">
              <Label required={true} htmlFor="otherNames">
                Other names
              </Label>
              <CustomInput
                id={"otherNames"}
                value={formData.otherNames}
                onChange={(e) =>
                  handleInputChange("otherNames", e.target.value, true)
                }
              />
              {errors.otherNames && (
                <p className="text-red-500 text-sm">{errors.otherNames}</p>
              )}
            </div>
            <div className="relative">
              <Label required={true} htmlFor="surname">
                Surname
              </Label>
              <CustomInput
                id={"surname"}
                value={formData.surname}
                onChange={(e) =>
                  handleInputChange("surname", e.target.value, true)
                }
              />
              {errors.surname && (
                <p className="text-red-500 text-sm">{errors.surname}</p>
              )}
            </div>
          </div>

          <div className="flex  gap-x-4 mb-4">
            <div className=" relative">
              <Label htmlFor="phoneNumber">Phone number</Label>
              <PhonenumberInput
                value={formData.phoneNumber}
                onChange={(val) => handleInputChange("phoneNumber", val)}
              />
              {errors.phoneNumber && (
                <p className="text-red-500 text-sm">{errors.phoneNumber}</p>
              )}
            </div>

            <div className="relative">
              <Label htmlFor="email">Email address</Label>
              <CustomInput
                id="email"
                placeholder={"Enter email address"}
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>
          </div>
        </div>

        {/* Business Owner Address */}
        <div className="mb-4">
          <p className="text-black font-semibold text-[15px] mb-2">
            Business Owner Address
          </p>
          <div className="flex  gap-x-4 mb-4">
            <div>
              <Label required={true} htmlFor="district">
                Business Owner Address
              </Label>
              <SelectComponent
                required={true}
                options={allDistricts}
                onChange={(e) => handleInputChange("district", e?.value, true)}
                placeholder="Enter district"
              />
              {errors.district && (
                <p className="text-red-500 text-sm">{errors.district}</p>
              )}
            </div>
          </div>
        </div>

        <button
          id={"submit-bo-details-btn"}
          onClick={handleSubmit}
          className="bg-primary text-white py-2 px-4 rounded-md hidden"
        >
          Submit
        </button>
      </div>
    </div>
  );
}