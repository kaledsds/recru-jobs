import { Github, Instagram, LucideFacebook } from "lucide-react";
import { signIn } from "next-auth/react";
import Image from "next/image";

const HeroSection = () => {
  return (
    <section id="home" className="hero relative min-h-screen text-center ">
      <div className="flex max-w-[900px] flex-col gap-12">
        <div className="space-y-4 pt-24">
          <h1 className="text-6xl font-bold">Hi,Welcome to RecruJobs</h1>
          <h3 className="text-4xl font-semibold text-primary">
            let us help you to find your dream job
          </h3>
          <p className="py-6 text-xl font-semibold">
            The only way to do great work is to love what you do. If you
            haven&apos;t found it yet, Keep looking. Don&apos;t settle. As with
            all matters of the heart, you&apos;ll know when you find it
          </p>
          <button className="btn-primary btn" onClick={() => void signIn()}>
            Get Started
          </button>
        </div>
        <div className="flex w-full justify-center gap-5 ">
          <a
            href="#"
            className="rounded-full border-2 border-base-content p-2 hover:bg-base-content hover:text-base-200"
          >
            <LucideFacebook />
          </a>
          <a
            href="#"
            className="rounded-full border-2 border-base-content p-2 hover:bg-base-content hover:text-base-200"
          >
            <Instagram />
          </a>
          <a
            href="#"
            className="rounded-full border-2 border-base-content p-2 hover:bg-base-content hover:text-base-200"
          >
            <Github />
          </a>
        </div>
      </div>
      <Image
        className="absolute left-0 top-0 -z-10 h-screen w-[20%] "
        src="/svgs/shape-1.svg"
        alt="shape-2"
        width={435}
        height={959}
      />
      <Image
        className="absolute right-0 top-0 -z-10 h-screen w-[80%]"
        src="/svgs/shape-2.svg"
        alt="shape-2"
        width={254}
        height={182}
      />
    </section>
  );
};

export default HeroSection;
