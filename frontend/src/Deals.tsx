import { useEffect, useState } from "react";

type Deal = {
  id: number;
  account_id: number;
  start_date: string;
  end_date: string;
  value: number;
  status: string;
};

export default function DealsPage() {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [totalValue, setTotalValue] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(`http://localhost:3000/api/deals`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setDeals(data.deals);
        setTotalValue(data.totalValue);
      })
      .catch((err) => {
        setError(err.message || "Failed to fetch deals");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-500">Error: {error}</div>;
  if (deals.length === 0) return <div className="p-6">No deals found</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Deals</h1>
      <p className="mb-4 font-semibold">
        Total Value: ${totalValue.toLocaleString("en-US")}
      </p>

      <table className="table-auto border border-gray-300 w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Start</th>
            <th className="border px-4 py-2">End</th>
            <th className="border px-4 py-2">Value</th>
            <th className="border px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {deals.map((deal) => (
            <tr key={deal.id}>
              <td className="border px-4 py-2">{deal.id}</td>
              <td className="border px-4 py-2">
                {new Date(deal.start_date).toLocaleDateString()}
              </td>
              <td className="border px-4 py-2">
                {new Date(deal.end_date).toLocaleDateString()}
              </td>
              <td className="border px-4 py-2">
                ${deal.value.toLocaleString("en-US")}
              </td>
              <td className="border px-4 py-2">{deal.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
