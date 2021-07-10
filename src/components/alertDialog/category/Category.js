const Category = ({ category, setCategory }) => {
  return (
    <div className='modal__comment__container'>
      <label className='modal__category--heading' htmlFor='modal__category'>
        Category
      </label>
      <p style={{ margin: '6px 0' }}></p>
      <input
        className='modal__category'
        type='text'
        id='modal__category'
        placeholder='Add task category'
        value={category}
        onChange={(event) => setCategory(event.target.value)}
      />
    </div>
  );
};

export default Category;
