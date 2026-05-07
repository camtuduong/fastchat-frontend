import Button from "@/components/base/Button";
import InputField from "@/components/form/InputField";
import AuthBackgroundLayout from "@/components/layout/AuthBackgroundLayout";

export default function SignUpPage() {
  return (
    <AuthBackgroundLayout>
      <div className="px-4">
        <div className="flex flex-col items-start space-y-4">
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-[#525252]">
              Sign Up to Your Account
            </h2>
            <p className="text-[0.75rem]">
              Join us and start managing your business effectively
            </p>
          </div>
        </div>
        <form className="space-y-3">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-(--gray-3)"
            >
              Username
            </label>
            <InputField
              type="text"
              id="username"
              placeholder="Your username"
              className="mt-1 w-full rounded-md border border-(--border-input) px-3 py-2 focus:border-(--color-plum) focus:outline-none"
            />
          </div>

          <div className="flex space-x-4">
            <div className="flex-1">
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-(--gray-3)"
              >
                First Name
              </label>
              <InputField
                type="text"
                id="firstName"
                placeholder="Your first name"
                className="mt-1 w-full rounded-md border border-(--border-input) px-3 py-2 focus:border-(--color-plum) focus:outline-none"
              />
            </div>
            <div className="flex-1">
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-(--gray-3)"
              >
                Last Name
              </label>
              <InputField
                type="text"
                id="lastName"
                placeholder="Your last name"
                className="mt-1 w-full rounded-md border border-(--border-input) px-3 py-2 focus:border-(--color-plum) focus:outline-none"
              />
            </div>
          </div>

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
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-(--gray-3)"
            >
              Confirm Password
            </label>
            <InputField
              type="password"
              id="confirmPassword"
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
            Sign Up
          </Button>
        </form>

        <p className="mt-6 text-center text-[0.75rem] text-(--gray-2)">
          Already have an account?{" "}
          <a href="/signin" className="text-(--color-plum) hover:underline">
            Sign In
          </a>
        </p>
      </div>
    </AuthBackgroundLayout>
  );
}
