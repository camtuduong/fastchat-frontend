import Button from "@/components/base/Button";
import AuthBackgroundLayout from "@/components/layout/AuthBackgroundLayout";
import { signInSchema, type SignInData } from "@/features/auth/auth";
import GoogleIcon from "@/assets/auth/google.svg";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { InputField } from "@/components/form/InputField";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { useLogin } from "@/features/auth/hooks/useLogin";

export const SignInPage = () => {
  const { mutateAsync: loginMutation, isPending } = useLogin();

  const navigate = useNavigate();
  const form = useForm<SignInData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  const onSubmit = async (data: SignInData) => {
    try {
      await loginMutation({
        username: data.username,
        password: data.password,
      });
      navigate({ to: "/" });
    } catch (error) {
      toast.error(
        "Failed to sign in. Please check your credentials and try again.",
      );
    }
  };

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

        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <InputField
            type="text"
            id="username"
            placeholder="Username"
            {...register("username")}
            label="Username"
            error={errors.username?.message}
          />
          <div>
            <InputField
              type="password"
              id="password"
              placeholder="**********"
              {...register("password")}
              label="Password"
              error={errors.password?.message}
            />

            <div className="flex items-center justify-between">
              <label htmlFor="remember" className="flex items-center gap-2">
                <InputField
                  type="checkbox"
                  id="remember"
                  className="mt-0.5"
                  {...register("rememberMe")}
                />
                <span className="text-[0.75rem] text-(--gray-2)">Remember</span>
              </label>

              <a
                href="#"
                className="text-[0.75rem] text-(--color-plum) hover:underline"
              >
                Forgot password?
              </a>
            </div>
          </div>
          {isSubmitting || isPending ? (
            <Button
              type="submit"
              className="w-full cursor-not-allowed rounded-md bg-(--color-plum) px-4 py-2 text-white opacity-50"
              disabled
            >
              Logging in...
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full rounded-md bg-(--color-plum) px-4 py-2 text-white hover:bg-(--color-plum-dark)"
            >
              Login
            </Button>
          )}
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
};
