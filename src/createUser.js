import useFetch from './useFetch';

export default function CreateUser(url) {
  const { data, loading, error } = useFetch(url);
  if (loading) return <h1> Loading ...</h1>;
  if (error) return console.log(error);

  return (
    <div className='user'>
      <p>
        <img src={data?.avatar_url} alt={data?.name} />
      </p>
      <p>Login: {data?.login}</p>
      <p>
        GitHub Profile:{' '}
        <a href={data?.html_url} target='_blank'>
          {data?.login}
        </a>
      </p>
    </div>
  );
}
