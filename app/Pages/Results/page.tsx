import { useRouter } from "next/router";

function ResultsPage() {
  const router = useRouter();
  const { city, type } = router.query;

  return (
    <div>
      <h1>Search Results</h1>
      <p>
        Showing results for {type} in {city}.
      </p>
      {/* Render the results here based on the query */}
    </div>
  );
}

export default ResultsPage;
