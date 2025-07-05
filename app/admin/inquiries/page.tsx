"use client";
import { useEffect, useState } from "react";

interface Inquiry {
  _id: string;
  name: string;
  mobile: string;
  message: string;
  createdAt: string;
}

interface Pagination {
  currentPage: number;
  totalPages: number;
  total: number;
  hasNext: boolean;
  hasPrev: boolean;
}

const PAGE_SIZE = 10;

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/inquiries?page=${page}&limit=${PAGE_SIZE}`)
      .then((res) => res.json())
      .then((data) => {
        setInquiries(data.inquiries || []);
        setPagination(data.pagination || null);
        setLoading(false);
      });
  }, [page]);

  return (
    <div className="max-w-5xl mx-auto py-12 px-2 sm:px-4">
      <h1 className="text-3xl font-serif font-bold mb-8 text-center">View Inquiries</h1>
      <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-8">
        {loading ? (
          <div>Loading...</div>
        ) : inquiries.length === 0 ? (
          <div className="text-secondary-600">No inquiries found.</div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full rounded-lg">
                <thead className="bg-secondary-50 sticky top-0 z-10">
                  <tr>
                    <th className="py-3 px-4 border-b text-left font-semibold">Name</th>
                    <th className="py-3 px-4 border-b text-left font-semibold">Mobile</th>
                    <th className="py-3 px-4 border-b text-left font-semibold">Message</th>
                    <th className="py-3 px-4 border-b text-left font-semibold">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {inquiries.map((inq, idx) => (
                    <tr
                      key={inq._id}
                      className={
                        idx % 2 === 0
                          ? "bg-white hover:bg-primary-50 transition"
                          : "bg-secondary-50 hover:bg-primary-50 transition"
                      }
                    >
                      <td className="py-3 px-4 border-b align-top">{inq.name}</td>
                      <td className="py-3 px-4 border-b align-top">{inq.mobile}</td>
                      <td className="py-3 px-4 border-b align-top max-w-xs truncate" title={inq.message}>{inq.message}</td>
                      <td className="py-3 px-4 border-b align-top whitespace-nowrap">{new Date(inq.createdAt).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Pagination Controls */}
            {pagination && pagination.totalPages > 1 && (
              <div className="mt-8 flex justify-center items-center space-x-2">
                <button
                  onClick={() => setPage(page - 1)}
                  disabled={!pagination.hasPrev}
                  className="px-3 py-2 rounded-lg border border-secondary-300 hover:bg-secondary-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => setPage(pageNum)}
                    className={`px-3 py-2 rounded-lg border transition-colors duration-200 ${
                      pageNum === page
                        ? 'bg-primary-600 text-white border-primary-600'
                        : 'border-secondary-300 text-secondary-700 hover:bg-secondary-50'
                    }`}
                  >
                    {pageNum}
                  </button>
                ))}
                <button
                  onClick={() => setPage(page + 1)}
                  disabled={!pagination.hasNext}
                  className="px-3 py-2 rounded-lg border border-secondary-300 hover:bg-secondary-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
} 