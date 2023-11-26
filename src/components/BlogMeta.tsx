import Head from "next/head";

export const BlogMeta = ({
  title,
  description,
  ogImage,
}: {
  title: string;
  description: string;
  ogImage?: string;
}) => {
  return (
    <Head>
      <title>{title}</title>

      <meta name="description" content={description} />

      <meta property="og:image" content={ogImage ?? "/og-image.png"} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={title} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:domain" content="YOUR_DOMAIN.COM" />
      <meta property="twitter:url" content="https://YOUR_DOMAIN.COM" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={title} />
    </Head>
  );
};
