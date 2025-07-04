"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
import { formSchema, SignUpFormValues, SignUpProps } from "../../model/SignUp";
import { FC, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { signUp } from "../../api/signUp";
import { Loader } from "@/shared/ui/Loader";
import { toast } from "react-toastify";

export const SignUp: FC<SignUpProps> = ({ onSwitch }) => {
  const mutation = useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      window.location.reload();
    },
    onError: (e) => {
      setIsLoading(false)
      toast.error(e.message)
    },
    onSettled: () => {
    }
  });
  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirm_password: "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (data: SignUpFormValues) => {
    mutation.mutate(data);
    setIsLoading(true)

  };

  return (
    <div className="flex-1 flex items-center justify-center w-full p-4">
      {isLoading && (<Loader/>)}
      {!isLoading && <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="border-2 p-4 border-borderCommon rounded-[10px] sm:w-6/12 lg:w-4/12 w-full flex flex-col gap-5"
        >
          <h2 className="text-textCommon font-semibold text-2xl text-center">
            Sign up
          </h2>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel className="text-textCommon">Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Username"
                      className="rounded-[5px] border-borderCommon border-2"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel className="text-textCommon">Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="*********"
                      type="password"
                      className="rounded-[5px] border-borderCommon border-2"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            control={form.control}
            name="confirm_password"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel className="text-textCommon">
                    Confirm Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="*********"
                      type="password"
                      className="rounded-[5px] border-borderCommon border-2"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <Button
            variant={"authBtn"}
            type="submit"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Signing up..." : "Sign up"}
          </Button>
          <div
            className="text-center font-semibold text-textCommon cursor-pointer"
            onClick={onSwitch}
          >
            Already have an account? Sign in
          </div>
        </form>
      </Form>}
    </div>
  );
};
