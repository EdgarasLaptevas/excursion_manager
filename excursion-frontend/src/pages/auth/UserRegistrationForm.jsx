import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod"
import { FormProvider, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RegisterSchema } from "@/schemas/RegisterSchema";
import { NavLink, useNavigate } from "react-router";

export const UserRegisterForm = () => {
    const form = useForm({
        resolver: zodResolver(RegisterSchema),
        mode: "onChange",
        defaultValues: {
            email: "",
            password: "",
        },
    });

    // useClearBackendErrors({
    //     fields: ["email"], form,
    //     clearErrorCallback: () => {
    //         setErrorStatus(null)
    //         setError(null)
    //     }
    // })

    const [errorStatus, setErrorstatus] = useState(null)
    const [error, setError] = useState(null);
    const { Loading, Success, Error } = UIStatus;
    const { setStatus } = useUI();
    const { register } = useAuth();
    const navigate = useNavigate()

    const handleRegFormSubmit = async (data) => {
        try {
            const payload = { username: data.email, password: data.password};

            setStatus(Loading);
            const response = await register(payload);
            const { message, success } = response.data;

            if (message && success) {
                toast.success(message);
                setStatus(Success);
                form.reset();
                setTimeout(() => {
                    navigate("/login");
                }, 2000);
            } else {
                setError("Unknown error");
            }
        } catch (error) {
            const errorMessage = 
            error?.response?.data?.message ?? error?.message ?? "Unknown error";
            const errorStatus = error?.response?.status
            setError(errorMessage);
            setErrorstatus(errorStatus);
            setStatus(Error);
        }
    };

    return (
        <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-r from-[#dfe9f3] to-white">
            <h1 className="text-xl font-semibold mb-5 text-sky-950">Register</h1>
            <FormProvider {...form}>
                <Form
                onSubmit={form.handleSubmit(handleRegFormSubmit)}
                className="w-80 md:w-100 flex flex-col gap-2 text-sky-950 bg-gradient-to-br from-gray-300 via-white to-gray-200 p-5 rounded-lg shadow-lg"
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
                            {error && errorStatus == 400 ? error : form.formState.errors.email?.message}
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
                  {form.formState.errors.password?.message}
                </FormMessage>
              </FormItem>
            )}
          />
          <FormField
            name="repeatPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Repeat Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Repeat Password"
                    {...field}
                    type="password"
                  />
                </FormControl>
                <FormMessage className="text-red-500">
                  {form.formState.errors.repeatPassword?.message}
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
      <NavLink to="/login">
        <p className="text-md hover:underline">Already have account? Login </p>
      </NavLink>
    </div>
  );
};