import styles from './styles.module.css';
import {Header} from '@/components/organisms/Header';
import {Container, Grid} from '@material-ui/core';

export function Layout(props: {children?: React.ReactNode}) {
  return (
    <div className={styles.module}>
      <Header />
      <main>
        <Container maxWidth="xs">
          <Grid container justifyContent="center" direction="column">
            {props.children}
          </Grid>
        </Container>
      </main>
    </div>
  );
}
