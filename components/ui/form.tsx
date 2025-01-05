'use client';

    import * as React from 'react';
    import { useFormContext } from 'react-hook-form';
    import { cn } from '@/lib/utils';

    const Form = React.forwardRef<
      HTMLFormElement,
      React.HTMLAttributes<HTMLFormElement>
    >(({ className, ...props }, ref) => {
      return (
        <form ref={ref} className={cn('space-y-8', className)} {...props} />
      );
    });
    Form.displayName = 'Form';

    const FormItem = React.forwardRef<
      HTMLDivElement,
      React.HTMLAttributes<HTMLDivElement>
    >(({ className, ...props }, ref) => {
      return <div ref={ref} className={cn('space-y-2', className)} {...props} />;
    });
    FormItem.displayName = 'FormItem';

    const FormLabel = React.forwardRef<
      HTMLLabelElement,
      React.HTMLAttributes<HTMLLabelElement>
    >(({ className, ...props }, ref) => {
      return (
        <label
          ref={ref}
          className={cn('text-sm font-medium leading-none', className)}
          {...props}
        />
      );
    });
    FormLabel.displayName = 'FormLabel';

    const FormControl = React.forwardRef<
      HTMLDivElement,
      React.HTMLAttributes<HTMLDivElement>
    >(({ className, ...props }, ref) => {
      return <div ref={ref} className={cn('', className)} {...props} />;
    });
    FormControl.displayName = 'FormControl';

    const FormDescription = React.forwardRef<
      HTMLParagraphElement,
      React.HTMLAttributes<HTMLParagraphElement>
    >(({ className, ...props }, ref) => {
      return (
        <p
          ref={ref}
          className={cn('text-sm text-muted-foreground', className)}
          {...props}
        />
      );
    });
    FormDescription.displayName = 'FormDescription';

    const FormMessage = React.forwardRef<
      HTMLParagraphElement,
      React.HTMLAttributes<HTMLParagraphElement>
    >(({ className, ...props }, ref) => {
      const { formState } = useFormContext();
      if (!formState.errors) {
        return null;
      }
      return (
        <p
          ref={ref}
          className={cn('text-sm font-medium text-destructive', className)}
          {...props}
        />
      );
    });
    FormMessage.displayName = 'FormMessage';

    const FormField = React.forwardRef<
      HTMLDivElement,
      {
        control: any;
        name: string;
        render: (props: any) => React.ReactNode;
      } & React.HTMLAttributes<HTMLDivElement>
    >(({ control, name, render, ...props }, ref) => {
      return (
        <div ref={ref} {...props}>
          {render({
            field: {
              ...control.register(name),
              value: control.getValues(name),
              onChange: (e: any) => {
                control.setValue(name, e?.target?.value);
              },
            },
          })}
        </div>
      );
    });
    FormField.displayName = 'FormField';

    export {
      Form,
      FormItem,
      FormLabel,
      FormControl,
      FormDescription,
      FormMessage,
      FormField,
    };
