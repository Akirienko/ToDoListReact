function ProfilePage() {
  const user = {
    name: 'John Doe',
    email: 'john@example.com',
    tasksCount: 5
  }

  return (
    <div className="profile-page">
      <h2>Profile</h2>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Tasks: {user.tasksCount}</p>
    </div>
  )
}

export default ProfilePage