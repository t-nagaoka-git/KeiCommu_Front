import React, {FC} from 'react';
import {GetStaticProps} from 'next';
import {postsIndex} from '@/apis/posts'

type Post = {
  id: number;
  title: string;
};

type Props = {
  posts: Post[];
};

const Home: FC<Props> = (props) => {
  console.log(props)
  return (
    <div>
      <h2>POSTの一覧</h2>
      <table>
        {/* {props.posts.map((post) => (
          <tr>
            <td>{post.id}.</td>
            <td>{post.title}</td>
          </tr>
        ))} */}
      </table>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const response = await postsIndex();
  console.log(response)
  // const json = await response.json();

  return {
    props: {
      posts: response,
    },
  };
};

export default Home;
