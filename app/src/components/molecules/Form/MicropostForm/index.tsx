import {makeStyles, Theme} from '@material-ui/core/styles';
import {useState, useContext} from 'react';
import {AuthContext} from '@/pages/_app';
import {createMicropost} from '@/apis/microposts';
import {Card, CardContent, TextField, Button} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    padding: theme.spacing(2),
    maxWidth: 500,
  },
  btn: {
    marginTop: theme.spacing(1),
  },
}));

const MicropostForm = () => {
  const classes = useStyles();
  const [content, setContent] = useState<string>('');
  const {isLoggedIn, currentUser} = useContext(AuthContext);

  const handleChnageContent = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const params = {
      content: content,
    };

    try {
      const res = await createMicropost(currentUser.id, params);
      console.log(res);
      setContent('');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {isLoggedIn && currentUser && (
        <form noValidate autoComplete="off">
          <Card className={classes.card}>
            <CardContent>
              <TextField
                value={content}
                variant="outlined"
                multiline
                rows={4}
                fullWidth
                margin="dense"
                onChange={handleChnageContent}
              />
              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                color="primary"
                disabled={!content ? true : false}
                className={classes.btn}
                onClick={handleSubmit}
              >
                つぶやく
              </Button>
            </CardContent>
          </Card>
        </form>
      )}
    </>
  );
};

export default MicropostForm;
