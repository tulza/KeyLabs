import { typeboxResolver } from "@hookform/resolvers/typebox";
import { Type } from "@sinclair/typebox";
import { useForm } from "react-hook-form";
import { WrenchIcon } from "@/components/icon";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Mode } from "@/lib/game/enum";
import { handleMode2Change, usePreGameConfig } from "@/lib/game/store/pre-game";
import { cn } from "@/lib/utils";

const Mode2Schema = Type.Object({
  mode2: Type.Number({ minimum: 1 }),
});

type Mode2Form = { mode2: number };

export function Mode2CustomDialog({ isCustom }: { isCustom: boolean }) {
  const { mode, mode2 } = usePreGameConfig();

  const title = mode === Mode.time ? "Test duration" : "Custom node amount";
  const placeholder = mode === Mode.time ? "duration" : "node amount";

  const { register, handleSubmit } = useForm<Mode2Form>({
    resolver: typeboxResolver(Mode2Schema),
    defaultValues: { mode2 },
  });

  const onSubmit = ({ mode2 }: Mode2Form) => {
    handleMode2Change(mode2);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={isCustom ? "secondary" : "muted"}
          className="rounded font-mono font-normal tabular-nums"
          size="icon-lg"
        >
          <WrenchIcon
            className={cn(isCustom && "*:fill-secondary-foreground")}
          />
        </Button>
      </DialogTrigger>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent
          className="text-foreground sm:max-w-sm"
          aria-describedby={undefined}
        >
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>
              You can start an infinite test by inputting 0
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Input
              {...register("mode2", {
                valueAsNumber: true,
                onChange: (e) => {
                  if (e.target.value === "") {
                    return;
                  }
                  const value = Number(e.target.value);
                  if (Number.isNaN(value) || value < 0) {
                    e.target.value = "";
                  }
                },
              })}
              id="mode2"
              type="text"
              placeholder={placeholder}
              autoFocus
            />
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button
                type="submit"
                variant="outline"
                onClick={() => handleSubmit(onSubmit)()}
                className="w-full"
              >
                Apply
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
