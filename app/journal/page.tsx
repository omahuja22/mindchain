"use client";

import { useState } from "react";

export default function JournalPage() {
  const [sentiment, setSentiment] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [journ, setJourn] = useState("");

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
        onClick={async () => {
          setIsLoading(true);

          await fetch("/api/completion", {
            method: "POST",
            body: JSON.stringify({
              prompt: "Messages during finals week.",
            }),
          }).then((response) => {
            response.json().then((json) => {
              setSentiment(json.sentiements);
              setIsLoading(false);
            });
          });
        }}
        disabled={!journ.trim()}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-2">
        Analyze Entry
      </button>

      {isLoading ? (
        "Loading..."
      ) : (
        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-medium mb-2">AI Analysis:</h3>
          <p className="text-gray-700">{JSON.stringify(sentiment)}</p>
        </div>
      )}
    </div>
  );
}
