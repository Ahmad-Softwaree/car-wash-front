"use client";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import Alert from "@mui/material/Alert";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({
        id,
        title,
        alertType = "info",
        description,
        action,
        ...props
      }) {
        return (
          <Toast className="p-0 !font-bukra" key={id} {...props}>
            <Alert
              severity={alertType}
              className="grid gap-1 w-full !font-bukra">
              {title && (
                <ToastTitle className="!font-bukra !text-sm mb-2">
                  {title}
                </ToastTitle>
              )}
              {description && (
                <ToastDescription className="!font-bukra !text-sm">
                  {description}
                </ToastDescription>
              )}
            </Alert>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
