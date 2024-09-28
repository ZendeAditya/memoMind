import { Button } from "@/components/ui/button";
import React from "react";
import authImg from "../../../../assets/auth.jpg";
import Image from "next/image";
import SignIn from "@/components/SignIn";
type Props = {};

const SignInPage = (props: Props) => {
  return (
    <div className="relative">
      <div className="absolute top-0 p-2"></div>
      <section className="flex items-center justify-center min-h-screen lg:hidden">
        <div className="border-2 w-full mx-10 rounded-lg shadow-md h-32 text-center">
          <h2 className=" text-lg p-2">Welcome to MemoMind!</h2>
          <SignIn />
        </div>
      </section>
      <section className="hidden lg:block">
        <section className="flex items-center justify-between min-h-screen ">
          <div className="w-auto container mx-auto">
            <div className="border-2 w-[30rem] rounded-lg shadow-lg h-40 border-gray-500 text-center translate-y-10 py-5">
              <h2 className=" text-lg p-2">Welcome to MemoMind!</h2>
              <Button className="w-80 h-10">Sign In With Google</Button>
            </div>
          </div>
          <div className="">
            <Image
              src={authImg}
              alt="Auth Image"
              width={650}
              height={100}
              className="h-screen object-cover"
            />
          </div>
        </section>
      </section>
    </div>
  );
};

export default SignInPage;
