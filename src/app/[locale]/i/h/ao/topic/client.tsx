"use client";

import React from "react";
import { TTopicComplete } from "@/dto/Islam/Hadith/ArabicOnly";
import TopicView from "@/app/[locale]/i/h/ao/topic/main";

const Client: React.FC<{ topic: TTopicComplete }> = ({ topic }) => <TopicView topic={topic} />;

export default Client;
