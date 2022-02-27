import {makeStyles, Theme} from '@material-ui/core/styles';
import {MicropostItem} from '@/interfaces/models/micropost';
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
};

const MicropostList = ({micropostList}: ListPropsType) => {
  const classes = useStyles();

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
              <ListItemIcon className={classes.image}>
                <ThumbUpAltIcon color="action" fontSize="small" />
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
