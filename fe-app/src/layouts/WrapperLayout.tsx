import { Outlet, ScrollRestoration } from "react-router";

const WrapperLayout = () => {
  return (
    <>
        <ScrollRestoration />
        <Outlet />
    </>
  )
}

export default WrapperLayout