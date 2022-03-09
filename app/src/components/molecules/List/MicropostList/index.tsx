import {makeStyles, Theme} from '@material-ui/core/styles';
import {MicropostItem} from '@/interfaces/models/micropost';
import {Dispatch, SetStateAction} from 'react';
import {likeMicropostParams, unlikeMicropostParams} from '@/interfaces';
import {likeMicropost, unlikeMicropost} from '@/apis/microposts';
import {List, ListItem, Box, ListItemAvatar, Avatar, ListItemText, ListItemIcon, Divider} from '@material-ui/core';
import Link from 'next/link';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';

const useStyles = makeStyles((theme: Theme) => ({
  list: {
    marginTop: theme.spacing(1),
    width: '100%',
    maxWidth: 500,
    backgroundColor: theme.palette.background.paper,
    border: '1px solid rgba(0, 0, 0, 0.12)',
  },
  box: {
    flexDirection: 'column',
    width: '100%',
  },
  inline: {
    display: 'inline',
  },
  image: {
    cursor: 'pointer',
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(1),
  },
}));

type ListPropsType = {
  micropostList: MicropostItem[] | [];
  setMicropostList: Dispatch<SetStateAction<MicropostItem[]>>;
};

const MicropostList = ({micropostList, setMicropostList}: ListPropsType) => {
  const classes = useStyles();

  const handleLikeIconClick = async (micropostId: number, liked: boolean) => {
    try {
      if (liked) {
        const params: unlikeMicropostParams = {
          micropostId: micropostId,
        };
        await unlikeMicropost(params);
      } else {
        const params: likeMicropostParams = {
          micropostId: micropostId,
        };
        await likeMicropost(params);
      }

      setMicropostList(
        micropostList.map((micropost: MicropostItem) => {
          if (micropost.id == micropostId) micropost.liked = !liked;
          return micropost;
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <List className={classes.list}>
      {micropostList.map((micropost: MicropostItem, index: number) => (
        <>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Link href={`/users/${micropost.user.id}`}>
                <a>
                  <Avatar src={micropost.user.image.url} />
                </a>
              </Link>
            </ListItemAvatar>
            <Box className={classes.box} display={'flex'}>
              <ListItemText primary={micropost.user.name} secondary={micropost.content} className={classes.inline} />
              {micropost.image.url ? <img src={micropost.image.url} /> : <></>}
              <ListItemIcon
                className={classes.image}
                onClick={handleLikeIconClick.bind(this, micropost.id, micropost.liked)}
              >
                {micropost.liked ? (
                  <ThumbUpAltIcon color="primary" fontSize="small" />
                ) : (
                  <ThumbUpAltIcon color="action" fontSize="small" />
                )}
              </ListItemIcon>
            </Box>
          </ListItem>
          {micropostList.length != index + 1 && <Divider />}
        </>
      ))}
    </List>
  );
};

export default MicropostList;
