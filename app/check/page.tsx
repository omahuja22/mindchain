"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

interface Question {
  id: number;
  text: string;
  options: string[];
}

const questions: Question[] = [
  {
    id: 1,
    text: "How have you been feeling emotionally over the past week?",
    options: ["Very good", "Good", "Neutral", "Not so good", "Very poor"],
  },
  {
    id: 2,
    text: "How would you rate your sleep quality?",
    options: ["Excellent", "Good", "Fair", "Poor", "Very poor"],
  },
  {
    id: 3,
    text: "How often have you felt stressed or anxious lately?",
    options: ["Never", "Rarely", "Sometimes", "Often", "Very often"],
  },
  {
    id: 4,
    text: "How would you rate your energy levels?",
    options: ["Very high", "High", "Moderate", "Low", "Very low"],
  },
];

export default function CheckPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResults(false);
  };

  const calculateResult = () => {
    let score = 0;
    answers.forEach((answer, index) => {
      const options = questions[index].options;
      // Calculate score based on answer position (reverse for negative questions)
      if (index === 2) {
        // For stress/anxiety question, reverse scoring
        score += 4 - options.indexOf(answer);
      } else {
        score += options.indexOf(answer);
      }
    });

    // Maximum possible score is 16 (4 questions × 4 points)
    if (score <= 4) {
      return {
        status: "Excellent",
        message:
          "Your responses suggest you're doing well! Keep maintaining your healthy habits and positive mindset.",
        color: "text-green-600",
      };
    } else if (score <= 8) {
      return {
        status: "Good",
        message:
          "You're doing okay, but there might be some areas where you could use some self-care and attention.",
        color: "text-blue-600",
      };
    } else if (score <= 12) {
      return {
        status: "Fair",
        message:
          "Your responses indicate you might be experiencing some challenges. Consider talking to friends, family, or a counselor about how you're feeling.",
        color: "text-yellow-600",
      };
    } else {
      return {
        status: "Concerning",
        message:
          "Your responses suggest you might be going through a difficult time. We strongly recommend reaching out to a mental health professional for support.",
        color: "text-red-600",
      };
    }
  };

  if (showResults) {
    const result = calculateResult();
    return (
      <div className="max-w-2xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-4">
          Mental Health Check-in Results
        </h2>
        <div className="mb-6 p-4 border rounded-lg">
          <h3 className={`text-xl font-semibold mb-2 ${result.color}`}>
            Status: {result.status}
          </h3>
          <p className="mb-4">{result.message}</p>
          <div className="mb-4">
            <h4 className="font-semibold mb-2">Your responses:</h4>
            {questions.map((question, index) => (
              <div key={question.id} className="mb-2">
                <p className="font-medium">{question.text}</p>
                <p className="text-muted-foreground">
                  Your answer: {answers[index]}
                </p>
              </div>
            ))}
          </div>
          <div className="bg-primary-foreground p-4 rounded-lg mt-4">
            <p className="text-sm text-primary">
              <strong>Important Note:</strong> This assessment is not a
              diagnostic tool. If you're experiencing persistent mental health
              concerns, please reach out to:
            </p>
            <ul className="list-disc ml-6 mt-2 text-sm text-muted-foreground">
              <li>Your local mental health professional</li>
              <li>National Crisis Hotline: 988</li>
              <li>Your primary care physician</li>
            </ul>
          </div>
        </div>
        <Button onClick={resetQuiz} variant={"outline"}>
          Take Again
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Mental Health Check-in</h1>
      <div className="mb-8">
        <h2 className="text-xl mb-4">{questions[currentQuestion].text}</h2>
        <div className="space-y-2">
          {questions[currentQuestion].options.map((option) => (
            <button
              key={option}
              onClick={() => handleAnswer(option)}
              className="w-full text-left p-3 border rounded hover:bg-accent transition-colors">
              {option}
            </button>
          ))}
        </div>
        <div className="mt-4 text-sm text-gray-500">
          Question {currentQuestion + 1} of {questions.length}
        </div>
      </div>
    </div>
  );
}
