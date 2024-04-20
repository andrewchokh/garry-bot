import axios from "axios";

export class Reddit {
    url : string;
    timestamp: number;
    posts: Array<any>;

    constructor(subreddit: string, postHint: string) {
        this.url = `https://www.reddit.com/r/${subreddit}/hot/.json?count=100`;
        this.timestamp = Date.now();
        this.posts = [];

        this.fetch(postHint);

        setInterval(() => {
            this.fetch(postHint);
        }, 60000 * 5);
    }

    random() {
        return this.posts[Math.floor(Math.random() * this.posts.length)];
    }

    async fetch(postHint: string) {
        const query = await axios.get(this.url);

        this.posts = query.data.data.children
        .filter((post: any) => post.data.post_hint === postHint)
        .map((post: any) => {
            return {
                title: post.data.title,
                permalink: `https://reddit.com${post.data.permalink}`,
                url: post.data.url,
            };
        });

    }
}