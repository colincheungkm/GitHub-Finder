function About() {
  return (
    <div>
      <h1 className="text-2xl mb-4">Github Finder</h1>
      <p className="mb-4 text-xl">
        A React app to search GitHub profiles and see profile details. This project is part of the React Front To Back
        Udemy course by Brad Traversy
      </p>
      <p className="text-lg">Layout by: Hassib Moddasser</p>

      <br />
      <br />

      <p className="mb-4 text-lg">This project will utilize the GitHub REST API</p>
      <p>
        REST API - <span className="font-bold">RE</span>presentational <span className="font-bold">S</span>tate{' '}
        <span className="font-bold">T</span>ransfer: A standardized software architecture style of a specific type of
        API
      </p>
    </div>
  );
}

export default About;
