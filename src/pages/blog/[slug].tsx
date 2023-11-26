import { BlogMeta } from "@/components/BlogMeta";
import { FormattedDate } from "@/components/FormattedDate";
import { RootLayout } from "@/layouts/RootLayout";
import {
  PostType,
  getAllPosts,
  getPostBySlug,
  markdownToHtml,
} from "@/utils/blog";
import ErrorPage from "next/error";
import Image from "next/image";
import { useRouter } from "next/router";

type Params = {
  params: {
    slug: string;
  };
};

export async function getStaticProps({ params }: Params) {
  const post = getPostBySlug(params.slug);
  const content = await markdownToHtml(post.content || "");

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts();

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
}

export default function Post({ post }: { post: PostType }) {
  const router = useRouter();
  const title = `${post.title} | YourDomain.com`;

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <div className="flex max-w-[1152px] w-full flex-col mx-auto relative">
      <BlogMeta
        title={title + " | YourDomain.com"}
        description="Some description of your site, important for SEO"
        ogImage={post.coverImage}
      />

      <article className="prose lg:prose-lg mx-auto py-16 w-full">
        {router.isFallback ? (
          <h1>Loading…</h1>
        ) : (
          <>
            <div className="text-neutral-600">
              <FormattedDate date={post.date} />
            </div>
            <h1>{post.title}</h1>
            <Image
              src={post.coverImage}
              alt={`Cover image for ${post.title}`}
              className="shadow-sm rounded-xl w-full object-cover object-center max-h-[40svh]"
              width={1300}
              height={630}
            />
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </>
        )}
      </article>
    </div>
  );
}

Post.getLayout = (page: React.ReactNode) => {
  return <RootLayout>{page}</RootLayout>;
};
