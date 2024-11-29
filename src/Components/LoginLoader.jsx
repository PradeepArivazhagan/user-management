import { Oval } from "react-loader-spinner";
const LoginLoader = () => {
  return (
    <Oval
      visible={true}
      height="20"
      width="20"
      color="white"
      ariaLabel="oval-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />
  );
};

export default LoginLoader;
