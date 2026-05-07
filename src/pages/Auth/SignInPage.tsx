import Button from "@/components/base/Button";
import AuthBackgroundLayout from "@/components/layout/AuthBackgroundLayout";
import GoogleIcon from "@/assets/auth/google.svg";
import InputField from "@/components/form/InputField";

export default function SignInPage() {
  return (
    <AuthBackgroundLayout>
      <div className="px-4">
        <div className="flex flex-col items-start space-y-4">
          <div>
            <h2 className="text-2xl font-bold text-[#525252]">
              Login to your Account
            </h2>
            <p className="text-[0.75rem]">
              See what is going on with your business
            </p>
          </div>
          <Button>
            <div className="flex items-center justify-center">
              <img
                src={GoogleIcon}
                alt="Google Icon"
                className="mr-2 h-5 w-5"
              />
              Continue with Google
            </div>
          </Button>
        </div>

        <div className="mt-6 mb-9 flex items-center justify-center text-[0.75rem] text-[#A1A1A1]">
          <span className="text-(--gray-1)">-------------</span>
          <span className="text-(--gray-2)"> or Sign in with Email </span>
          <span className="text-(--gray-1)">-------------</span>
        </div>

        <form className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-(--gray-3)"
            >
              Email
            </label>
            <InputField
              type="email"
              id="email"
              placeholder="mail@abc.com"
              className="mt-1 w-full rounded-md border border-(--border-input) px-3 py-2 focus:border-(--color-plum) focus:outline-none"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-(--gray-3)"
            >
              Password
            </label>
            <InputField
              type="password"
              id="password"
              placeholder="**********"
              className="mt-1 w-full rounded-md border border-(--border-input) px-3 py-2 focus:border-(--color-plum) focus:outline-none"
            />

            <div className="flex items-center justify-between">
              <InputField type="checkbox" id="remember" className="mt-0.5" />
              <label
                htmlFor="remember"
                className="ml-1 text-[0.75rem] text-(--gray-2)"
              >
                Remember me
              </label>
              <a
                href="#"
                className="ml-auto text-[0.75rem] text-(--color-plum) hover:underline"
              >
                Forgot password?
              </a>
            </div>
          </div>
          <Button
            type="submit"
            className="w-full rounded-md bg-(--color-plum) px-4 py-2 text-white hover:bg-(--color-plum-dark)"
          >
            Login
          </Button>
        </form>

        <p className="mt-6 text-center text-[0.75rem] text-(--gray-2)">
          Don't have an account?{" "}
          <a href="/signup" className="text-(--color-plum) hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </AuthBackgroundLayout>
  );
}
