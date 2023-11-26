import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { FormattedDate } from "@/components/FormattedDate";
import { BlogMeta } from "@/components/BlogMeta";
import { RootLayout } from "@/layouts/RootLayout";
import { PostType, getAllPosts } from "@/utils/blog";

export const getStaticProps = async () => {
  const allPosts = getAllPosts();

  return {
    props: { allPosts },
  };
};

type Props = {
  allPosts: PostType[];
};

export default function Index({ allPosts }: Props) {
  return (
    <div className="flex max-w-[1152px] w-full flex-col mx-auto relative py-12 gap-12">
      <BlogMeta
        title="Blog | YourDomain.com"
        description="Some description of your site, important for SEO"
      />

      <div className="flex flex-col gap-1">
        <h1 className="text-5xl font-semibold tracking-tighter">
          From the Blog
        </h1>
        <p className="text-neutral-600">
          Tips for whatever you do, from the YourDomain.com team
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        {allPosts.map((post) => (
          <Link
            key={post.slug}
            className="group flex flex-col gap-3"
            href={"/blog/" + post.slug}
          >
            <div className="overflow-hidden rounded-xl shadow-sm group-hover:shadow-lg transition-all relative aspect-[2/1] w-full ">
              <Image
                src={post.coverImage}
                alt={`Cover image for ${post.title}`}
                className="object-cover object-center"
                fill
              />
            </div>

            <div className="flex flex-col gap-1">
              <div className="text-neutral-600">
                <FormattedDate date={post.date} />
              </div>
              <h3 className="text-xl leading-tight font-semibold max-w-[95%]">
                {post.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

Index.getLayout = (page: React.ReactNode) => {
  return <RootLayout>{page}</RootLayout>;
};
