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
    </div>
  );
}

export default ResultsPage;
