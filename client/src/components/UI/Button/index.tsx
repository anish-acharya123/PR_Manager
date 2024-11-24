import { Icon } from "@iconify/react/dist/iconify.js";
import { BtnProps, variantStyles } from "./index.types";

const Button = ({
  label,
  className = "",
  iconClass = "",
  labelClass = "",
  icon,
  onclick,
  variant = "primary",
}: BtnProps) => {
  const variantClass = variantStyles[variant] || "";

  return (
    <button
      onClick={onclick}
      className={`${variantClass} ${className} rounded text-center `}
    >
      {icon && (
        <figure className={iconClass}>
          <Icon icon={icon} />
        </figure>
      )}
      <p className={labelClass}>{label}</p>
    </button>
  );
};

export default Button;
