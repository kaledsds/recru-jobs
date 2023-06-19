import { Home } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";

/**
 * SigninPage is the signin page of the application.
 * @returns The SigninPage page.
 */
const SigninPage: React.FC = () => {
  return (
    <main className="relative flex h-screen w-screen items-center justify-center overflow-hidden">
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="dark:bg-dark mx-auto max-w-[500px] rounded-md bg-primary bg-opacity-5 px-6 py-10 sm:p-[60px]">
              <Link
                href="/"
                className="shadow-one mb-11 flex w-full items-center justify-center gap-2 rounded-md bg-info p-3 font-medium text-white hover:bg-opacity-80"
              >
                <Home className="h-5 w-5" />
                <span className="font-semibold">Go back to home page</span>
              </Link>
              <h3 className="text-body-color mb-3 text-center text-2xl font-bold sm:text-3xl">
                Sign in to your account
              </h3>
              <p className="text-body-color mb-11 text-center text-base font-medium">
                Login to your account for a faster checkout.
              </p>
              <div className="flex flex-col gap-4">
                <GoogleAuth />
                <span className="flex items-center justify-center gap-4">
                  <span className="block h-[1px] w-[155px] bg-slate-400 "></span>
                  <p>Or</p>
                  <span className="block h-[1px] w-[155px] bg-slate-400 "></span>
                </span>
                <FacebookAuth />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute left-0 top-0 z-[-1]">
        <svg
          width="1440"
          height="969"
          viewBox="0 0 1440 969"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <mask
            id="mask0_95:1005"
            style={{ maskType: "alpha" }}
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="1440"
            height="969"
          >
            <rect width="1440" height="969" fill="#090E34" />
          </mask>
          <g mask="url(#mask0_95:1005)">
            <path
              opacity="0.1"
              d="M1086.96 297.978L632.959 554.978L935.625 535.926L1086.96 297.978Z"
              fill="url(#paint0_linear_95:1005)"
            />
            <path
              opacity="0.1"
              d="M1324.5 755.5L1450 687V886.5L1324.5 967.5L-10 288L1324.5 755.5Z"
              fill="url(#paint1_linear_95:1005)"
            />
          </g>
          <defs>
            <linearGradient
              id="paint0_linear_95:1005"
              x1="1178.4"
              y1="151.853"
              x2="780.959"
              y2="453.581"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#4A6CF7" />
              <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_95:1005"
              x1="160.5"
              y1="220"
              x2="1099.45"
              y2="1192.04"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#4A6CF7" />
              <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </main>
  );
};

export default SigninPage;

/**
 * GoogleAuth is the google authentication button.
 * @returns The GoogleAuth component.
 */
const GoogleAuth: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <button
        className="shadow-one flex w-full items-center justify-center rounded-md bg-base-100 p-3 text-base font-medium hover:bg-base-300"
        onClick={() => void signIn("google")}
      >
        <span className="mr-3">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_95:967)">
              <path
                d="M20.0001 10.2216C20.0122 9.53416 19.9397 8.84776 19.7844 8.17725H10.2042V11.8883H15.8277C15.7211 12.539 15.4814 13.1618 15.1229 13.7194C14.7644 14.2769 14.2946 14.7577 13.7416 15.1327L13.722 15.257L16.7512 17.5567L16.961 17.5772C18.8883 15.8328 19.9997 13.266 19.9997 10.2216"
                fill="#4285F4"
              />
              <path
                d="M10.2042 20.0001C12.9592 20.0001 15.2721 19.1111 16.9616 17.5778L13.7416 15.1332C12.88 15.7223 11.7235 16.1334 10.2042 16.1334C8.91385 16.126 7.65863 15.7206 6.61663 14.9747C5.57464 14.2287 4.79879 13.1802 4.39915 11.9778L4.27957 11.9878L1.12973 14.3766L1.08856 14.4888C1.93689 16.1457 3.23879 17.5387 4.84869 18.512C6.45859 19.4852 8.31301 20.0005 10.2046 20.0001"
                fill="#34A853"
              />
              <path
                d="M4.39911 11.9777C4.17592 11.3411 4.06075 10.673 4.05819 9.99996C4.0623 9.32799 4.17322 8.66075 4.38696 8.02225L4.38127 7.88968L1.19282 5.4624L1.08852 5.51101C0.372885 6.90343 0.00012207 8.4408 0.00012207 9.99987C0.00012207 11.5589 0.372885 13.0963 1.08852 14.4887L4.39911 11.9777Z"
                fill="#FBBC05"
              />
              <path
                d="M10.2042 3.86663C11.6663 3.84438 13.0804 4.37803 14.1498 5.35558L17.0296 2.59996C15.1826 0.901848 12.7366 -0.0298855 10.2042 -3.6784e-05C8.3126 -0.000477834 6.45819 0.514732 4.8483 1.48798C3.2384 2.46124 1.93649 3.85416 1.08813 5.51101L4.38775 8.02225C4.79132 6.82005 5.56974 5.77231 6.61327 5.02675C7.6568 4.28118 8.91279 3.87541 10.2042 3.86663Z"
                fill="#EB4335"
              />
            </g>
            <defs>
              <clipPath id="clip0_95:967">
                <rect width="20" height="20" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </span>
        Sign in with Google
      </button>
    </div>
  );
};

/**
 * FacebookAuth is the facebook authentication button.
 * @returns The FacebookAuth component.
 */
const FacebookAuth: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <button
        className="shadow-one flex  w-full items-center justify-center rounded-md bg-base-100 p-3 text-base font-medium hover:bg-base-300"
        onClick={() => void signIn("facebook")}
      >
        <span className="mr-3">
          <svg
            width="25"
            height="25"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="16" cy="16" r="14" fill="url(#paint0_linear_87_7208)" />
            <path
              d="M21.2137 20.2816L21.8356 16.3301H17.9452V13.767C17.9452 12.6857 18.4877 11.6311 20.2302 11.6311H22V8.26699C22 8.26699 20.3945 8 18.8603 8C15.6548 8 13.5617 9.89294 13.5617 13.3184V16.3301H10V20.2816H13.5617V29.8345C14.2767 29.944 15.0082 30 15.7534 30C16.4986 30 17.2302 29.944 17.9452 29.8345V20.2816H21.2137Z"
              fill="white"
            />
            <defs>
              <linearGradient
                id="paint0_linear_87_7208"
                x1="16"
                y1="2"
                x2="16"
                y2="29.917"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#18ACFE" />
                <stop offset="1" stopColor="#0163E0" />
              </linearGradient>
            </defs>
          </svg>
        </span>
        Sign in with Facebook
      </button>
    </div>
  );
};
