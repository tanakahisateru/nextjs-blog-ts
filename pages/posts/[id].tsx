import Head from 'next/head';
import Layout from "../../components/layout";
import {getAllPostIds, getPostData} from '../../lib/posts';
import Date from "../../components/date";
import utilStyles from '../../styles/utils.module.scss';
import {GetStaticPaths, GetStaticProps} from "next";
import {ParsedUrlQuery} from "querystring";

// noinspection JSUnusedGlobalSymbols
export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: getAllPostIds(),
        fallback: false,
    }
};

// noinspection JSUnusedGlobalSymbols
export const getStaticProps: GetStaticProps = async ({params}: ParsedUrlQuery|any) => {
    return {
        props: {
            postData: await getPostData(params.id),
        }
    }
};

// noinspection JSUnusedGlobalSymbols
export default function Post({postData}) {
    return <Layout home={false}>
        <Head>
            <title>{postData.title}</title>
        </Head>
        <article>
            <h1 className={utilStyles.headingXl}>{postData.title}</h1>
            <div className={utilStyles.lightText}>
                <Date dateString={postData.date} />
            </div>
            <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        </article>
    </Layout>
}
