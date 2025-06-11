interface ProgressBarProps {
  currentStep: number
  totalSteps: number
  stepTitles: string[]
}

export default function ProgressBar({ currentStep, totalSteps, stepTitles }: ProgressBarProps) {
  const progressPercentage = ((currentStep - 1) / (totalSteps - 1)) * 100 // Adjusted for better visual start/end

  return (
    <div className="w-full mt-4">
      <div className="relative h-2 bg-slate-200 rounded-full">
        <div
          className="absolute top-0 left-0 h-2 bg-blue-500 rounded-full transition-all duration-300 ease-in-out"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
      <div className="flex justify-between mt-1 text-xs text-slate-600">
        {stepTitles.map((title, index) => (
          <div
            key={index}
            className={`w-1/${totalSteps} text-center ${
              index + 1 === currentStep ? "font-bold text-blue-600" : ""
            } ${index + 1 < currentStep ? "text-blue-500" : ""}`}
          >
            {title}
          </div>
        ))}
      </div>
    </div>
  )
}
