import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import InputAlertLabel from "../../components/InputAlertLabel";
import Alert from "../../components/Alert";
import Button from "../../components/Button";

type Props = {};

const loginSchema = z.object({
  password: z
    .string()
    .nonempty({
      message: "Password is required",
    })
    .min(6, "Passowrd to short"),
  email: z
    .string()
    .min(1, {
      message: "Email is required",
    })
    .email("Not a valid email"),
});

type LoginInput = z.TypeOf<typeof loginSchema>;

function LoginPage({}: Props) {
  const router = useRouter();

  const [loading, setLoading] = React.useState<boolean>(false);
  const [loginError, setLoginError] = React.useState(null);
  const [showPw, setShowPw] = React.useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (values: LoginInput) => {
    setLoading(true);
    try {
      const result = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/sessions`,
        values,
        { withCredentials: true }
      );
      setLoading(false);
      // console.log(result);
      // router.push("/");
    } catch (e: any) {
      const message = e.response?.data?.message ?? "Login failed";
      console.log(e);
      setLoginError(message);
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <div className=" w-full flex flex-col p-3 justify-center items-center min-h-screen    ">
        <div className="card w-full sm:w-2/3 md:w-2/5 bg-neutral text-neutral-content">
          <div className="card-body items-center text-center">
            <h2 className="card-title">Login!</h2>
            {loginError && (
              <div className="my-2 w-full ">
                <Alert variant="error">{loginError}</Alert>
              </div>
            )}
            <form className=" w-full " onSubmit={handleSubmit(onSubmit)}>
              <div className="form-control w-full ">
                <label htmlFor="email" className="label">
                  Email
                </label>
                <input
                  {...register("email")}
                  id="email"
                  type="email"
                  placeholder="example@gmail.com"
                  className="input w-full "
                />
                {errors.email?.message && (
                  <InputAlertLabel text={errors.email?.message || ""} />
                )}
              </div>
              <div className="form-control w-full ">
                <label htmlFor="password" className="label">
                  Password
                </label>
                <input
                  {...register("password")}
                  type={showPw ? "text" : "password"}
                  placeholder="*******"
                  id="password"
                  className="input w-full"
                />
                {errors.password?.message && (
                  <InputAlertLabel text={errors.password?.message || ""} />
                )}
              </div>
              <div className="form-control mt-2">
                <label className="label cursor-pointer flex justify-start">
                  <span className="label-text mr-2">Show password</span>
                  <input
                    type="checkbox"
                    className="checkbox checkbox-primary "
                    onChange={() => {
                      setShowPw(!showPw);
                    }}
                    checked={showPw}
                  />
                </label>
              </div>

              <div className="card-actions justify-center py-3">
                <Button type="submit" loading={loading}>
                  Login
                </Button>
                <div>
                  Does not have an account?
                  <Link href={"/auth/register"}>
                    <a className=" btn btn-link capitalize font-normal  p-0 ml-1 ">
                      Registration
                    </a>
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
