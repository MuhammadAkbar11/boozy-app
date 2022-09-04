import Head from "next/head";
import React from "react";
import { useForm } from "react-hook-form";

type Props = {};

function LoginPage({}: Props) {
  const [showPw, setShowPw] = React.useState(false);
  const form = useForm();
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <div className=" w-full flex flex-col p-3 justify-center items-center min-h-screen    ">
        <div className="card w-full sm:w-2/3 md:w-2/5 bg-neutral text-neutral-content">
          <div className="card-body items-center text-center">
            <h2 className="card-title">Login!</h2>
            <form className=" w-full " action="#/">
              <div className="form-control w-full ">
                <label htmlFor="" className="label">
                  Email
                </label>
                <input
                  type="text"
                  placeholder="example@gmail.com"
                  className="input w-full "
                />
              </div>
              <div className="form-control w-full ">
                <label htmlFor="" className="label">
                  Password
                </label>
                <input
                  type={showPw ? "text" : "password"}
                  placeholder="*******"
                  className="input w-full "
                />
              </div>
              <div className="form-control mt-1">
                <label className="label cursor-pointer">
                  <span className="label-text">Show password</span>
                  <input
                    type="checkbox"
                    className="toggle toggle-primary"
                    onChange={() => setShowPw(!showPw)}
                    checked={showPw}
                  />
                </label>
              </div>

              <div className="card-actions justify-end py-3">
                <button type="submit" className="btn btn-primary w-full ">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
