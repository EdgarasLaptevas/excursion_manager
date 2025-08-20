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
import { excursionSchema } from "@/schemas/ExcursionSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/utils/api";

export const ExcursionForm = () => {
  const form = useForm({
    resolver: zodResolver(excursionSchema),
    mode: "onChange",
    defaultValues: {
      excursionName: "",
      description: "",
      photoUrl: "",
      duration: 1,
      price: 0,
    },
  });

  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmitExcursion = async (data) => {
    try {
      const response = await api.post("/excursions", data
      );

      const { data2, message, success } = response.data
      if ( success) {

      toast.success(message);
      form.reset();
      } else {
        setErrorMessage("Uknown error");
      }
    } catch (error) {
      const errorMessage = 
            error?.response?.data?.message ?? error?.message ?? "Unknown error";
            setErrorMessage(errorMessage)
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-r from-white via-blue-50 to-white">
      <h1 className="mb-5 text-xl font-semibold text-sky-950">Create Excursion</h1>
      <FormProvider {...form}>
        <Form
          onSubmit={form.handleSubmit(handleSubmitExcursion)}
          className="flex w-96 flex-col gap-4 rounded-lg bg-white p-6 shadow-xl"
        >
          <FormField
            name="excursionName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Excursion Name</FormLabel>
                <FormControl>
                  <Input placeholder="Excursion Name" {...field} />
                </FormControl>
                <FormMessage>
                  {errorMessage}
                </FormMessage>
              </FormItem>
            )}
          />
          <FormField
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Description"
                    className="w-full rounded border p-2"
                    rows={4}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="photoUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Photo URL</FormLabel>
                <FormControl>
                  <Input placeholder="https://example.com/photo.jpg" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="duration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Duration (hours)</FormLabel>
                <FormControl>
                  <Input type="number" min={1} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price (€)</FormLabel>
                <FormControl>
                  <Input type="number" step="0.01" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="bg-blue-500 text-white hover:bg-blue-600"
          >
            {form.formState.isSubmitting ? "Submitting..." : "Create Excursion"}
          </Button>
        </Form>
      </FormProvider>
      {errorMessage && <p className="mt-4 text-red-600">{errorMessage}</p>}
    </div>
  );
};
