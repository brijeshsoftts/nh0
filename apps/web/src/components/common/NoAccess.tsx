export function NoAccess() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-20">
      <h1 className="text-3xl font-bold">No Access</h1>
      <p className="text-center text-muted-foreground/60">
        You do not have access to this page.
      </p>
    </div>
  );
}
