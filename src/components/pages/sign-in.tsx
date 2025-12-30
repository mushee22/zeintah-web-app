"use client";

import Container from "../elements/container";

import { Button } from "../ui/button";
import { Input } from "../ui/input";

import Image from "next/image";

import Logo from "@/assets/images/logo.svg";

import BgPattern from "@/assets/images/dt-bg.png";

import useSignIn from "@/hook/use-sign-in";
import PasswordInput from "../elements/password-input";
import { useRouter } from "next/navigation";


export default function SignInPageContent() {
  const { data, isPending, mutate } = useSignIn();

  const router = useRouter();

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutate(event);
  };

  return (
    <Container className="mx-auto mt-10">
      <Image
        src={BgPattern}
        alt="Zeintah bg pattern"
        fill
        className="absolute top-0 left-0 z-[-1] object-cover"
        sizes="100vw"

      />
      <div className="max-w-xl mx-auto  rounded-md h-[80vh] flex flex-col justify-center  space-y-6">
        <div className="relative ">
          <Image src={Logo} alt="Horus Logo" onClick={() => router.push("/")} className="mx-auto mb-4 cursor-pointer" width={200} height={200} />
        </div>
        <div
          className="p-4 md:p-8"
          style={{
            background:
              "linear-gradient(0deg, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),linear-gradient(88.23deg, rgba(242, 237, 77, 0.06) -45.08%, rgba(159, 212, 177, 0.06) 41.76%, rgba(15, 48, 76, 0.06) 130.35%)",
            backdropFilter: "blur(20px)",
          }}
        >
          <h1 className="text-2xl font-semibold mb-6">Login to your account</h1>
          <form onSubmit={onSubmit} className="flex flex-col space-y-4  ">
            {data?.message && (
              <p className="text-red-500 text-sm font-medium">
                {data?.message}
              </p>
            )}
            <div className="flex flex-col gap-y-1">
              <label>Email</label>
              <Input
                type="email"
                placeholder="Email"
                className=""
                name="email"
              />
              {data?.errors?.email && (
                <p className="text-red-500 text-sm font-medium">
                  {data?.errors?.email[0]}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-y-1">
              <label>Password</label>
              <PasswordInput
                placeholder="Password"
                className=""
                name="password"
              />
              {data?.errors?.password && (
                <p className="text-red-500 text-sm font-medium">
                  {data?.errors?.password[0]}
                </p>
              )}
            </div>
            <Button type="submit" className="rounded-xl" disabled={isPending}>
              Sign In
            </Button>
            <Button type="button" variant={"link"} className="rounded-xl text-foreground" disabled={isPending} onClick={() => router.back()}>
              Go Back
            </Button>
          </form>
        </div>
      </div>
    </Container>
  );
}

// function Pattern() {
//     return (
//         <>
//             <Image
//                 src={DotsPattern}
//                 alt="Horus Logo"
//                 className="mx-auto mb-4 absolute left-3 hidden md:block"
//             />

//             <Image
//                 src={DotsPattern}
//                 alt="Horus Logo"
//                 className="mx-auto mb-4 absolute right-3 translate-y-[120px] hidden md:block"
//             />

//             <Image
//                 src={DotsPattern}
//                 alt="Horus Logo"
//                 className="mx-auto mb-4 absolute left-3 bottom-0 -translate-y-[120px] hidden md:block"
//             />

//             <Image
//                 src={DotsPattern}
//                 alt="Horus Logo"
//                 className="mx-auto mb-4 absolute right-3 bottom-0 -translate-y-[80px] hidden md:block"
//             />
//         </>
//     )
// }
