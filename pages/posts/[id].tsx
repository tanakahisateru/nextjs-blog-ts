import {getAllPostIds, getPostData, PostData} from '../../lib/posts';

import {GetStaticPaths, GetStaticProps, GetStaticPropsContext} from "next";
import Head from 'next/head';
import Layout from "../../components/layout";
import Date from "../../components/date";
import utilStyles from '../../styles/utils.module.scss';

export const getStaticPaths:GetStaticPaths = async () => {
    // GetStaticPaths 型であることで return の内容に型ヒントが使える
    return {
        paths: getAllPostIds().map(id => ({
            params: {
                id: id,
            },
        })),
        fallback: false,
    };
};

// export しないので共通して PageContext でよい
type PageContext = GetStaticPropsContext<{
    id: string,
}>
export const getStaticProps:GetStaticProps = async ({params: {id}}: PageContext) => {
    // GetStaticProps 型であることで return の内容に型ヒントが使える
    return {
        props: {
            postData: await getPostData(id),
        },
    };
};

// export しないので共通して PageProps でよい
type PageProps = {
    postData: PostData,
}
export default function PostPage({postData}: PageProps) {
    return <Layout>
        <Head>
            <title>{postData.title}</title>
        </Head>
        <article>
            <h1 className="text-3xl leading-6 font-extrabold tracking-tighter my-4 mx-0">{postData.title}</h1>
            <div className={utilStyles.lightText}>
                <Date dateString={postData.date}/>
            </div>
            <div dangerouslySetInnerHTML={{__html: postData.contentHtml}}/>
        </article>
    </Layout>;
}

// React.FC<PageProps> 型の関数とした場合、PropsWithChildren を
// 考慮してくれるのはいいんだけど、
//    const Hoge:FC<HogeProps> = ({fuga, children}) => {
// と書いたとき、IntelliJ がめちゃくちゃ長い型ヒントを表示して右にはみ出すうえ
// export default と関数自体の型宣言がひとつの行で書けないから、
// 引数型を明示的に指定した function 定義にする。
