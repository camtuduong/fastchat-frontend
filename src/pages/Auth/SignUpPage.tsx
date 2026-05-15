import Button from "@/components/base/Button";
import { InputField } from "@/components/form/InputField";
import AuthBackgroundLayout from "@/components/layout/AuthBackgroundLayout";
import { signUpSchema, type SignUpData } from "@/schemas/auth";
import { useAuthStore } from "@/stores/useAuthStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function SignUpPage() {
  const { signUp } = useAuthStore();
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
    mode: "onBlur",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = async (data: SignUpData) => {
    const { username, email, password, firstName, lastName } = data;
    try {
      await signUp(username, email, password, firstName, lastName);
      navigate("/signin");
    } catch (error) {
      toast.error("Failed to sign up. Please try again.");
    }
  };

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

        <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
          <InputField
            type="text"
            id="username"
            placeholder="Your username"
            {...register("username")}
            label="Username"
            error={errors.username?.message}
          />

          <div className="flex space-x-4">
            <div className="flex-1">
              <InputField
                type="text"
                id="firstName"
                placeholder="Your first name"
                {...register("firstName")}
                label="First Name"
                error={errors.firstName?.message}
              />
            </div>
            <div className="flex-1">
              <InputField
                type="text"
                id="lastName"
                placeholder="Your last name"
                {...register("lastName")}
                label="Last Name"
                error={errors.lastName?.message}
              />
            </div>
          </div>

          <InputField
            type="email"
            id="email"
            placeholder="mail@abc.com"
            {...register("email")}
            label="Email"
            error={errors.email?.message}
          />

          <InputField
            type="password"
            id="password"
            placeholder="**********"
            {...register("password")}
            label="Password"
            error={errors.password?.message}
          />

          <InputField
            type="password"
            id="confirmPassword"
            placeholder="**********"
            {...register("confirmPassword")}
            label="Confirm Password"
            error={errors.confirmPassword?.message}
          />

          <Button
            type="submit"
            className="w-full rounded-md bg-(--color-plum) px-4 py-2 text-white hover:bg-(--color-plum-dark)"
          >
            Sign Up
          </Button>
        </form>

        <p className="mt-2 mb-2 text-center text-[0.75rem] text-(--gray-2)">
          Already have an account?{" "}
          <a href="/signin" className="text-(--color-plum) hover:underline">
            Sign In
          </a>
        </p>
      </div>
    </AuthBackgroundLayout>
  );
}
