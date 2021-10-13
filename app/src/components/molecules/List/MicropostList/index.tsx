import {makeStyles, Theme} from '@material-ui/core/styles';
import {MicropostItem} from '@/interfaces/models/micropost';
import {List, ListItem, ListItemAvatar, Avatar, ListItemText, Divider} from '@material-ui/core';
import Link from 'next/link';

const useStyles = makeStyles((theme: Theme) => ({
  list: {
    marginTop: theme.spacing(1),
    width: '100%',
    maxWidth: 500,
    backgroundColor: theme.palette.background.paper,
    border: '1px solid rgba(0, 0, 0, 0.12)',
  },
  inline: {
    display: 'inline',
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
                  <Avatar />
                </a>
              </Link>
            </ListItemAvatar>
            <ListItemText primary={micropost.user.name} secondary={micropost.content} className={classes.inline} />
          </ListItem>
          {micropostList.length != index + 1 && <Divider />}
        </>
      ))}
    </List>
  );
};

export default MicropostList;
