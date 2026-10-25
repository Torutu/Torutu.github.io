import { JSX } from "react";

export interface ProjectData {
  id: string;
  name: string;
  description: string;
  badges: (string | JSX.Element)[];
  tag?: string;
}

export interface TimelineEntry {
  title: string;
  org: string;
  place?: string;
  period: string;
  points?: string[];
  note?: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}
