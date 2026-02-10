"use client";

import { useState, useEffect } from "react";
import LoadingDots from "@/components/loading-dots";
import { ReviewDocument } from "@/lib/models/review";

export default function ReviewModerationManager() {
  const [pendingReviews, setPendingReviews] = useState<ReviewDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState<string | null>(null);

  useEffect(() => {
    fetchPendingReviews();
  }, []);

  const fetchPendingReviews = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/admin/reviews?action=pending");
      if (!response.ok) throw new Error("Failed to fetch pending reviews");
      const data = await response.json();
      setPendingReviews(data.reviews || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load pending reviews");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (reviewId: string, productId: string) => {
    if (!confirm("Aprobi această recenzie?")) return;

    setProcessing(reviewId);
    try {
      const response = await fetch("/api/admin/reviews", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reviewId,
          productId,
          updates: { status: "approved" },
        }),
      });

      if (!response.ok) throw new Error("Failed to approve review");

      // Remove from pending list
      setPendingReviews(prev => prev.filter(r => r.id !== reviewId));
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to approve review");
    } finally {
      setProcessing(null);
    }
  };

  const handleReject = async (reviewId: string, productId: string) => {
    if (!confirm("Respingi această recenzie? Aceasta va rămâne în baza de date ca respinsă.")) return;

    setProcessing(reviewId);
    try {
      const response = await fetch("/api/admin/reviews", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reviewId,
          productId,
          updates: { status: "rejected" },
        }),
      });

      if (!response.ok) throw new Error("Failed to reject review");

      // Remove from pending list
      setPendingReviews(prev => prev.filter(r => r.id !== reviewId));
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to reject review");
    } finally {
      setProcessing(null);
    }
  };

  const handleDelete = async (reviewId: string, productId: string) => {
    if (!confirm("Ștergi permanent această recenzie? Această acțiune nu poate fi anulată.")) return;

    setProcessing(reviewId);
    try {
      const response = await fetch(`/api/admin/reviews?productId=${productId}&reviewId=${reviewId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete review");

      // Remove from pending list
      setPendingReviews(prev => prev.filter(r => r.id !== reviewId));
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete review");
    } finally {
      setProcessing(null);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ro-RO', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <LoadingDots className="bg-white" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400">
          {error}
        </div>
      )}

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Recenzii În Așteptare</h2>
          <p className="text-white/60 text-sm mt-1">
            {pendingReviews.length} recenzie{pendingReviews.length !== 1 ? 'i' : ''} necesită aprobare
          </p>
        </div>
        <button
          onClick={fetchPendingReviews}
          className="px-4 py-2 bg-gaming-700 hover:bg-gaming-600 text-white rounded-lg transition-colors text-sm"
        >
          🔄 Reîmprospătează
        </button>
      </div>

      {pendingReviews.length === 0 ? (
        <div className="text-center py-12 bg-gaming-800/30 rounded-xl border border-white/5">
          <svg className="w-16 h-16 text-white/20 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-white/60">Nicio recenzie în așteptare!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {pendingReviews.map((review) => (
            <div
              key={review.id}
              className="bg-gaming-800/30 rounded-xl border border-white/10 p-6 space-y-4"
            >
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                          key={star}
                          className={`w-5 h-5 ${
                            star <= review.rating ? "text-yellow-400 fill-current" : "text-white/20"
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                          />
                        </svg>
                      ))}
                    </div>
                    <span className="text-white/40 text-sm">{formatDate(review.createdAt)}</span>
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-1">{review.title}</h3>
                  <p className="text-white/70 text-sm mb-3">{review.content}</p>
                  
                  <div className="flex items-center gap-4 text-sm">
                    <div className="text-white/60">
                      <span className="text-white/40">De:</span> <span className="text-white">{review.author.name}</span>
                    </div>
                    {review.author.email && (
                      <div className="text-white/60">
                        <span className="text-white/40">Email:</span> <span className="text-white">{review.author.email}</span>
                      </div>
                    )}
                    {review.productName && (
                      <div className="text-white/60">
                        <span className="text-white/40">Produs:</span> <span className="text-accent-secondary">{review.productName}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t border-white/5">
                <button
                  onClick={() => handleApprove(review.id, review.productId)}
                  disabled={processing === review.id}
                  className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-green-600/50 text-white rounded-lg transition-colors font-medium text-sm"
                >
                  {processing === review.id ? <LoadingDots className="bg-white" /> : "✓ Aprobă"}
                </button>
                <button
                  onClick={() => handleReject(review.id, review.productId)}
                  disabled={processing === review.id}
                  className="flex-1 px-4 py-2 bg-yellow-600 hover:bg-yellow-700 disabled:bg-yellow-600/50 text-white rounded-lg transition-colors font-medium text-sm"
                >
                  {processing === review.id ? <LoadingDots className="bg-white" /> : "⊘ Respinge"}
                </button>
                <button
                  onClick={() => handleDelete(review.id, review.productId)}
                  disabled={processing === review.id}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-red-600/50 text-white rounded-lg transition-colors font-medium text-sm"
                >
                  {processing === review.id ? <LoadingDots className="bg-white" /> : "🗑 Șterge"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
