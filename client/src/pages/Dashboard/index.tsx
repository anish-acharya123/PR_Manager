import MaxwidthContainer from "../../components/wrapper/Maxwidth";
import UserProfile from "../../components/layouts/UserProfile";
import UserRepos from "../../components/layouts/UserRepos";

const Dashboard = () => {
  return (
    <section className="py-20">
      <MaxwidthContainer>
        <div className=" flex justify-center items-center  gap-10 ">
          <UserProfile />
          <UserRepos />
        </div>
      </MaxwidthContainer>
    </section>
    //{" "}
  );
};

export default Dashboard;
