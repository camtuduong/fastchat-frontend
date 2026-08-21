import Button from "@/components/base/Button";
import { InputField } from "@/components/form/InputField";
import AuthBackgroundLayout from "@/components/layout/AuthBackgroundLayout";
import { signUpSchema, type SignUpData } from "@/features/auth/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
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
    try {
      await signUp({ username, email, password, firstName, lastName });
      navigate({ to: "/signin" });
    } catch (error) {
      toast.error(t("signup.errorMessage"));
    }
  };

  return (
    <AuthBackgroundLayout>
      <div className="px-4">
        <div className="flex flex-col items-start space-y-4">
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-[#525252]">
              {t("signup.title")}
            </h2>
            <p className="text-[0.75rem]">{t("signup.subtitle")}</p>
          </div>
        </div>

        <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
          <InputField
            type="text"
            id="username"
            placeholder={t("signup.usernamePlaceholder")}
            {...register("username")}
            label={t("signup.username")}
            error={errors.username?.message}
          />

          <div className="flex space-x-4">
            <div className="flex-1">
              <InputField
                type="text"
                id="firstName"
                placeholder={t("signup.firstNamePlaceholder")}
                {...register("firstName")}
                label={t("signup.firstName")}
                error={errors.firstName?.message}
              />
            </div>
            <div className="flex-1">
              <InputField
                type="text"
                id="lastName"
                placeholder={t("signup.lastNamePlaceholder")}
                {...register("lastName")}
                label={t("signup.lastName")}
                error={errors.lastName?.message}
              />
            </div>
          </div>

          <InputField
            type="email"
            id="email"
            placeholder={t("signup.emailPlaceholder")}
            {...register("email")}
            label={t("signup.email")}
            error={errors.email?.message}
          />

          <InputField
            type="password"
            id="password"
            placeholder="**********"
            {...register("password")}
            label={t("signup.password")}
            error={errors.password?.message}
          />

          <InputField
            type="password"
            id="confirmPassword"
            placeholder="**********"
            {...register("confirmPassword")}
            label={t("signup.confirmPassword")}
            error={errors.confirmPassword?.message}
          />

          {isSubmitting ? (
            <Button
              type="submit"
              className="w-full cursor-not-allowed rounded-md bg-(--color-plum) px-4 py-2 text-white opacity-50"
              disabled
            >
              {t("signup.signingUp")}
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full rounded-md bg-(--color-plum) px-4 py-2 text-white hover:bg-(--color-plum-dark)"
            >
              {t("signup.signUpButton")}
            </Button>
          )}
        </form>

        <p className="mt-2 mb-2 text-center text-[0.75rem] text-(--gray-2)">
          {t("signup.alreadyAccount")}{" "}
          <a href="/signin" className="text-(--color-plum) hover:underline">
            {t("signup.signInLink")}
          </a>
        </p>
      </div>
    </AuthBackgroundLayout>
  );
}
