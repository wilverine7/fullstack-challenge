import { useEffect, useState } from "react";

type Organization = {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
};

export default function OrganizationsPage() {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/")
      .then((res) => res.json())
      .then((data) => {
        setOrganizations(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch organizations:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Organizations</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="table-auto border border-gray-300 w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Created At</th>
              <th className="border px-4 py-2">Updated At</th>
            </tr>
          </thead>
          <tbody>
            {organizations.map((org) => (
              <tr key={org.id}>
                <td className="border px-4 py-2">{org.id}</td>
                <td className="border px-4 py-2">{org.name}</td>
                <td className="border px-4 py-2">
                  {new Date(org.created_at).toLocaleString()}
                </td>
                <td className="border px-4 py-2">
                  {new Date(org.updated_at).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
