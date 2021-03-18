import Head from 'next/head'
import Layout from "../../components/layout";
import {getAllPostIds, getPostData} from '../../lib/posts'
import Date from "../../components/date";
import utilStyles from '../../styles/utils.module.scss'

export async function getStaticPaths() {
    return {
        paths: getAllPostIds(),
        fallback: false
    }
}

export async function getStaticProps({params}) {
    return {
        props: {
            postData: await getPostData(params.id)
        }
    }
}

export default function Post({postData}) {
    return <Layout>
        {/* Add this <Head> tag */}
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
