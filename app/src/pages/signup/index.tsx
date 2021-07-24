import {Template} from '@/components/templates/signup';
import {GetStaticPropsContext, InferGetStaticPropsType} from 'next';

export const getStaticProps = async (context: GetStaticPropsContext) => {
  return {props: {}};
};

export default function Page() {
  return (
    <>
      <Template />
    </>
  );
}
