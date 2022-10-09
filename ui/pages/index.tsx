import axios from "axios";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import swr from "swr";
import { useEffect } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";

const Home: NextPage = () => {
  useEffect(() => {
    const loadSession = async () => {
      try {
        const result = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/me`,
          { withCredentials: true }
        );

        console.log(result.data);
        // router.push("/");
      } catch (e: any) {
        const message = e.response?.data?.message ?? "Login failed";
        console.log(e);
      }
    };

    loadSession();
  }, []);

  return (
    <>
      <Head>
        <title>Welcome</title>
      </Head>
      <div className=" bg-base-200 ">
        <Navbar />
        <section className="container md:px-6 mx-auto ">
          <div className="hero min-h-screen bg-base-200">
            <div className="hero-content text-center">
              <div className="max-w-xl ">
                <h1 className=" text-4xl font-extrabold  sm:text-5xl capitalize ">
                  Bookmark your favorite
                  <span className="sm:block text-primary ">
                    {" "}
                    Web Comics & Novels{" "}
                  </span>
                </h1>

                <p className="py-6 text-lg ">
                  Boozy.io is the best place to keep all your favorite manhwas,
                  mangas, manhuas, or novels.
                </p>
                <Link href={"/auth/started"}>
                  <a className="btn btn-primary">Get Started</a>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
