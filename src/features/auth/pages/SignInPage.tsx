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
import { useTranslation } from "react-i18next";

export const SignInPage = () => {
  const { t } = useTranslation();
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
      navigate({ to: "/chat" });
    } catch (error) {
      toast.error(t("login.errorMessage"));
    }
  };

  return (
    <AuthBackgroundLayout>
      <div className="px-4">
        <div className="flex flex-col items-start space-y-4">
          <div>
            <h2 className="text-2xl font-bold text-[#525252]">
              {t("login.title")}
            </h2>
            <p className="text-[0.75rem]">{t("login.subtitle")}</p>
          </div>
          <Button>
            <div className="flex items-center justify-center">
              <img
                src={GoogleIcon}
                alt="Google Icon"
                className="mr-2 h-5 w-5"
              />
              {t("login.withGoogle")}
            </div>
          </Button>
        </div>

        <div className="mt-6 mb-9 flex items-center justify-center text-[0.75rem] text-[#A1A1A1]">
          <span className="text-(--gray-1)">-------------</span>
          <span className="text-(--gray-2)">{t("login.withEmail")}</span>
          <span className="text-(--gray-1)">-------------</span>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <InputField
            type="text"
            id="username"
            placeholder={t("login.usernamePlaceholder")}
            {...register("username")}
            label={t("login.username")}
            error={errors.username?.message}
          />
          <div>
            <InputField
              type="password"
              id="password"
              placeholder="**********"
              {...register("password")}
              label={t("login.password")}
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
                <span className="text-[0.75rem] text-(--gray-2)">
                  {t("login.rememberMe")}
                </span>
              </label>

              <a
                href="#"
                className="text-[0.75rem] text-(--color-plum) hover:underline"
              >
                {t("login.forgotPassword")}
              </a>
            </div>
          </div>
          <Button
            type="submit"
            className="w-full rounded-md bg-(--color-plum) px-4 py-2 text-white"
            disabled={isSubmitting || isPending}
          >
            {isSubmitting || isPending
              ? t("login.loggingIn")
              : t("login.loginButton")}
          </Button>
        </form>

        <p className="mt-6 text-center text-[0.75rem] text-(--gray-2)">
          {t("login.noAccount")}{" "}
          <a href="/signup" className="text-(--color-plum) hover:underline">
            {t("login.registerButton")}
          </a>
        </p>
      </div>
    </AuthBackgroundLayout>
  );
};
