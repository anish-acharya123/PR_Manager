export type BtnProps = {
  label?: string;
  variant?: "primary" | "secondary" | "danger" | "outline";
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
  outline: "border border-blue-500 text-blue-500 hover:bg-blue-100",
};
