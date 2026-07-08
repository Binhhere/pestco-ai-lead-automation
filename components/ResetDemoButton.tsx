"use client";

import { useState } from "react";
import { Button } from "@astryxdesign/core/Button";

type Props = {
  onReset: () => Promise<void>;
};

export function ResetDemoButton({ onReset }: Props) {
  const [isResetting, setIsResetting] = useState(false);

  async function handleReset() {
    setIsResetting(true);
    await onReset();
    setIsResetting(false);
  }

  return (
    <Button
      label="Reset demo data"
      variant="secondary"
      isLoading={isResetting}
      onClick={handleReset}
    />
  );
}
