import React from 'react'

export const Features = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
            <div className="container space-y-12 px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                    <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">New Features</div>
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Faster iteration. More innovation.</h2>
                    <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    The platform for mastering typing skills. Focus on improving your speed and accuracy with real-time feedback, automated progress tracking, and engaging interactive exercises.
                    </p>
                </div>
                </div>
                <div className="mx-auto grid items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
                <div className="grid gap-1">
                    <h3 className="text-lg font-bold">Real-Time Typing Speed Tracking</h3>
                    <p className="text-sm text-muted-foreground">
                    Instantly measure your typing speed and accuracy as you play.
                    </p>
                </div>
                <div className="grid gap-1">
                    <h3 className="text-lg font-bold">Interactive Floating Keyboard</h3>
                    <p className="text-sm text-muted-foreground">
                    Enhance your typing precision by accurately clicking on a floating keyboard.
                    </p>
                </div>
                <div className="grid gap-1">
                    <h3 className="text-lg font-bold">Progress and Statistics</h3>
                    <p className="text-sm text-muted-foreground">
                    Monitor your improvement with detailed statistics and progress tracking.
                    </p>
                </div>
                <div className="grid gap-1">
                    <h3 className="text-lg font-bold">Global Leaderboard</h3>
                    <p className="text-sm text-muted-foreground">
                    Compete with players worldwide and see where you rank on the global leaderboard.
                    </p>
                </div>
                <div className="grid gap-1">
                    <h3 className="text-lg font-bold">Aim Training</h3>
                    <p className="text-sm text-muted-foreground">
                    Improve your typing and clicking accuracy with dedicated aim training exercises.
                    </p>
                </div>
                <div className="grid gap-1">
                    <h3 className="text-lg font-bold">Custom Challenges</h3>
                    <p className="text-sm text-muted-foreground">
                    Create and tackle custom typing challenges to push your skills to the next level.
                    </p>
                </div>
                </div>
            </div>
            </section>
  )
}
