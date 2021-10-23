import {makeStyles, Theme} from '@material-ui/core/styles';
import {Dispatch, SetStateAction, useState, useContext} from 'react';
import {MicropostItem} from '@/interfaces/models/micropost';
import {AuthContext} from '@/pages/_app';
import {createMicropostParams} from '@/interfaces';
import {createMicropost} from '@/apis/microposts';
import {Card, CardContent, TextField, Button} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    borderRadius: 0,
    padding: theme.spacing(2),
    maxWidth: 500,
  },
  btn: {
    marginTop: theme.spacing(1),
  },
}));

type FormPropsType = {
  micropostList: MicropostItem[];
  setMicropostList: Dispatch<SetStateAction<MicropostItem[]>>;
};

const MicropostForm = ({micropostList, setMicropostList}: FormPropsType) => {
  const classes = useStyles();
  const [content, setContent] = useState<string>('');
  const {isLoggedIn, currentUser} = useContext(AuthContext);

  const handleChnageContent = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const params: createMicropostParams = {
      content: content,
    };

    try {
      const res = await createMicropost(params);
      const micropost: MicropostItem = res.data.micropost;
      micropost.user = {id: currentUser.id, name: currentUser.name, image: currentUser.image};
      setContent('');
      setMicropostList([res.data.micropost, ...micropostList]);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {isLoggedIn && currentUser && (
        <Card className={classes.card} variant="outlined">
          <CardContent>
            <form noValidate autoComplete="off">
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
            </form>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default MicropostForm;
