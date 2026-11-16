import { useState, type ComponentProps } from "react";
import { t } from "@/i18n";
import { Mail, Send } from "lucide-react";
import { Tabs } from "radix-ui";
import { AnimatedSegmentedTabs } from "./ui/animated-segmented-tabs";
import { ResponsiveDialog } from "./ui/responsive-dialog";

type ContactMethod = "telegram" | "email";

export function AuthorContact({
  children = t("policy.contactAuthor"),
  ...props
}: ComponentProps<"button">) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button {...props} type="button" onClick={() => setOpen(true)}>
        {children}
      </button>
      <ResponsiveDialog
        open={open}
        onOpenChange={setOpen}
        title={t("policy.contactAuthor")}
        description={t("contact.emailOrTelegram")}
        dialogClassName="gap-3 sm:max-w-[360px]"
      >
        <AuthorContactDetails />
      </ResponsiveDialog>
    </>
  );
}

/** Telegram and email shown in the contact dialog. */
function AuthorContactDetails() {
  const [method, setMethod] = useState<ContactMethod>("telegram");
  return (
    <AnimatedSegmentedTabs<ContactMethod>
      label={t("contact.contactMethod")}
      value={method}
      onValueChange={setMethod}
      listClassName="w-full"
      triggerClassName="text-xs"
      options={[
        {
          value: "telegram",
          label: (
            <>
              <Send className="size-4" aria-hidden="true" />
              {t("contact.telegram")}
            </>
          ),
        },
        {
          value: "email",
          label: (
            <>
              <Mail className="size-4" aria-hidden="true" />
              {t("contact.email")}
            </>
          ),
        },
      ]}
    >
      <Tabs.Content
        value="telegram"
        className="mt-3 space-y-3 py-4 text-center outline-none"
      >
        <a
          className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm text-primary hover:bg-accent"
          href="https://t.me/ice8r"
          target="_blank"
          rel="noreferrer"
        >
          <Send className="size-4" aria-hidden="true" />
          @ice8r
        </a>
        <p className="text-xs text-muted-foreground">
          {t("contact.telegramHint")}
        </p>
      </Tabs.Content>
      <Tabs.Content
        value="email"
        className="mt-3 space-y-3 py-4 text-center outline-none"
      >
        <a
          className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm text-primary hover:bg-accent"
          href="mailto:dq686@outlook.com"
        >
          <Mail className="size-4" aria-hidden="true" />
          dq686@outlook.com
        </a>
        <p className="text-xs text-muted-foreground">
          {t("contact.emailHint")}
        </p>
      </Tabs.Content>
    </AnimatedSegmentedTabs>
  );
}
