import '@/styles/newstyles.css';

import Footer from "@/components/ui/footer";
import Header from "@/components/ui/header";
import Login from "@/components/auth/Login";

const LoginPage = () => {
  return (
    <>
      <Header />
      {/* <NavBar /> */}
      {/* <NavBar headerSolid={true} backgroundColor="rgba(3, 87, 130, 1)" /> */}
      <Login />
      <Footer />
    </>
  );
};

export default LoginPage;
