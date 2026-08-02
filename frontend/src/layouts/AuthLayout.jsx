import loginBackground from "../assets/login-bg.jpg";
import Card from "../components/common/Card";
import LoginLeftPanel from "../components/auth/LoginLeftPanel";
import cardlogin from "../assets/card-login.png";

const AuthLayout = ({ children }) => {
  return (
    <div
      className="fixed inset-0 w-screen h-screen flex items-center justify-center bg-cover bg-center p-4 overflow-y-auto"
      style={{
        backgroundImage: `url(${loginBackground})`,
      }}
    >
      <div className="absolute inset-0 bg-black/20 backdrop-blur-[3px]" />

      <Card
        className="relative z-10 w-full max-w-3xl flex flex-col md:flex-row items-center justify-center gap-4 p-4 md:p-6 rounded-xl overflow-hidden bg-slate-100/80 backdrop-blur-md border border-white/60 shadow-2xl"
        style={{
          backgroundImage: `url(${cardlogin})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >

        <LoginLeftPanel />
        
        <div
          className="w-full sm:w-[450px] md:w-[500px] bg-white rounded-xl shadow-lg border border-slate-100 p-6 sm:p-8"
        >
          {children}
        </div>
      </Card>
    </div>
  );
};

export default AuthLayout;