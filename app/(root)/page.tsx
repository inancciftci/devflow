import { signOut } from "@/auth";
import ROUTES from "@/constants/routes";

const Home = async () => {
  return (
    <div>
      <h1 className="h1-bold">Welcome to the world of Next.js</h1>
      <form
        className="px-10 pt-[100px]"
        action={async () => {
          "use server";
          await signOut({ redirectTo: ROUTES.SIGN_IN });
        }}
      ></form>
    </div>
  );
};

export default Home;
