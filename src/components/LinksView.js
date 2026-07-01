"use client";

import { motion } from "framer-motion";
import { Card, Separator, Chip } from "@heroui/react";
import { Link as LinkIcon, ExternalLink, BookOpen, ClipboardList, Calendar, Library, Globe, Cloud } from "lucide-react";
import { IMPORTANT_LINKS } from "./constants";

const ICON_MAP = {
  "UIU ELMS": BookOpen,
  "UIU UCAM": ClipboardList,
  "Exam Routine Portal": Calendar,
  "UIU Library": Library,
  "UIU Student Portal": Globe,
  "UIU UCAM Cloud": Cloud,
};

const CATEGORY_COLORS = {
  Academic: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  Administrative: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
  Updates: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
};

const CATEGORY_BG = {
  Academic: "from-blue-500 to-indigo-500",
  Administrative: "from-purple-500 to-violet-500",
  Updates: "from-amber-500 to-orange-500",
};

export default function LinksView() {
  return (
    <motion.main
      key="links-view"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="max-w-5xl mx-auto px-6"
    >
      <Card className="border border-border bg-surface/70 backdrop-blur-xl shadow-sm">
        <Card.Header className="px-6 pt-6 pb-2">
          <div className="flex items-center gap-2.5">
            <LinkIcon className="h-6 w-6 text-orange-500" />
            <div>
              <h2 className="text-xl font-black text-foreground">Links for UIU Students</h2>
              <p className="text-xs text-muted mt-0.5">Quick access to essential United International University portals and student resources.</p>
            </div>
          </div>
        </Card.Header>
        <Separator className="my-2 bg-separator" />
        <Card.Content className="px-6 py-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {IMPORTANT_LINKS.map((link) => {
              const Icon = ICON_MAP[link.name] || LinkIcon;
              const catColor = CATEGORY_COLORS[link.category] || "";
              const catBg = CATEGORY_BG[link.category] || "from-orange-500 to-amber-500";

              return (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col p-5 rounded-2xl border border-border bg-surface-secondary hover:border-orange-500/40 hover:shadow-md hover:shadow-orange-500/5 transition-all duration-200"
                  aria-label={`Visit ${link.name} — opens in new tab`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className={`h-10 w-10 rounded-xl bg-gradient-to-br ${catBg} flex items-center justify-center shadow-sm`}>
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <Chip size="sm" variant="flat" className={`text-[10px] h-5 px-1.5 font-bold uppercase border ${catColor}`}>
                      {link.category}
                    </Chip>
                  </div>
                  <h3 className="font-extrabold text-sm text-foreground group-hover:text-orange-500 transition-colors mb-1">
                    {link.name}
                  </h3>
                  <p className="text-xs text-muted leading-relaxed flex-1 mb-3">{link.desc}</p>
                  <div className="flex items-center gap-1 text-xs font-semibold text-orange-600 dark:text-orange-400 opacity-0 group-hover:opacity-100 transition-opacity mt-auto">
                    Visit Portal <ExternalLink className="h-3 w-3" />
                  </div>
                </a>
              );
            })}
          </div>
        </Card.Content>
      </Card>
    </motion.main>
  );
}
