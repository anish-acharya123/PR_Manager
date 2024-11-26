import { Link, useLocation } from "react-router-dom";
import MaxwidthContainer from "../../wrapper/Maxwidth";

const DynamicBreadcrumb = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);

  const breadcrumbs = pathSegments.map((segment, index) => {
    const path = "/" + pathSegments.slice(0, index + 1).join("/");
    return { label: segment.charAt(0).toUpperCase() + segment.slice(1), path };
  });

  return (
    <div className=" py-8">
      <MaxwidthContainer>
        <ul className="flex space-x-2">
          <li>
            <Link to="/" className=" hover:underline">
              Home
            </Link>
            <span className="mx-2 text-gray-300">{">"}</span>
          </li>
          {breadcrumbs.map((crumb, index) => (
            <li
              key={index}
              className={`${
                index === breadcrumbs.length - 1
                  ? "font-bold text-blue-300 underline"
                  : "text-blue-300"
              }`}
            >
              <Link to={crumb.path} className=" hover:underline">
                {crumb.label}
              </Link>
              {index < breadcrumbs.length - 1 && (
                <span className="mx-2 text-white">{">"}</span>
              )}
            </li>
          ))}
        </ul>
      </MaxwidthContainer>
    </div>
  );
};

export default DynamicBreadcrumb;
