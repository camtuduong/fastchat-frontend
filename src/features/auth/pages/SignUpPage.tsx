import Button from "@/components/base/Button";
import { InputField } from "@/components/form/InputField";
import AuthBackgroundLayout from "@/components/layout/AuthBackgroundLayout";
import { signUpSchema, type SignUpData } from "@/features/auth/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "@tanstack/react-router";
import { useSignUp } from "@/features/auth/hooks/useSignup";
import { useTranslation } from "react-i18next";

export default function SignUpPage() {
  const { t } = useTranslation();
  const { mutateAsync: signUp } = useSignUp();
  const navigate = useNavigate();

  const form = useForm<SignUpData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  const onSubmit = async (data: SignUpData) => {
    const { username, email, password, firstName, lastName } = data;
    await signUp({ username, email, password, firstName, lastName });
    navigate({ to: "/signin" });
  };

  return (
    <AuthBackgroundLayout>
      <div className="space-y-5">
        <header className="space-y-2">
          <h1 className="text-foreground text-3xl font-semibold tracking-tight">
            {t("signup.title")}
          </h1>
          <p className="text-muted-foreground max-w-sm text-sm leading-5">
            {t("signup.subtitle")}
          </p>
        </header>

        <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
          <InputField
            type="text"
            id="username"
            autoComplete="username"
            placeholder={t("signup.usernamePlaceholder")}
            {...register("username")}
            label={t("signup.username")}
            error={errors.username?.message}
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <InputField
              type="text"
              id="firstName"
              autoComplete="given-name"
              placeholder={t("signup.firstNamePlaceholder")}
              {...register("firstName")}
              label={t("signup.firstName")}
              error={errors.firstName?.message}
            />
            <InputField
              type="text"
              id="lastName"
              autoComplete="family-name"
              placeholder={t("signup.lastNamePlaceholder")}
              {...register("lastName")}
              label={t("signup.lastName")}
              error={errors.lastName?.message}
            />
          </div>

          <InputField
            type="email"
            id="email"
            autoComplete="email"
            placeholder={t("signup.emailPlaceholder")}
            {...register("email")}
            label={t("signup.email")}
            error={errors.email?.message}
          />

          <InputField
            type="password"
            id="password"
            autoComplete="new-password"
            placeholder="**********"
            {...register("password")}
            label={t("signup.password")}
            error={errors.password?.message}
          />

          <InputField
            type="password"
            id="confirmPassword"
            autoComplete="new-password"
            placeholder="**********"
            {...register("confirmPassword")}
            label={t("signup.confirmPassword")}
            error={errors.confirmPassword?.message}
          />

          <Button
            type="submit"
            className="border-navbar bg-navbar hover:bg-navbar-active flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
            disabled={isSubmitting}
          >
            {isSubmitting ? t("signup.signingUp") : t("signup.signUpButton")}
          </Button>
        </form>

        <p className="border-border text-muted-foreground border-t pt-3 text-center text-sm">
          {t("signup.alreadyAccount")}{" "}
          <Link to="/signin" className="font-semibold italic hover:underline">
            {t("signup.signInLink")}
          </Link>
        </p>
      </div>
    </AuthBackgroundLayout>
  );
}
