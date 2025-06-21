"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { signIn } from "../../api/signIn";
import { formSchema, SignInFormValues, SignInProps } from "../../model/SignIn";
import { Loader } from "@/shared/ui/Loader";
  import { toast } from 'react-toastify';

export const SignIn: FC<SignInProps> = ({ onSwitch }) => {
  const router = useRouter();
  const locale = useLocale();
  const mutation = useMutation({
    mutationFn: signIn,
    onSuccess: (e: { token: string }) => {
      Cookies.set("access_token", e.token);
      toast.success('Credentials confirmed!')
      router.push(`/${locale}/home`);
    },
    onError: () => {
      toast.error('Wrong credentials!')
      setIsLoading(false)
    },
    onSettled: () => {
    }
  });
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<SignInFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: SignInFormValues) => {
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
            Sign in
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
      </Form>}
    </div>
  );
};
