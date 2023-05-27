const Button = ({ name = "click here", className = "" }) => {
  return (
    <button
      className={`viewall-btn bg-gradient-to-r from-zinc-900 to-zinc-800  ${className}`}
    >
      {name ?? "click here"}
    </button>
  );
};
export default Button;
