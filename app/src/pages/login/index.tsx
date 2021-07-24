import {Template} from '@/components/templates/login';
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
