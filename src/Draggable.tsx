import React, { forwardRef } from 'react';
import { constants } from 'smooth-dnd';
const { wrapperClass } = constants;

type ElementType = React.ElementType;

type DraggableProps<T extends ElementType = 'div'> = {
	/** Render as a different HTML element. Default: 'div' */
	as?: T;
	/** @deprecated Use `as` prop instead. Custom render function for the draggable root. */
	render?: () => React.ReactElement;
	children?: React.ReactNode;
} & Omit<React.ComponentPropsWithoutRef<T>, 'as' | 'render' | 'children'>;

function DraggableInner<T extends ElementType = 'div'>(
	{ as, render, children, className, ...restProps }: DraggableProps<T>,
	ref: React.ForwardedRef<HTMLElement>
) {
	// Legacy render prop support
	if (render) {
		const rendered = render();
		const existingClass = (rendered.props as any).className;
		const mergedClass = existingClass
			? `${existingClass} ${wrapperClass}`
			: wrapperClass;
		return React.cloneElement(rendered, { className: mergedClass } as any);
	}

	const Component = (as || 'div') as any;
	const clsName = className ? `${className} ${wrapperClass}` : wrapperClass;

	return (
		<Component {...restProps} ref={ref} className={clsName}>
			{children}
		</Component>
	);
}

const Draggable = forwardRef(DraggableInner) as <T extends ElementType = 'div'>(
	props: DraggableProps<T> & { ref?: React.Ref<HTMLElement> }
) => React.ReactElement | null;

export type { DraggableProps };
export default Draggable;
