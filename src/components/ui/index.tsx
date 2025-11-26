// Skeleton loader component for better loading states
export function ProductCardSkeleton() {
  return (
    <div className="group relative animate-pulse">
      <div className="aspect-square w-full overflow-hidden rounded-2xl bg-gradient-to-br from-gaming-800/50 to-gaming-900/50 border border-white/10">
        <div className="h-full w-full bg-gradient-to-br from-gaming-700/30 to-gaming-800/30"></div>
      </div>
      <div className="mt-4 space-y-3">
        <div className="h-4 bg-gaming-700/50 rounded w-3/4"></div>
        <div className="h-3 bg-gaming-700/40 rounded w-1/2"></div>
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function ProductDetailSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="grid gap-8 md:grid-cols-2">
        {/* Image skeleton */}
        <div className="aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-gaming-800/50 to-gaming-900/50 border border-white/10">
          <div className="h-full w-full bg-gradient-to-br from-gaming-700/30 to-gaming-800/30"></div>
        </div>
        
        {/* Content skeleton */}
        <div className="space-y-6">
          <div className="space-y-3">
            <div className="h-8 bg-gaming-700/50 rounded w-3/4"></div>
            <div className="h-6 bg-gaming-700/40 rounded w-1/4"></div>
          </div>
          
          <div className="space-y-2">
            <div className="h-4 bg-gaming-700/30 rounded w-full"></div>
            <div className="h-4 bg-gaming-700/30 rounded w-full"></div>
            <div className="h-4 bg-gaming-700/30 rounded w-2/3"></div>
          </div>
          
          <div className="h-12 bg-gaming-700/50 rounded-lg w-full"></div>
        </div>
      </div>
    </div>
  );
}

// Modern button component
export function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}) {
  const baseClasses = "inline-flex items-center justify-center font-medium transition-all duration-300 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-gaming-900 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-gradient-to-r from-accent-primary to-accent-secondary text-white shadow-lg hover:shadow-neon-purple hover:scale-[1.02] active:scale-[0.98]",
    secondary: "bg-gaming-800/50 backdrop-blur-sm text-white border border-accent-secondary/30 hover:border-accent-secondary hover:shadow-neon-purple",
    outline: "bg-transparent border-2 border-accent-primary/50 text-white hover:bg-accent-primary/10 hover:border-accent-primary",
    ghost: "bg-transparent text-white hover:bg-white/10",
  };
  
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };
  
  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

// Badge component for tags
export function Badge({
  children,
  variant = "default",
  className = "",
}: {
  children: React.ReactNode;
  variant?: "default" | "success" | "warning" | "error" | "info";
  className?: string;
}) {
  const variants = {
    default: "bg-gaming-800/60 text-accent-secondary border-accent-secondary/30",
    success: "bg-accent-green/20 text-accent-green border-accent-green/30",
    warning: "bg-accent-yellow/20 text-accent-yellow border-accent-yellow/30",
    error: "bg-accent-red/20 text-accent-red border-accent-red/30",
    info: "bg-accent-primary/20 text-accent-secondary border-accent-secondary/30",
  };
  
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium border backdrop-blur-sm ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}

// Card component
export function Card({
  children,
  className = "",
  hover = true,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  hover?: boolean;
}) {
  return (
    <div
      className={`glass-card p-6 ${hover ? "hover:border-accent-primary/50 transition-all duration-300 hover:shadow-neon" : ""} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

// Input component
export function Input({
  className = "",
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={`w-full rounded-lg bg-gaming-800/50 border border-accent-primary/30 px-4 py-3 text-white placeholder-gaming-400 backdrop-blur-sm transition-all duration-300 focus:border-accent-primary focus:ring-2 focus:ring-accent-primary/20 focus:outline-none ${className}`}
      {...props}
    />
  );
}

// Textarea component
export function Textarea({
  className = "",
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={`w-full rounded-lg bg-gaming-800/50 border border-accent-primary/30 px-4 py-3 text-white placeholder-gaming-400 backdrop-blur-sm transition-all duration-300 focus:border-accent-primary focus:ring-2 focus:ring-accent-primary/20 focus:outline-none resize-none ${className}`}
      {...props}
    />
  );
}
