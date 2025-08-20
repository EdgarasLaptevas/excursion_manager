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
import { Textarea } from "@/components/ui/textarea";
import { reviewSchema } from "@/schemas/ReviewSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useState } from "react";
import { api } from "@/utils/api";
import { z } from "zod";

export const ReviewForm = () => {
  const form = useForm({
    resolver: zodResolver(reviewSchema),
    mode: "onChange",
    defaultValues: {
      reviewText: "",
      rating: 0,
    },
  });

  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmitReview = async (data) => {
    try {
      const response = await api.post("/reviews", data);
      const { success, message } = response.data;

      if (success) {
        toast.success(message || "Review submitted!");
        form.reset();
      } else {
        setErrorMessage("Unknown error");
      }
    } catch (error) {
      const message =
        error?.response?.data?.message ?? error?.message ?? "Unknown error";
      setErrorMessage(message);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-r from-white via-green-50 to-white">
      <h1 className="mb-5 text-xl font-semibold text-emerald-900">Leave a Review</h1>
      <FormProvider {...form}>
        <Form
          onSubmit={form.handleSubmit(handleSubmitReview)}
          className="flex w-96 flex-col gap-4 rounded-lg bg-white p-6 shadow-xl"
        >
          <FormField
            name="reviewText"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Review</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Write your thoughts..."
                    rows={5}
                    className="w-full rounded border p-2"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="rating"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rating (1–10)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={1}
                    max={10}
                    step={1}
                    {...field}
                    value={field.value ?? ""}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="bg-emerald-600 text-white hover:bg-emerald-700"
          >
            {form.formState.isSubmitting ? "Submitting..." : "Submit Review"}
          </Button>
        </Form>
      </FormProvider>
      {errorMessage && <p className="mt-4 text-red-600">{errorMessage}</p>}
    </div>
  );
};
