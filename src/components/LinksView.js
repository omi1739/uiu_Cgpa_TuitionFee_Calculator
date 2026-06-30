"use client";

import { motion } from "framer-motion";
import { Card, Chip, Separator } from "@heroui/react";
import { Link as LinkIcon, ExternalLink } from "lucide-react";
import { IMPORTANT_LINKS } from "./constants";

export default function LinksView() {
  return (
    <motion.main
      key="links-view"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.2 }}
      className="max-w-4xl mx-auto px-6 flex flex-col gap-6"
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
        <Card.Content className="px-6 py-6 flex flex-col gap-4">
          {IMPORTANT_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-2xl border border-border bg-surface-secondary hover:border-orange-500/50 hover:bg-orange-500/5 transition-all duration-200"
              aria-label={`Visit ${link.name} — opens in new tab`}
            >
              <div className="flex flex-col gap-1 max-w-xl">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-base text-foreground group-hover:text-orange-500 transition-colors">
                    {link.name}
                  </span>
                  <Chip size="sm" variant="flat" color="warning" className="text-[10px] h-5 px-1.5 font-bold uppercase">
                    {link.category}
                  </Chip>
                </div>
                <p className="text-xs sm:text-sm text-muted leading-relaxed">{link.desc}</p>
              </div>
              <div className="flex items-center gap-1.5 mt-3 sm:mt-0 text-xs font-semibold text-orange-600 group-hover:underline">
                Visit Portal
                <ExternalLink className="h-3.5 w-3.5" />
              </div>
            </a>
          ))}
        </Card.Content>
      </Card>
    </motion.main>
  );
}
