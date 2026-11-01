type PageTransitionProps = {
  children: React.ReactNode;
};

export function PageTransition({ children }: PageTransitionProps) {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-200">
      {children}
    </div>
  );
}