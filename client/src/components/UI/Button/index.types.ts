export type BtnProps = {
  label?: string;
  variant?: "primary" | "secondary" | "danger" | "outline" | "normal";
  type?: "clicked" | "submit";
  className?: string;
  iconClass?: string;
  labelClass?: string;
  icon?: string;
  onclick?: () => void;
};

export const variantStyles = {
  primary: "bg-blue-500 text-white hover:bg-blue-600",
  secondary: "bg-gray-500 text-white hover:bg-gray-600",
  danger: "bg-red-500 text-white hover:bg-red-600",
  outline: "border   text-white",
  normal: "",
};
