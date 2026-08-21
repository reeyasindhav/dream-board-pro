import "sonner";
import { toast } from "sonner";
import { type ReactNode } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export function SignOutButton({
  onConfirm,
  className,
  children,
}: {
  onConfirm: () => void;
  className?: string;
  children: ReactNode;
}) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button type="button" className={className}>
          {children}
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Sign out of Dreamboard?</AlertDialogTitle>
          <AlertDialogDescription>
            Your boards and journal stay in your browser. You'll return to the sign-in screen.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              toast.success("Signed out — boards stay in your browser.");
              onConfirm();
            }}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Sign out
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
