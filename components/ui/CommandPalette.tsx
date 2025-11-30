"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  House,
  Briefcase,
  User,
  Article,
  GameController,
  FileText,
  GithubLogo,
  LinkedinLogo,
  TwitterLogo,
  EnvelopeSimple,
  MagnifyingGlass,
  X,
} from "phosphor-react";

interface CommandItem {
  id: string;
  name: string;
  shortcut?: string;
  icon: typeof House;
  action: () => void;
  category: "navigation" | "social" | "actions";
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CommandPalette({
  isOpen,
  onClose,
}: CommandPaletteProps) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const commands: CommandItem[] = useMemo(
    () => [
      // Navigation
      {
        id: "home",
        name: "Go to Home",
        shortcut: "G H",
        icon: House,
        action: () => router.push("/"),
        category: "navigation" as const,
      },
      {
        id: "work",
        name: "View Work",
        shortcut: "G W",
        icon: Briefcase,
        action: () => router.push("/work"),
        category: "navigation" as const,
      },
      {
        id: "about",
        name: "About Me",
        shortcut: "G A",
        icon: User,
        action: () => router.push("/about"),
        category: "navigation" as const,
      },
      {
        id: "blog",
        name: "Read Blog",
        shortcut: "G B",
        icon: Article,
        action: () => router.push("/blog"),
        category: "navigation" as const,
      },
      {
        id: "playground",
        name: "Playground",
        shortcut: "G P",
        icon: GameController,
        action: () => router.push("/playground"),
        category: "navigation" as const,
      },
      // Actions
      {
        id: "resume",
        name: "Download Resume",
        shortcut: "D R",
        icon: FileText,
        action: () => window.open("/resume.pdf", "_blank"),
        category: "actions" as const,
      },
      // Social
      {
        id: "github",
        name: "GitHub Profile",
        icon: GithubLogo,
        action: () => window.open("https://github.com/chetanoli", "_blank"),
        category: "social" as const,
      },
      {
        id: "linkedin",
        name: "LinkedIn Profile",
        icon: LinkedinLogo,
        action: () =>
          window.open("https://linkedin.com/in/chetanoli", "_blank"),
        category: "social" as const,
      },
      {
        id: "twitter",
        name: "Twitter Profile",
        icon: TwitterLogo,
        action: () => window.open("https://twitter.com/chetanoli", "_blank"),
        category: "social" as const,
      },
      {
        id: "email",
        name: "Send Email",
        icon: EnvelopeSimple,
        action: () => window.open("mailto:hello@chetanoli.dev", "_blank"),
        category: "social" as const,
      },
    ],
    [router]
  );

  const filteredCommands = useMemo(
    () =>
      commands.filter((command) =>
        command.name.toLowerCase().includes(search.toLowerCase())
      ),
    [commands, search]
  );

  const groupedCommands = useMemo(
    () => ({
      navigation: filteredCommands.filter((c) => c.category === "navigation"),
      actions: filteredCommands.filter((c) => c.category === "actions"),
      social: filteredCommands.filter((c) => c.category === "social"),
    }),
    [filteredCommands]
  );

  const flatFilteredCommands = useMemo(
    () => [
      ...groupedCommands.navigation,
      ...groupedCommands.actions,
      ...groupedCommands.social,
    ],
    [groupedCommands]
  );

  const executeCommand = useCallback(
    (command: CommandItem) => {
      command.action();
      onClose();
      setSearch("");
      setSelectedIndex(0);
    },
    [onClose]
  );

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((prev) =>
            prev < flatFilteredCommands.length - 1 ? prev + 1 : 0
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((prev) =>
            prev > 0 ? prev - 1 : flatFilteredCommands.length - 1
          );
          break;
        case "Enter":
          e.preventDefault();
          if (flatFilteredCommands[selectedIndex]) {
            executeCommand(flatFilteredCommands[selectedIndex]);
          }
          break;
        case "Escape":
          e.preventDefault();
          onClose();
          setSearch("");
          setSelectedIndex(0);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, selectedIndex, flatFilteredCommands, executeCommand, onClose]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [search]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-bg/80 backdrop-blur-sm z-[100]"
            onClick={onClose}
          />

          {/* Command Palette */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-[20%] left-1/2 -translate-x-1/2 w-full max-w-xl z-[101]"
          >
            <div className="bg-bg border-2 border-fg shadow-brutal-lg mx-4">
              {/* Search Input */}
              <div className="flex items-center gap-3 px-4 py-4 border-b-2 border-border">
                <MagnifyingGlass
                  size={20}
                  className="text-muted"
                  weight="bold"
                />
                <input
                  type="text"
                  placeholder="Type a command or search..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="flex-1 bg-transparent text-fg font-mono text-sm outline-none placeholder:text-muted"
                  autoFocus
                />
                <button
                  onClick={onClose}
                  className="p-1 hover:bg-border transition-colors"
                >
                  <X size={16} className="text-muted" weight="bold" />
                </button>
              </div>

              {/* Commands List */}
              <div className="max-h-[400px] overflow-y-auto py-2">
                {flatFilteredCommands.length === 0 ? (
                  <div className="px-4 py-8 text-center text-muted font-mono text-sm">
                    No commands found
                  </div>
                ) : (
                  <>
                    {groupedCommands.navigation.length > 0 && (
                      <CommandGroup
                        title="Navigation"
                        commands={groupedCommands.navigation}
                        selectedIndex={selectedIndex}
                        startIndex={0}
                        onSelect={executeCommand}
                      />
                    )}
                    {groupedCommands.actions.length > 0 && (
                      <CommandGroup
                        title="Actions"
                        commands={groupedCommands.actions}
                        selectedIndex={selectedIndex}
                        startIndex={groupedCommands.navigation.length}
                        onSelect={executeCommand}
                      />
                    )}
                    {groupedCommands.social.length > 0 && (
                      <CommandGroup
                        title="Social"
                        commands={groupedCommands.social}
                        selectedIndex={selectedIndex}
                        startIndex={
                          groupedCommands.navigation.length +
                          groupedCommands.actions.length
                        }
                        onSelect={executeCommand}
                      />
                    )}
                  </>
                )}
              </div>

              {/* Footer */}
              <div className="px-4 py-3 border-t-2 border-border flex items-center justify-between">
                <div className="flex items-center gap-4 text-muted font-mono text-xs">
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 bg-border">↑↓</kbd>
                    Navigate
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 bg-border">↵</kbd>
                    Select
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 bg-border">Esc</kbd>
                    Close
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

interface CommandGroupProps {
  title: string;
  commands: CommandItem[];
  selectedIndex: number;
  startIndex: number;
  onSelect: (command: CommandItem) => void;
}

function CommandGroup({
  title,
  commands,
  selectedIndex,
  startIndex,
  onSelect,
}: CommandGroupProps) {
  return (
    <div className="px-2 py-1">
      <div className="px-2 py-2 text-muted font-mono text-xs uppercase tracking-wider">
        {title}
      </div>
      {commands.map((command, index) => {
        const isSelected = selectedIndex === startIndex + index;
        return (
          <button
            key={command.id}
            onClick={() => onSelect(command)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 transition-colors ${
              isSelected ? "bg-accent text-bg" : "text-fg hover:bg-border"
            }`}
          >
            <command.icon
              size={18}
              weight="bold"
              className={isSelected ? "text-bg" : "text-muted"}
            />
            <span className="flex-1 text-left font-mono text-sm">
              {command.name}
            </span>
            {command.shortcut && (
              <span
                className={`font-mono text-xs ${
                  isSelected ? "text-bg/70" : "text-muted"
                }`}
              >
                {command.shortcut}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
