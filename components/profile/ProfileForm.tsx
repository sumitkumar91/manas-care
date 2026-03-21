"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import type { Database } from "@/lib/supabase/types";

type Profile = Database["public"]["Tables"]["profiles"]["Row"];

const profileSchema = z.object({
  display_name: z.string().min(2, "Name must be at least 2 characters").max(50),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(30)
    .regex(/^[a-z0-9_]+$/, "Only lowercase letters, numbers, and underscores")
    .optional()
    .or(z.literal("")),
  bio: z.string().max(160, "Bio max 160 characters").optional().or(z.literal("")),
});

type ProfileValues = z.infer<typeof profileSchema>;

interface ProfileFormProps {
  profile: Profile;
}

export function ProfileForm({ profile }: ProfileFormProps) {
  const [uploading, setUploading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(profile.avatar_url ?? "");
  const supabase = createClient();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProfileValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      display_name: profile.display_name ?? "",
      username: profile.username ?? "",
      bio: profile.bio ?? "",
    },
  });

  async function onSubmit(values: ProfileValues) {
    const { error } = await supabase
      .from("profiles")
      .update({
        display_name: values.display_name,
        username: values.username || null,
        bio: values.bio || null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", profile.id);

    if (error) {
      if (error.code === "23505" || error.message.toLowerCase().includes("duplicate")) {
        toast.error("That username is already taken.");
      } else {
        toast.error(error.message);
      }
    } else {
      toast.success("Profile updated");
    }
  }

  async function handleAvatarUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    // Basic size guard (2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image must be under 2MB");
      return;
    }

    setUploading(true);
    const ext = file.name.split(".").pop();
    const path = `${profile.id}/avatar.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(path, file, { upsert: true });

    if (uploadError) {
      toast.error(uploadError.message);
      setUploading(false);
      return;
    }

    const { data } = supabase.storage.from("avatars").getPublicUrl(path);
    const publicUrl = `${data.publicUrl}?t=${Date.now()}`;

    await supabase
      .from("profiles")
      .update({ avatar_url: publicUrl })
      .eq("id", profile.id);

    setAvatarUrl(publicUrl);
    toast.success("Avatar updated");
    setUploading(false);
  }

  const initials = (profile.display_name ?? "U")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-lg">
      {/* Avatar */}
      <div className="flex items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src={avatarUrl} alt={profile.display_name ?? "Avatar"} />
          <AvatarFallback className="text-lg">{initials}</AvatarFallback>
        </Avatar>
        <div>
          <label
            htmlFor="avatar-upload"
            className="cursor-pointer text-sm font-medium text-primary hover:underline"
          >
            {uploading ? "Uploading…" : "Change photo"}
          </label>
          <input
            id="avatar-upload"
            type="file"
            accept="image/png,image/jpeg,image/webp"
            className="hidden"
            onChange={handleAvatarUpload}
            disabled={uploading}
          />
          <p className="text-xs text-muted-foreground">PNG, JPG or WebP, max 2MB</p>
        </div>
      </div>

      {/* Display name */}
      <div className="space-y-1.5">
        <Label htmlFor="display_name">Display name</Label>
        <Input id="display_name" {...register("display_name")} />
        {errors.display_name && (
          <p className="text-destructive text-xs">{errors.display_name.message}</p>
        )}
      </div>

      {/* Username */}
      <div className="space-y-1.5">
        <Label htmlFor="username">Username <span className="text-muted-foreground">(optional)</span></Label>
        <div className="flex items-center">
          <span className="px-3 h-8 flex items-center border border-r-0 rounded-l-lg bg-muted text-muted-foreground text-sm">@</span>
          <Input
            id="username"
            className="rounded-l-none"
            placeholder="yourname"
            {...register("username")}
          />
        </div>
        {errors.username && (
          <p className="text-destructive text-xs">{errors.username.message}</p>
        )}
      </div>

      {/* Bio */}
      <div className="space-y-1.5">
        <Label htmlFor="bio">Bio <span className="text-muted-foreground">(optional)</span></Label>
        <Textarea
          id="bio"
          placeholder="A little about yourself…"
          rows={3}
          maxLength={160}
          {...register("bio")}
        />
        {errors.bio && (
          <p className="text-destructive text-xs">{errors.bio.message}</p>
        )}
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Saving…" : "Save changes"}
      </Button>
    </form>
  );
}
