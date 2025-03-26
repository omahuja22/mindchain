"use client";

import { useState } from "react";

export default function JournalPage() {
  const [sentiment, setSentiment] = useState<{
    sentiment: string;
    confidence: number;
    keywords: string[];
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [journ, setJourn] = useState("");

  const analyzeEntry = async () => {
    if (!journ.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/completion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: journ,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to analyze entry");
      }

      const data = await response.json();
      setSentiment(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">MindScribe</h1>
          <p className="text-muted-foreground mt-1">
            Welcome to MindScribe, your personal space to reflect, express, and
            grow. 🌿 Everything you write here is secured with blockchain and
            analyzed by AI to provide insights for your mental well-being. No
            one else can see your entries - this is your safe space. What's on
            your mind today?
          </p>
        </div>
      </div>

      <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
        <span className="flex h-2 w-2 rounded-full bg-green-600"></span>
        <span className="font-medium">7 Day Streak! 🔥</span>
      </div>

      <label
        htmlFor="description"
        className="block text-lg font-medium text-muted-foreground">
        Today's Entry
      </label>
      <textarea
        id="description"
        value={journ}
        onChange={(e) => setJourn(e.target.value)}
        className="w-full h-48 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        placeholder="Write your thoughts here..."
      />

      <button
        onClick={analyzeEntry}
        disabled={!journ.trim() || isLoading}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-2">
        {isLoading ? (
          <>
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Analyzing...
          </>
        ) : (
          "Analyze Entry"
        )}
      </button>

      {error && (
        <div className="mt-4 p-4 bg-red-50 rounded-lg">
          <h3 className="font-medium text-red-700 mb-2">Error:</h3>
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {sentiment && !isLoading && !error && (
        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-medium mb-2">AI Analysis:</h3>
          <div className="space-y-2">
            <p className="text-gray-700">
              <span className="font-medium">Sentiment:</span>{" "}
              <span className="capitalize">{sentiment.sentiment}</span>
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Confidence:</span>{" "}
              {(sentiment.confidence * 100).toFixed(1)}%
            </p>
            {sentiment.keywords && sentiment.keywords.length > 0 && (
              <div>
                <span className="font-medium">Key Topics:</span>{" "}
                <div className="flex flex-wrap gap-2 mt-1">
                  {sentiment.keywords.map((keyword, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
