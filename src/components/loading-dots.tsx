import clsx from "clsx";

const LoadingDots = ({ className = "" }: { className?: string }) => {
  return (
    <span className={`inline-flex items-center gap-1 ${className}`}>
      <span className="h-2 w-2 animate-bounce rounded-full bg-gradient-to-r from-accent-primary to-accent-secondary" style={{ animationDelay: '0s' }} />
      <span className="h-2 w-2 animate-bounce rounded-full bg-gradient-to-r from-accent-primary to-accent-secondary" style={{ animationDelay: '0.15s' }} />
      <span className="h-2 w-2 animate-bounce rounded-full bg-gradient-to-r from-accent-primary to-accent-secondary" style={{ animationDelay: '0.3s' }} />
    </span>
  );
};

export default LoadingDots;
