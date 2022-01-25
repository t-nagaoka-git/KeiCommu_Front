import {User} from '@/interfaces/models/user';
import UsersList from '@/components/molecules/List/UserList';

type TemplatePropsType = {
  users: User[];
};

export function Template({users}: TemplatePropsType) {
  return <>{0 < users.length && <UsersList usersList={users} />}</>;
}
