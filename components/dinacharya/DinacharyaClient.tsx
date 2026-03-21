"use client";

import { useState, useEffect, useRef } from "react";
import {
  DOSHA_ZONES,
  DOSHA_COLORS,
  CATEGORY_LABELS,
  CATEGORY_ZONE_COLORS,
  classifyTask,
  getZoneForTask,
  getCurrentZone,
  type Task,
  type DoshaZone,
} from "@/lib/constants/dinacharya";
import { cn } from "@/lib/utils";
import { Plus, X, CheckCircle2, Circle, ChevronDown, ChevronUp, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const STORAGE_KEY = "manas-dinacharya-tasks";

export function DinacharyaClient() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [input, setInput] = useState("");
  const [currentZone, setCurrentZone] = useState<DoshaZone | null>(null);
  const [infoOpen, setInfoOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const h = new Date().getHours();
    setCurrentZone(getCurrentZone(h));
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setTasks(JSON.parse(stored));
    } catch {
      // ignore
    }
  }, []);

  function persist(updated: Task[]) {
    setTasks(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }

  function addTask() {
    const text = input.trim();
    if (!text) return;
    const task: Task = {
      id: crypto.randomUUID(),
      text,
      category: classifyTask(text),
      done: false,
    };
    persist([...tasks, task]);
    setInput("");
    inputRef.current?.focus();
  }

  function toggleDone(id: string) {
    persist(tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  }

  function removeTask(id: string) {
    persist(tasks.filter((t) => t.id !== id));
  }

  const unclassified = tasks.filter((t) => t.category === "other");

  return (
    <div className="space-y-6">
      {/* Info card */}
      <div className="rounded-2xl border p-5 space-y-3">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-primary/70">Vedic Circadian Science</p>
            <h2 className="text-xl font-bold mt-0.5">Dinacharya</h2>
            <p className="text-sm text-muted-foreground">Sanskrit: दिनचर्या · "daily conduct aligned with the sun"</p>
          </div>
          <button
            onClick={() => setInfoOpen((o) => !o)}
            className="shrink-0 text-muted-foreground hover:text-foreground transition-colors mt-1"
          >
            {infoOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
        </div>

        {infoOpen && (
          <div className="space-y-3 pt-1 border-t">
            <p className="text-sm text-muted-foreground leading-relaxed">
              Dinacharya is the Ayurvedic science of daily routine. The Vedic clock divides the 24-hour day into six 4-hour windows, each dominated by one of the three doshas - Vata, Pitta, and Kapha. Each dosha governs a different type of cognitive and physical energy.
            </p>
            <div className="grid grid-cols-3 gap-3 text-sm">
              {(["Vata", "Pitta", "Kapha"] as const).map((d) => (
                <div key={d} className={cn("rounded-lg p-3 border", DOSHA_COLORS[d].zone)}>
                  <div className={cn("text-xs font-bold uppercase tracking-wide mb-1", DOSHA_COLORS[d].text)}>{d}</div>
                  <div className="text-xs text-muted-foreground">
                    {d === "Vata" && "Air & space. Governs creativity, movement, and communication."}
                    {d === "Pitta" && "Fire & water. Governs digestion, sharpness, and transformation."}
                    {d === "Kapha" && "Earth & water. Governs structure, stability, and endurance."}
                  </div>
                </div>
              ))}
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Add your tasks below. The app classifies them by type and places them in the optimal time window - analytical tasks in Pitta hours, creative work in Vata hours, physical tasks in Kapha hours.
            </p>
          </div>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Left: Task input + list */}
        <div className="w-full lg:w-80 lg:shrink-0 space-y-4">
          {/* Current zone indicator */}
          {currentZone && (
            <div className={cn("rounded-xl border p-3 flex items-center gap-3", DOSHA_COLORS[currentZone.dosha].activezone)}>
              <div className={cn("w-2 h-2 rounded-full shrink-0 animate-pulse", DOSHA_COLORS[currentZone.dosha].dot)} />
              <div className="min-w-0">
                <p className={cn("text-xs font-semibold uppercase tracking-wide", DOSHA_COLORS[currentZone.dosha].text)}>
                  Right now: {currentZone.dosha} time
                </p>
                <p className="text-xs text-muted-foreground truncate">{currentZone.time} · {currentZone.tagline}</p>
              </div>
            </div>
          )}

          {/* Add task */}
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Add tasks</p>
            <div className="flex gap-2">
              <Input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addTask()}
                placeholder="e.g. Study for exam, Go for a run…"
                className="flex-1"
              />
              <Button size="icon" onClick={addTask} disabled={!input.trim()}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Tasks are auto-classified by keywords.
            </p>
          </div>

          {/* Task list */}
          {tasks.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">All tasks</p>
              <div className="space-y-1.5">
                {tasks.map((task) => (
                  <TaskRow key={task.id} task={task} onToggle={toggleDone} onRemove={removeTask} />
                ))}
              </div>
            </div>
          )}

          {tasks.length === 0 && (
            <div className="rounded-xl border border-dashed p-6 text-center text-muted-foreground text-sm">
              Add your first task to see it scheduled.
            </div>
          )}
        </div>

        {/* Right: Day schedule */}
        <div className="flex-1 space-y-3">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Your day, optimised</p>
          <div className="space-y-3">
            {DOSHA_ZONES.map((zone) => {
              const zoneTasks = tasks.filter((t) => {
                const z = getZoneForTask(t.category);
                return z?.id === zone.id;
              });
              const isNow = currentZone?.id === zone.id;
              const colors = DOSHA_COLORS[zone.dosha];

              return (
                <div
                  key={zone.id}
                  className={cn(
                    "rounded-xl border p-4 transition-all",
                    isNow ? colors.activezone : colors.zone
                  )}
                >
                  <div className="flex items-start gap-3">
                    {/* Dosha label */}
                    <div className={cn("rounded-md px-2 py-0.5 text-xs font-bold uppercase tracking-wide shrink-0 text-white mt-0.5", colors.label)}>
                      {zone.dosha}
                    </div>

                    <div className="flex-1 min-w-0 space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold">{zone.time}</span>
                            {isNow && (
                              <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide bg-foreground text-background px-1.5 py-0.5 rounded-full">
                                <Zap className="h-2.5 w-2.5" /> Now
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground mt-0.5">{zone.tagline}</p>
                        </div>
                      </div>

                      {/* Best for tags */}
                      <div className="flex flex-wrap gap-1.5">
                        {zone.bestForLabels.map((label) => (
                          <span key={label} className={cn("text-xs px-2 py-0.5 rounded-full", colors.badge)}>
                            {label}
                          </span>
                        ))}
                      </div>

                      {/* Tasks in this zone */}
                      {zoneTasks.length > 0 && (
                        <div className="space-y-1 pt-1 border-t border-current/10">
                          {zoneTasks.map((task) => (
                            <TaskRow key={task.id} task={task} onToggle={toggleDone} onRemove={removeTask} compact />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Unclassified */}
            {unclassified.length > 0 && (
              <div className="rounded-xl border border-dashed p-4 space-y-2">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Unscheduled</p>
                <p className="text-xs text-muted-foreground">These tasks weren&apos;t matched to a specific zone. Try adding keywords like "code", "design", "run", or "meditate".</p>
                <div className="space-y-1.5">
                  {unclassified.map((task) => (
                    <TaskRow key={task.id} task={task} onToggle={toggleDone} onRemove={removeTask} compact />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function TaskRow({
  task,
  onToggle,
  onRemove,
  compact = false,
}: {
  task: Task;
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
  compact?: boolean;
}) {
  return (
    <div className={cn("flex items-center gap-2 group", compact ? "py-0.5" : "py-1")}>
      <button onClick={() => onToggle(task.id)} className="shrink-0 text-muted-foreground hover:text-primary transition-colors">
        {task.done
          ? <CheckCircle2 className="h-4 w-4 text-primary" />
          : <Circle className="h-4 w-4" />
        }
      </button>
      <span className={cn("flex-1 text-sm min-w-0 truncate", task.done && "line-through text-muted-foreground")}>
        {task.text}
      </span>
      {!compact && (
        <span className={cn("text-[10px] px-2 py-0.5 rounded-full shrink-0 font-medium", CATEGORY_ZONE_COLORS[task.category])}>
          {CATEGORY_LABELS[task.category]}
        </span>
      )}
      <button
        onClick={() => onRemove(task.id)}
        className="shrink-0 opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-all"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
