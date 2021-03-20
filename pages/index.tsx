import {getSortedPostsData, PostData} from '../lib/posts';
import {GetStaticProps} from "next";
import Head from 'next/head';
import Link from "next/link";
import Layout, {siteTitle} from "../components/layout";
import Alert from "../components/alert";
import Date from "../components/date";
import utilStyles from '../styles/utils.module.scss';

export const getStaticProps:GetStaticProps = async () => {
    return {
        props: {
            allPostsData: getSortedPostsData(),
        },
    };
};

// export しないのですべて PageProps でよい
type PageProps = {
    allPostsData: PostData[],
}
// 全体的に ReactNode を返す関数は、返り値型からの型推論があまり
// 役に立たないし、JSX だから一目瞭然ということで返り値を省略する。
export default function HomePage({allPostsData}: PageProps) {
    return <Layout home={true}>
        <Head>
            <title>{siteTitle}</title>
        </Head>
        <section className="text-lg leading-6">
            <p>[Your Self Introduction]</p>
            <p>
                (This is a sample website - you’ll be building a site like this on{' '}
                <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
            </p>
        </section>
        <section>
            <Alert type="success">
                Test component state
            </Alert>
        </section>
        <section className="text-lg leading-6 pt-px">
            <h2 className="text-2xl leading-6 my-4">Blog</h2>
            <PostList allPostsData={allPostsData}/>
        </section>
    </Layout>;
}

/////////////////////////////////////////////////////////////////////////////////
// ただの関数でもよいがブラウザの開発ツールで識別できるので
// 比較的フラットなデータ構造になるまでローカルな関数名あり
// コンポーネントにしておく

function PostList({allPostsData}:PageProps) {
    return <ul className={utilStyles.list}>
        {allPostsData.map(postData => <PostListItem item={postData} key={postData.id}/>)}
    </ul>;
}

type PostListItemProps = {
    item: PostData,
    key: string,  // 反復コンポーネントに key がないと warning になるよ
};
function PostListItem({item, key}:PostListItemProps) {
    const {id, title, date} = item;
    return <li className={utilStyles.listItem} key={key}>
        <Link href={`/posts/${id}`}>
            <a className="text-blue-500 hover:underline">{title}</a>
        </Link>
        <br/>
        <small className={utilStyles.lightText}>
            <Date dateString={date}/>
        </small>
    </li>;
}
