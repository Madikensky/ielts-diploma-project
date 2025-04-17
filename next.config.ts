import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import nextIntlConfig from "./next-intl.config";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  /* config options here */
};

export default withNextIntl(nextConfig);
