import { useMatches, useOutlet } from "react-router-dom";

import { PageTransition } from "@/components/common/PageTransition";

export function RouteTransitionLayout() {
  const matches = useMatches();
  const outlet = useOutlet();
  const layoutId = matches[1]?.id ?? "route-layout";

  return (
    <PageTransition animateOnMount={false} transitionKey={layoutId}>
      {outlet}
    </PageTransition>
  );
}
