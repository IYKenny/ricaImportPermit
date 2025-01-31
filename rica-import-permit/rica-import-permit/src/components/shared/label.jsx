const Label = ({ children, required, htmlFor }) => {
  return (
    <div className="mb-1">
      <label className="text-[15px] flex items-center" htmlFor={htmlFor}>
        {children}
        {required && <span className="text-red-500 ml-1">*</span>}{" "}
      </label>
    </div>
  );
};

export default Label;
