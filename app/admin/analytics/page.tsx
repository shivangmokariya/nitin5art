"use client";
import { useEffect, useState } from "react";

interface IpStat {
  _id: string;
  count: number;
  lastVisit: string;
}

export default function AnalyticsPage() {
  const [stats, setStats] = useState<{
    today: number;
    month: number;
    year: number;
    ipStats: IpStat[];
  } | null>(null);
  const [inquiryStats, setInquiryStats] = useState<{
    today: number;
    month: number;
    year: number;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/admin/visits").then((res) => res.json()),
      fetch("/api/admin/inquiries").then((res) => res.json()),
    ]).then(([visitData, inquiryData]) => {
      setStats(visitData);
      setInquiryStats(inquiryData);
      setLoading(false);
    });
  }, []);

  return (
    <div className="max-w-5xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-serif font-bold mb-8">Site Analytics</h1>
      {loading ? (
        <div>Loading...</div>
      ) : stats && inquiryStats ? (
        <>
          <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <div className="text-2xl font-bold">{stats.today}</div>
              <div className="text-secondary-600">Visits Today</div>
            </div>
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <div className="text-2xl font-bold">{stats.month}</div>
              <div className="text-secondary-600">Visits This Month</div>
            </div>
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <div className="text-2xl font-bold">{stats.year}</div>
              <div className="text-secondary-600">Visits This Year</div>
            </div>
          </div>
          <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <div className="text-2xl font-bold">{inquiryStats.today}</div>
              <div className="text-secondary-600">Inquiries Today</div>
            </div>
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <div className="text-2xl font-bold">{inquiryStats.month}</div>
              <div className="text-secondary-600">Inquiries This Month</div>
            </div>
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <div className="text-2xl font-bold">{inquiryStats.year}</div>
              <div className="text-secondary-600">Inquiries This Year</div>
            </div>
          </div>
          <h2 className="text-xl font-semibold mb-4 mt-8">Unique IPs (last 1000)</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg shadow">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b text-left">IP Address</th>
                  <th className="py-2 px-4 border-b text-left">Visit Count</th>
                  <th className="py-2 px-4 border-b text-left">Last Visit</th>
                </tr>
              </thead>
              <tbody>
                {stats.ipStats.map((ip) => (
                  <tr key={ip._id}>
                    <td className="py-2 px-4 border-b font-mono">{ip._id}</td>
                    <td className="py-2 px-4 border-b">{ip.count}</td>
                    <td className="py-2 px-4 border-b">{new Date(ip.lastVisit).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <div>No data available.</div>
      )}
    </div>
  );
} 