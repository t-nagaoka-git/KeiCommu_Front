import styles from './styles.module.css';
import {Header} from '@/components/organisms/Header';
import {Container, Grid} from '@material-ui/core';

export function Layout(props: {children?: React.ReactNode}) {
  return (
    <div className={styles.module}>
      <header>
        <Header />
      </header>
      <main>
        <Container maxWidth="sm">
          <Grid container justifyContent="center">
            {props.children}
          </Grid>
        </Container>
      </main>
    </div>
  );
}
