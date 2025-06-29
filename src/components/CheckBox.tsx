import {
    ComponentProps,
    DetailedHTMLProps,
    HTMLAttributes,
    PropsWithChildren,
    ReactNode,
    useId,
} from 'react';
import { CheckboxPrimitive, Label } from '@lifespikes/ui';
import { cn } from '@lifespikes/ui';

export type CheckboxProps = PropsWithChildren<
    ComponentProps<typeof CheckboxPrimitive> & {
        _containerProps?: DetailedHTMLProps<
            HTMLAttributes<HTMLDivElement>,
            HTMLDivElement
        >;
        _labelProps?: Omit<ComponentProps<typeof Label>, 'children'>;
        label?: ReactNode;
        defaultChecked?: boolean;
    }
>;

export const Checkbox = ({
    _containerProps,
    _labelProps,
    label,
    defaultChecked,
    ...props
}: CheckboxProps) => {
    const _id = useId()
    const id = props.id ?? _id;
    return (
        <div
            {..._containerProps}
            className={cn(
                'flex items-center space-x-2',
                _containerProps?.className ?? '',
            )}
        >
            <CheckboxPrimitive {...props} id={id} checked={defaultChecked} />
            <Label {..._labelProps} htmlFor={id}>
                {label}
            </Label>
        </div>
    );
};

Checkbox.displayName = 'Checkbox';