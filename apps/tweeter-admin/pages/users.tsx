import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAuthContext, useUsersQuery, useDeleteUserMutation } from '@infoshare-f3/data-providers'
import { UserCard } from '@infoshare-f3/shared-ui'

const Users = () => {
  const router = useRouter()
  const { isAuthenticated } = useAuthContext()
  const { data } = useUsersQuery()
  const deleteUserMutation = useDeleteUserMutation()

  const users = data?.data?.users ?? [];

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/sign-in')
    }
  }, [isAuthenticated, router])

  return <div className="grid grid-cols-3 gap-4 max-w-5xl m-auto">
    {/* <Button title='elo'/> */}
    {users.map((user, index) => {
      return <UserCard key={user.id} user={user} onPress={() => {
        deleteUserMutation.mutate(user.id)
      }} />
    })}
  </div>;
};

export default Users;
