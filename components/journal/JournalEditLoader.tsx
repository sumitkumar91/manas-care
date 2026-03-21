"use client";

import { useEffect, useState } from "react";
import { decryptJournal } from "@/lib/encryption/journal-crypto";
import { FreeJournalEditor } from "./FreeJournalEditor";

interface Props {
  entryId: string;
  title: string | null;
  contentEncrypted: string;
  contentIv: string;
  userId: string;
}

export function JournalEditLoader({ entryId, title, contentEncrypted, contentIv, userId }: Props) {
  const [decrypted, setDecrypted] = useState<string | null>(null);

  useEffect(() => {
    decryptJournal(contentEncrypted, contentIv, userId)
      .then(setDecrypted)
      .catch(() => setDecrypted(""));
  }, [contentEncrypted, contentIv, userId]);

  if (decrypted === null) {
    return <p className="text-sm text-muted-foreground animate-pulse">Decrypting…</p>;
  }

  return (
    <FreeJournalEditor
      userId={userId}
      existing={{ id: entryId, title: title ?? "", content: decrypted }}
    />
  );
}
