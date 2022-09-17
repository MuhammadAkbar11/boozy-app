import Head from "next/head";
import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import InputAlertLabel from "../../components/InputAlertLabel";
import { useRouter } from "next/router";
import Alert from "../../components/Alert";
import Button from "../../components/Button";
import Link from "next/link";

type Props = {};

const createUserSchema = z
  .object({
    name: z.string().min(1, {
      message: "Name is required",
    }),
    password: z
      .string()
      .nonempty({
        message: "Password is required",
      })
      .min(6, "Password too short - should be 6 chars minimum"),
    passwordConfirmation: z.string().nonempty({
      message: "Password Confirmation is required",
    }),
    email: z
      .string()
      .min(1, {
        message: "Email is required",
      })
      .email("Not a valid email"),
  })
  .refine(data => data.password == data.passwordConfirmation, {
    message: "Password do not match!",
    path: ["passwordConfirmation"],
  });

type CreateUserInput = z.TypeOf<typeof createUserSchema>;

function RegisterPage({}: Props) {
  const router = useRouter();

  const [loading, setLoading] = React.useState(false);
  const [registerError, setRegisterError] = React.useState(null);
  const [registerDone, setRegisterDone] = React.useState<string | null>(null);
  const [showPw, setShowPw] = React.useState<boolean>(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateUserInput>({ resolver: zodResolver(createUserSchema) });

  const onSubmit = async (values: CreateUserInput) => {
    setLoading(true);

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/users`,
        values
      );
      setLoading(false);
      setRegisterDone("Registration successfully, you can login now!");
    } catch (e: any) {
      const message = e.response?.data?.message ?? "Register failed";
      setRegisterError(message);
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Register</title>
      </Head>
      <div className=" w-full flex flex-col p-3 justify-center items-center min-h-screen    ">
        <div className="card w-full sm:w-2/3 md:w-2/5 bg-neutral text-neutral-content">
          <div className="card-body items-center text-center">
            <h2 className="card-title">Register!</h2>
            {registerError && (
              <div className="my-2 w-full ">
                <Alert variant="error">{registerError}</Alert>
              </div>
            )}
            {registerDone && (
              <div className="my-2 w-full ">
                <Alert variant="success">
                  <div className="flex items-center justify-between w-full">
                    <span>{registerDone}</span>
                    <a
                      href="/auth/login"
                      className="btn btn-sm capitalize ml-auto "
                    >
                      Login
                    </a>
                  </div>
                </Alert>
              </div>
            )}
            <form className=" w-full " onSubmit={handleSubmit(onSubmit)}>
              <div className="form-control w-full ">
                <label className="label" htmlFor="email">
                  <span className="label-text">Email</span>
                </label>
                <input
                  {...register("email")}
                  type="email"
                  placeholder="example@gmail.com"
                  className="input w-full "
                />
                {errors.email?.message && (
                  <InputAlertLabel text={errors.email?.message || ""} />
                )}
              </div>
              <div className="form-control w-full ">
                <label className="label" htmlFor="name">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Ex: John doe"
                  className="input w-full"
                  {...register("name")}
                />
                {errors.name?.message && (
                  <InputAlertLabel text={errors.name?.message || ""} />
                )}
              </div>
              <div className="form-control w-full ">
                <label className="label" htmlFor="password">
                  <span className="label-text">Password</span>
                </label>
                <input
                  {...register("password")}
                  type={showPw ? "text" : "password"}
                  placeholder="*******"
                  className="input w-full"
                />
                {errors.password?.message && (
                  <InputAlertLabel text={errors.password?.message || ""} />
                )}
              </div>
              <div className="form-control w-full ">
                <label className="label" htmlFor="passwordConfirmation">
                  <span className="label-text">Password Confirmation</span>
                </label>
                <input
                  {...register("passwordConfirmation")}
                  type={showPw ? "text" : "password"}
                  placeholder="*******"
                  className="input w-full"
                />
                {errors.passwordConfirmation?.message && (
                  <InputAlertLabel
                    text={errors.passwordConfirmation?.message || ""}
                  />
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
                <Button loading={loading} type="submit">
                  Register
                </Button>
                <div>
                  Already have an account?
                  <Link href={"/auth/login"}>
                    <a className=" btn btn-link capitalize font-normal p-0 ml-1 ">
                      Login
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

export default RegisterPage;
