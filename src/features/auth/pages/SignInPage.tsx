import Button from "@/components/base/Button";
import GoogleIcon from "@/assets/auth/google.svg";
import AuthBackgroundLayout from "@/components/layout/AuthBackgroundLayout";
import { signInSchema, type SignInData } from "@/features/auth/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { InputField } from "@/components/form/InputField";
import { Link, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { useLogin } from "@/features/auth/hooks/useLogin";
import { useTranslation } from "react-i18next";
import { useGoogleLogin } from "@react-oauth/google";
import { useLoginWithGoogle } from "@/features/auth/hooks/useLoginWithGoogle";

export const SignInPage = () => {
  const { t } = useTranslation();
  const { mutateAsync: loginMutation, isPending } = useLogin();
  const {
    mutateAsync: loginWithGoogleMutation,
    isPending: isGoogleLoginPending,
  } = useLoginWithGoogle();

  const navigate = useNavigate();

  const form = useForm<SignInData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      username: "",
      password: "",
      rememberMe: false,
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

  const loginWithGoogle = useGoogleLogin({
    flow: "auth-code",
    onSuccess: async (res) => {
      await loginWithGoogleMutation({ credential: res });
      navigate({ to: "/chat" });
    },
    onError: () => {
      toast.error(t("login.errorMessage"));
    },
  });

  return (
    <AuthBackgroundLayout>
      <div className="space-y-7">
        <header className="space-y-2">
          <h1 className="text-foreground text-3xl font-semibold tracking-tight">
            {t("login.title")}
          </h1>
          <p className="text-muted-foreground max-w-sm text-sm leading-6">
            {t("login.subtitle")}
          </p>
        </header>

        <Button
          type="button"
          onClick={() => loginWithGoogle()}
          disabled={isGoogleLoginPending || isPending || isSubmitting}
          className="border-input bg-card text-foreground hover:bg-muted flex items-center justify-center gap-3 px-4 py-3 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50"
        >
          <img src={GoogleIcon} alt="" className="size-5" />
          {t("login.withGoogle")}
        </Button>

        <div className="text-muted-foreground flex items-center gap-3 text-xs">
          <span className="bg-border h-px flex-1" />
          <span>{t("login.withEmail")}</span>
          <span className="bg-border h-px flex-1" />
        </div>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <InputField
            type="text"
            id="username"
            autoComplete="username"
            placeholder={t("login.usernamePlaceholder")}
            {...register("username")}
            label={t("login.username")}
            error={errors.username?.message}
          />
          <InputField
            type="password"
            id="password"
            autoComplete="current-password"
            placeholder="**********"
            {...register("password")}
            label={t("login.password")}
            error={errors.password?.message}
          />

          <div className="flex items-center justify-between gap-4 pt-1">
            <label htmlFor="remember" className="flex items-center gap-2">
              <InputField
                type="checkbox"
                id="remember"
                className="accent-primary mt-0 size-4 w-auto"
                {...register("rememberMe")}
              />
              <span className="text-muted-foreground text-sm">
                {t("login.rememberMe")}
              </span>
            </label>

            <span className="text-muted-foreground cursor-pointer text-sm italic hover:underline">
              {t("login.forgotPassword")}
            </span>
          </div>

          <Button
            type="submit"
            className="border-navbar bg-navbar hover:bg-navbar-active flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
            disabled={isSubmitting || isPending || isGoogleLoginPending}
          >
            {isSubmitting || isPending || isGoogleLoginPending
              ? t("login.loggingIn")
              : t("login.loginButton")}
          </Button>
        </form>

        <p className="border-border text-muted-foreground border-t pt-6 text-center text-sm">
          {t("login.noAccount")}{" "}
          <Link to="/signup" className="font-semibold italic hover:underline">
            {t("login.registerButton")}
          </Link>
        </p>
      </div>
    </AuthBackgroundLayout>
  );
};
