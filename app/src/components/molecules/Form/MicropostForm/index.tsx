import {makeStyles, Theme} from '@material-ui/core/styles';
import {Dispatch, SetStateAction, useState, useContext} from 'react';
import {MicropostItem} from '@/interfaces/models/micropost';
import {AuthContext} from '@/pages/_app';
import {createMicropostParams} from '@/interfaces';
import {createMicropost} from '@/apis/microposts';
import {Card, CardContent, Box, Avatar, TextField, Button} from '@material-ui/core';
import ImageIcon from '@material-ui/icons/Image';

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    borderRadius: 0,
    maxWidth: 500,
  },
  avatar: {
    width: 40,
    height: 40,
    margin: theme.spacing(1),
  },
  toolBar: {
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(7),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  image: {
    cursor: 'pointer',
  },
  btn: {},
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
              <Box display={'flex'}>
                <Avatar className={classes.avatar} src={currentUser.image.url} />
                <TextField
                  value={content}
                  multiline
                  rows={4}
                  fullWidth
                  margin="dense"
                  onChange={handleChnageContent}
                  placeholder="今日の目標を宣言しよう"
                />
              </Box>
              <Box className={classes.toolBar} display={'flex'}>
                <ImageIcon className={classes.image} color="primary" fontSize="medium" />
                <Button
                  type="submit"
                  variant="contained"
                  size="medium"
                  color="primary"
                  disabled={!content ? true : false}
                  className={classes.btn}
                  onClick={handleSubmit}
                >
                  つぶやく
                </Button>
              </Box>
            </form>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default MicropostForm;
