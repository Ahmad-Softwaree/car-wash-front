import {
  ComponentPropsWithoutRef,
  FormEvent,
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";
import { SubmitHandler } from "react-hook-form";

type FormProps = {
  onSubmit: SubmitHandler<any>;
} & ComponentPropsWithoutRef<"form">;

export type FormHandle = {
  clear: () => void;
};
const Form = forwardRef<FormHandle, FormProps>(
  ({ children, onSubmit, ...others }: FormProps, ref) => {
    const form = useRef<HTMLFormElement>(null);

    useImperativeHandle(ref, () => {
      return {
        clear() {
          form.current?.reset();
        },
      };
    });
    const onSubmitForm = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const data = Object.fromEntries(formData);
      onSubmit(data);
    };
    return (
      <form ref={form} onSubmit={onSubmitForm} {...others}>
        {children}
      </form>
    );
  }
);

export default Form;
