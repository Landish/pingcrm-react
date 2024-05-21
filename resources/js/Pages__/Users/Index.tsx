import { Link, usePage } from '@inertiajs/react';
import Layout from '@/components/Layout';
import SearchFilter from '@/components/SearchFilter';
import Pagination from '@/components/Pagination';
import { PaginatedData, User } from '@/types';
import Table from '@/components/Table/Table';
import Icon from '@/components/Icon';

const Index = () => {
  const { users } = usePage<{ users: PaginatedData<User> }>().props;

  const {
    data,
    meta: { links }
  } = users;

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">Users</h1>
      <div className="flex items-center justify-between mb-6">
        <SearchFilter />
        <Link
          className="btn-indigo focus:outline-none"
          href={route('users.create')}
        >
          <span>Create</span>
          <span className="hidden md:inline"> User</span>
        </Link>
      </div>
      <Table
        columns={[
          {
            label: 'Name',
            name: 'name',

            renderCell: row => (
              <>
                {row.photo && (
                  <img
                    src={row.photo}
                    alt={row.name}
                    className="w-5 h-5 mr-2 rounded-full"
                  />
                )}
                <>{row.name}</>
                {row.deleted_at && (
                  <Icon
                    name="trash"
                    className="flex-shrink-0 w-3 h-3 ml-2 text-gray-400 fill-current"
                  />
                )}
              </>
            )
          },
          { label: 'Email', name: 'email' },
          {
            label: 'Role',
            name: 'owner',
            colSpan: 2,
            renderCell: row => (row.owner ? 'Owner' : 'User')
          }
        ]}
        rows={data}
        getRowDetailsUrl={row => route('users.edit', row.id)}
      />
      <Pagination links={links} />
    </div>
  );
};

/**
 * Persistent Layout (Inertia.js)
 *
 * [Learn more](https://inertiajs.com/pages#persistent-layouts)
 */
Index.layout = (page: React.ReactNode) => (
  <Layout title="Users" children={page} />
);

export default Index;