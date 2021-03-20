import Head from 'next/head';
import Layout from "../../components/layout";
import {getAllPostIds, getPostData, PostData} from '../../lib/posts';
import Date from "../../components/date";
import utilStyles from '../../styles/utils.module.scss';
import {Component, FC} from "react";

type PostParams = {
    id: string,
}

type PostProps = {
    postData: PostData,
}

export const getStaticPaths = async () => {
    return {
        paths: getAllPostIds().map(id => {
            return {
                params: {
                    id: id,
                },
            };
        }),
        fallback: false,
    };
};

export const getStaticProps = async ({params}) => {
    const {id} = params as PostParams;
    return {
        props: {
            postData: await getPostData(id),
        },
    };
};

export default class Post extends Component<PostProps> {

    render() {
        const {postData} = this.props;
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
}
