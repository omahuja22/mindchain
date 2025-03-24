"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Calendar, TrendingUp, Award, Clock } from "lucide-react"
import { format, subDays } from "date-fns"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { MoodChart } from "@/components/mood-chart"
import { ProgressChart } from "@/components/progress-chart"

export default function DashboardPage() {
  const [streak] = useState(7)
  const [completedSessions] = useState(12)
  const [totalMinutes] = useState(540)
  const [nextSession] = useState(subDays(new Date(), -2))

  return (
    <div className="container py-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Your Dashboard</h1>
            <p className="text-muted-foreground mt-1">Track your progress and mental health journey</p>
          </div>
          <Button>
            <Calendar className="mr-2 h-4 w-4" />
            Schedule Session
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{streak} days</div>
              <p className="text-xs text-muted-foreground">+2 from last week</p>
              <div className="mt-3">
                <Progress value={70} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Sessions Completed</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{completedSessions}</div>
              <p className="text-xs text-muted-foreground">+3 from last month</p>
              <div className="mt-3">
                <Progress value={60} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Minutes</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalMinutes}</div>
              <p className="text-xs text-muted-foreground">+90 from last month</p>
              <div className="mt-3">
                <Progress value={54} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Next Session</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{format(nextSession, "MMM d")}</div>
              <p className="text-xs text-muted-foreground">{format(nextSession, "EEEE, h:mm a")}</p>
              <div className="mt-3 flex gap-2">
                <Badge variant="outline" className="bg-primary/10">
                  Dr. Thompson
                </Badge>
                <Badge variant="outline" className="bg-primary/10">
                  45 min
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="mood" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="mood">Mood Tracking</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
          </TabsList>

          <TabsContent value="mood">
            <Card>
              <CardHeader>
                <CardTitle>Mood Tracking</CardTitle>
                <CardDescription>Your mood patterns over the past 30 days</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <MoodChart />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="progress">
            <Card>
              <CardHeader>
                <CardTitle>Progress Tracking</CardTitle>
                <CardDescription>Your progress in different areas over time</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <ProgressChart />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  )
}

