import PromptCard from "./PromptCard";

const Profile = ({ name, desc, data, handleEdit, openDeleteDialog , handleDelete }) => {
  return (
    <section className='w-full'>
      <h1 className='text-left head_text'>
        <span className='blue_gradient'>{name} Profile</span>
      </h1>
      <p className='text-left desc'>{desc}</p>

      <div className='mt-10 prompt_layout'>
        {data.map((post) => (
          <PromptCard
            key={post._id}
            post={post}
            handleEdit={() => handleEdit && handleEdit(post)}
            openDeleteDialog={() => openDeleteDialog &&  openDeleteDialog(post)}
          />
        ))}
      </div>
    </section>
  );
};

export default Profile;