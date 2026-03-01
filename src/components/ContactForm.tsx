"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import { Send, CheckCircle, AlertCircle } from "lucide-react";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xojnzvqz";

type FormData = {
  name: string;
  email: string;
  checkin: string;
  checkout: string;
  guests: string;
  message: string;
};

const inputClasses =
  "w-full rounded-lg border border-sand bg-pearl px-3 py-2.5 text-sm text-navy placeholder:text-navy-light/50 focus:border-ocean focus:outline-none focus:ring-2 focus:ring-ocean/30";

export default function ContactForm() {
  const t = useTranslations("Contact");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">(
    "idle"
  );

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const checkin = watch("checkin");
  const requiredMsg = t("required");

  const onSubmit = async (data: FormData) => {
    setStatus("sending");
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <h3 className="font-heading text-xl font-bold text-navy mb-1">
        {t("title")}
      </h3>

      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <input
            type="text"
            placeholder={t("name")}
            {...register("name", { required: requiredMsg })}
            className={inputClasses}
          />
          {errors.name && (
            <p className="mt-0.5 text-xs text-red-600">{errors.name.message}</p>
          )}
        </div>
        <div>
          <input
            type="email"
            placeholder={t("email")}
            {...register("email", { required: requiredMsg })}
            className={inputClasses}
          />
          {errors.email && (
            <p className="mt-0.5 text-xs text-red-600">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <div>
          <label className="mb-1 block text-xs font-medium text-navy-light">{t("checkin")}</label>
          <input
            type="date"
            {...register("checkin", { required: requiredMsg })}
            className={inputClasses}
          />
          {errors.checkin && (
            <p className="mt-0.5 text-xs text-red-600">{errors.checkin.message}</p>
          )}
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-navy-light">{t("checkout")}</label>
          <input
            type="date"
            {...register("checkout", {
              required: requiredMsg,
              validate: (v) => {
                if (!checkin || !v) return true;
                return new Date(v) > new Date(checkin) || t("checkoutError");
              },
            })}
            className={inputClasses}
          />
          {errors.checkout && (
            <p className="mt-0.5 text-xs text-red-600">{errors.checkout.message}</p>
          )}
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-navy-light">{t("guests")}</label>
          <select
            {...register("guests", { required: requiredMsg })}
            className={inputClasses}
          >
            <option value="">{t("guests")}</option>
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
          {errors.guests && (
            <p className="mt-0.5 text-xs text-red-600">{errors.guests.message}</p>
          )}
        </div>
      </div>

      <textarea
        rows={2}
        placeholder={t("messagePlaceholder")}
        {...register("message")}
        className={`${inputClasses} resize-none`}
      />

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={status === "sending"}
          className="flex items-center gap-2 rounded-full bg-sunset px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-sunset-dark disabled:opacity-70"
        >
          {status === "sending" ? (
            <>
              <span className="size-3.5 animate-spin rounded-full border-2 border-white border-t-transparent" />
              {t("sending")}
            </>
          ) : (
            <>
              <Send className="h-4 w-4" />
              {t("submit")}
            </>
          )}
        </button>

        <AnimatePresence mode="wait">
          {status === "success" && (
            <motion.div
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              className="flex items-center gap-2 text-sm text-ocean-dark"
            >
              <CheckCircle className="h-4 w-4 shrink-0" />
              <span>{t("success")}</span>
            </motion.div>
          )}
          {status === "error" && (
            <motion.div
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              className="flex items-center gap-2 text-sm text-red-600"
            >
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{t("error")}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
}
