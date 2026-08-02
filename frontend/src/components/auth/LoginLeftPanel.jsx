import sideImage from "../../assets/login-side.png";

const LoginLeftPanel = () => {
  return (
    <div className="hidden md:flex w-1/2 flex-col justify-center">
      <div className="mt-20">
        <p className="text-base text-md text-slate-600 leading-tight text-left">
          Empowering Education
          <br />
          Through Technology
        </p>

        <div className="w-14 h-1 bg-blue-600 rounded-full mt-3"></div>
      </div>
      <div className="flex justify-center">
        <img
          src={sideImage}
          alt="Education"
          className="w-[230px] object-contain"
        />
      </div>
    </div>
  );
};

export default LoginLeftPanel;