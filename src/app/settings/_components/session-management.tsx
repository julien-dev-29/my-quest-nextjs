import { Session } from "better-auth";

function SessionManagement({
  sessions,
  currentSessionToken,
}: {
  sessions: Session[];
  currentSessionToken: string;
}) {
  const otherSessions = sessions.filter((s) => s.token !== currentSessionToken);
  const currentSession = sessions.find((s) => s.token === currentSessionToken);
  return null;
}

export default SessionManagement;
