import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export default function PhonenumberInput({ onChange, error }) {
  return (
    <div>
      <PhoneInput
        enableSearch={true}
        country={"rw"}
        placeholder="Enter phone number"
        buttonClass={"buttonClass"}
        inputStyle={{
          width: "100%",
          fontSize: "16px",
        }}
        containerStyle={{ width: "100%" }}
        onChange={(val) => {
          onChange(val);
        }}
      />
      {error && (
        <span className="text-red-500 text-xs mt-1 block">{error}</span>
      )}
    </div>
  );
}