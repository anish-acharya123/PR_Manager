import MaxwidthContainer from "../../wrapper/Maxwidth";

const Footer = () => {
  return (
    <footer>
      <MaxwidthContainer>
        <footer className="text-center mt-10">
          <p>
            © 2024 PR-WEB | Follow me on
            <a
              href="https://twitter.com/yourusername"
              className="text-blue-400 hover:underline"
            >
              {" "}
              Instagram
            </a>
          </p>
        </footer>
      </MaxwidthContainer>
      ;
    </footer>
  );
};
export default Footer;
