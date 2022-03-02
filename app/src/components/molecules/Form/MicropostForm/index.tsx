import {makeStyles, Theme} from '@material-ui/core/styles';
import {Dispatch, SetStateAction, useState, useContext, useCallback} from 'react';
import {MicropostItem} from '@/interfaces/models/micropost';
import {AuthContext} from '@/pages/_app';
import {createMicropostParams} from '@/interfaces';
import {createMicropost} from '@/apis/microposts';
import {Card, CardContent, Box, Avatar, TextField, Button} from '@material-ui/core';
import ImageIcon from '@material-ui/icons/Image';

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    borderRadius: 0,
    maxHeight: 1000,
    maxWidth: 500,
  },
  avatar: {
    width: 40,
    height: 40,
    margin: theme.spacing(1),
  },
  contentBox: {
    flexDirection: 'column',
    width: '100%',
  },
  content: {
    border: 'none',
  },
  preview: {
    height: '100%',
    width: '100%',
  },
  toolBar: {
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(7),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    display: 'none',
  },
  imageUploadIcon: {
    cursor: 'pointer',
  },
  btn: {},
}));

type FormPropsType = {
  micropostList: MicropostItem[];
  setMicropostList: Dispatch<SetStateAction<MicropostItem[]>>;
};

interface CustomFormData extends FormData {
  append(name: keyof createMicropostParams, value: string | Blob, fileName?: string);
}

const MicropostForm = ({micropostList, setMicropostList}: FormPropsType) => {
  const classes = useStyles();
  const [content, setContent] = useState<string>('');
  const {isLoggedIn, currentUser} = useContext(AuthContext);
  const [image, setImage] = useState<File>();
  const [preview, setPreview] = useState<string>('');

  const handleChnageContent = (e) => {
    setContent(e.target.value);
  };

  const uploadImage = useCallback((e) => {
    const file = e.target.files[0];
    setImage(file);
  }, []);
  const previewImage = useCallback((e) => {
    const file = e.target.files[0];
    setPreview(window.URL.createObjectURL(file));
  }, []);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const formData = new FormData() as CustomFormData;
    formData.append('content', content);
    if (image) formData.append('image', image);

    try {
      const res = await createMicropost(formData);
      const micropost: MicropostItem = res.data.micropost;
      micropost.user = {id: currentUser.id, name: currentUser.name, image: currentUser.image};
      setContent('');
      setImage(undefined);
      setPreview('');
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
              <Box className={classes.content} display={'flex'}>
                <Avatar className={classes.avatar} src={currentUser.image.url} />
                <Box className={classes.contentBox} display={'flex'}>
                  <TextField
                    value={content}
                    multiline
                    rows={4}
                    fullWidth
                    margin="dense"
                    onChange={handleChnageContent}
                    placeholder="今日の目標を宣言しよう"
                    InputProps={{
                      disableUnderline: true,
                    }}
                  />
                  {preview ? <img className={classes.preview} src={preview} /> : <></>}
                </Box>
              </Box>
              <Box className={classes.toolBar} display={'flex'}>
                <label htmlFor="icon-button-file">
                  <input
                    accept="image/*"
                    className={classes.input}
                    id="icon-button-file"
                    type="file"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      uploadImage(e);
                      previewImage(e);
                    }}
                  />
                  <ImageIcon className={classes.imageUploadIcon} color="primary" fontSize="medium" />
                </label>
                <Button
                  type="submit"
                  variant="contained"
                  size="medium"
                  color="primary"
                  disabled={!content && !image ? true : false}
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
