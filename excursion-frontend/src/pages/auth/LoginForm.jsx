import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UIStatus } from "@/constants/UIStatus";
import { useAuth } from "@/contexts/AuthProvider";
import { useUI } from "@/contexts/UIContext";
import { LogInSchema } from "@/schemas/LoginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { NavLink, useNavigate } from "react-router";

export const UserLoginForm = () => {
  const form = useForm({
    resolver: zodResolver(LogInSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { setStatus } = useUI();
  const { Loading, Success } = UIStatus;
  const { login } = useAuth();
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState(null);
  const [errorStatus, setErrorStatus] = useState(null);

  // useClearBackendErrors({
  //     fields: ["email", "password"],
  //     form,
  //     clearErrorCallback: () => {
  //         if (errorMessage || errorStatus) {
  //             setErrorMessage(null);
  //             setErrorStatus(null);
  //         }
  //     }
  // });

  const handleLogIn = async (data) => {
    try {
      setStatus(Loading);

      await login(data);
      toast.success("Welcome");
      setStatus(Success);
      form.reset();
      navigate("/home");
    } catch (error) {
      setErrorMessage(error.message);
      setErrorStatus(error.status);
      setStatus(Error);
    }
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gradient-to-l from-[#dfe9f3] to-white">
      <h1 className="mb-5 text-xl font-semibold text-sky-950">Login</h1>
      <FormProvider {...form}>
        <Form
          onSubmit={form.handleSubmit(handleLogIn)}
          className="flex w-80 flex-col gap-2 rounded-lg bg-gradient-to-br from-gray-300 via-white to-gray-200 p-5 text-sky-950 shadow-lg md:w-100"
        >
          <FormField
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} />
                </FormControl>
                <FormMessage className="text-red-500">
                  {errorMessage && errorStatus === 404
                    ? errorMessage
                    : form.formState.errors.email?.message}
                </FormMessage>
              </FormItem>
            )}
          />
          <FormField
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="Password" {...field} type="password" />
                </FormControl>
                <FormMessage className="text-red-500">
                  {errorMessage && errorStatus === 400
                    ? errorMessage
                    : form.formState.errors.password?.message}
                </FormMessage>
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="bg-gray-200 hover:bg-blue-200"
          >
            {form.formState.isSubmitting ? "Submiting" : "Submit"}
          </Button>
        </Form>
      </FormProvider>
      <NavLink to="/register">
        <p className="text-md hover:underline">
          Dont have an account? Register{" "}
        </p>
      </NavLink>
      <p>{errorMessage && errorStatus === 401 ? errorMessage : ""}</p>
    </div>
  );
};
