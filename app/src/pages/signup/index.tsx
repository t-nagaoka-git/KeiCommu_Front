import {GetStaticProps} from 'next';
import {Template} from '@/components/templates/signup';

export const getStaticProps: GetStaticProps = async () => {
  return {props: {}};
};

export default function Page() {
  return (
    <>
      <Template />
    </>
  );
}
