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
import { formSchema, SignInFormValues, SignInProps } from "../../model/SignIn";
import { FC } from "react";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "../../api/signIn";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { Loader } from "@/shared/ui/Loader";

export const SignIn: FC<SignInProps> = ({ onSwitch }) => {
  const router = useRouter();
  const locale = useLocale();
  const mutation = useMutation({
    mutationFn: signIn,
    onSuccess: (e: { token: string }) => {
      Cookies.set("access_token", e.token);
      router.push(`/${locale}/home`);
    },
    onError: (e) => {
      alert(e.message);
    },
  });

  const form = useForm<SignInFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: SignInFormValues) => {
    mutation.mutate(data);
  };

  return (
    <div className="flex-1 flex items-center justify-center w-full p-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="border-2 p-4 border-borderCommon rounded-[10px] sm:w-6/12 lg:w-4/12 w-full flex flex-col gap-5"
        >
          <h2 className="text-textCommon font-semibold text-2xl text-center">
            Sign in
          </h2>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel className="text-textCommon">Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="email@inbox.com"
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

          <Button
            variant={"authBtn"}
            type="submit"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Signing in..." : "Sign in"}
          </Button>

          <div
            className="text-center font-semibold text-textCommon cursor-pointer"
            onClick={onSwitch}
          >
            Need an account? Sign up
          </div>
        </form>
      </Form>
    </div>
  );
};
