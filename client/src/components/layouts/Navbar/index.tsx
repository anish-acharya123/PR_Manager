import { Icon } from "@iconify/react/dist/iconify.js";
import { Container } from "../../wrapper/Container";
import MaxwidthContainer from "../../wrapper/Maxwidth";
import { Link } from "react-router-dom";
// import Button from "../../UI/Button";

const Navbar = () => {
  return (
    <nav className="py-4 shadow-sm shadow-white sticky  top-0">
      <MaxwidthContainer>
        <Container>
          <Link to={"/"}>
            <figure>
              <Icon
                icon="fluent-mdl2:branch-pull-request"
                className="h-10  w-10 text-white"
              />
            </figure>
          </Link>
          {/* <Button label="Login with Github"/> */}
        </Container>
      </MaxwidthContainer>
    </nav>
  );
};

export default Navbar;
