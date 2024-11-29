import { Triangle } from "react-loader-spinner";
export const TriangleLoader = () => {
  return (
    <Triangle
      visible={true}
      height="80"
      width="80"
      color="blue"
      ariaLabel="triangle-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />
  );
};
