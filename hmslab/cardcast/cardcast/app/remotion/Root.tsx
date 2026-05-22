import React from "react";
import { Composition } from "remotion";
import { CardAnimation } from "./CardAnimation";

export function Root() {
  return (
    <Composition
      id="CardAnim"
      component={CardAnimation as unknown as React.ComponentType<Record<string, unknown>>}
      durationInFrames={150}
      fps={30}
      width={1080}
      height={1080}
      defaultProps={{
        card: { index: 1, type: "text", emoji: "📌", title: "제목", body: "본문", accent: "#e53e3e" },
        total: 1,
        author: "@kim_hyeong_mo",
      }}
    />
  );
}
