import type { GetServerSideProps, NextPage } from "next";
import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import swr from "swr";
import { useEffect } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import useSWR from "swr";
import fetcher from "../utils/fetcher";
import { User } from "../utils/interfaces";

const Home: NextPage<{ fallbackData: User }> = ({ fallbackData }) => {
  const { data: authUser, error } = useSWR<User | null>(
    `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/me`,
    fetcher,
    { fallbackData }
  );

  return (
    <>
      <Head>
        <title>Welcome</title>
      </Head>
      <div className=" bg-base-200 ">
        <Navbar authUser={authUser} />
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

export const getServerSideProps: GetServerSideProps = async context => {
  const data = await fetcher<{ [key: string]: any }>(
    `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/me`,
    context.req.headers
  );

  return { props: { fallbackData: data } };
};

export default Home;
