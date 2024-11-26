import { Skeleton } from "@mui/material";

interface SkeletonProps {
  variant?: "text" | "rectangular" | "circular";
  width?: string | number;
  height?: string | number;
  className?: string;
  style?: React.CSSProperties;
}

const css = { borderRadius: "2px", bgcolor: "grey.300" };

const DynamicSkeleton = ({
  variant = "text",
  width = "100%",
  height,
  className = "",
  style = {},
}: SkeletonProps) => {
  return (
    <Skeleton
      variant={variant}
      className={className}
      sx={{
        ...css,
        ...style,
        width,
        height,
      }}
    />
  );
};

export default DynamicSkeleton;
