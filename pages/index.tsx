import Head from 'next/head';
import Link from "next/link";

import 'tailwindcss/tailwind.css';

import Layout, {siteTitle} from "../components/layout";
import Date from '../components/date';
import utilStyles from '../styles/utils.module.scss';

import {getSortedPostsData, PostData} from '../lib/posts';
import Alert from "../components/alert";
import {Component} from "react";

type HomeProps = {
    allPostsData: PostData[],
}

export const getStaticProps = async () => {
    return {
        props: {
            allPostsData: getSortedPostsData(),
        }
    }
}

export default class Home extends Component<HomeProps> {
    render() {
        const {allPostsData} = this.props;
        return <Layout home>
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
                <Alert type={"success"}>
                    Test component state
                </Alert>
            </section>
            <section className="text-lg leading-6 pt-px">
                <h2 className="text-2xl leading-6 my-4 mx-0">Blog</h2>
                <ul className={utilStyles.list}>
                    {allPostsData.map(({id, date, title}) => <li className={utilStyles.listItem} key={id}>
                        <Link href={`/posts/${id}`}>
                            <a className="text-blue-500 hover:underline">{title}</a>
                        </Link>
                        <br />
                        <small className={utilStyles.lightText}>
                            <Date dateString={date} />
                        </small>
                    </li>)}
                </ul>
            </section>
        </Layout>
    }
}
