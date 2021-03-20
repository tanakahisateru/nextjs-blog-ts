import fs from 'fs';
import path from 'path';
import grayMatter from 'gray-matter';
import remark from 'remark';
import remarkHtml from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'posts');

// 明確に名前付けできる独自の型は素朴に interface がよい。
// type だとエラー時に名前が使われず展開されやすいので。
export interface PostData {
    id: string,
    title: string,
    date: string,
    contentHtml?: string,
}

// ↑ 既存の型とジェネリクスで組み合わせしようとすると、すでに
// type だったりして interface として extends できない
// 場合がよくあるので、そういうのは type で。つまり React
// コンポーネントまわりが type でいくやつ。

export function getSortedPostsData(): PostData[] {
    // Get file names under /posts
    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames.map(fileName => {
        // Remove ".md" from file name to get id
        const id = fileName.replace(/\.md$/, '');

        // Read markdown file as string
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');

        // Use gray-grayMatter to parse the post metadata section
        const matterResult = grayMatter(fileContents);

        // Combine the data with the id
        return {
            id,
            ...matterResult.data,
        } as PostData;
    });
    // Sort posts by date
    return allPostsData.sort((a, b) => (a.date < b.date) ? 1 : -1);
}

export function getAllPostIds(): string[] {
    return fs.readdirSync(postsDirectory).map(fileName => {
        return fileName.replace(/\.md$/, '');
    });
}

export async function getPostData(id: string): Promise<PostData> {
    const fullPath = path.join(postsDirectory, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-grayMatter to parse the post metadata section
    const matterResult = grayMatter(fileContents);

    // Use remark to convert markdown into HTML string
    const processor = remark().use(remarkHtml);
    const processedContent = await processor.process(matterResult.content);
    const contentHtml = processedContent.toString();

    // Combine the data with the id
    return {
        id,
        contentHtml,
        ...matterResult.data,
    } as PostData;
}
