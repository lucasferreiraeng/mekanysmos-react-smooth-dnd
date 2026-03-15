import React, {
	useRef,
	useEffect,
	useCallback,
	forwardRef,
	useImperativeHandle,
} from 'react';
import { smoothDnD as container, ContainerOptions, SmoothDnD } from 'smooth-dnd';
import { dropHandlers } from 'smooth-dnd';

container.dropHandler = dropHandlers.reactDropHandler().handler;
container.wrapChild = false;

const CONTAINER_OPTION_KEYS: Set<string> = new Set([
	'behaviour',
	'groupName',
	'orientation',
	'dragHandleSelector',
	'nonDragAreaSelector',
	'dragBeginDelay',
	'animationDuration',
	'autoScrollEnabled',
	'lockAxis',
	'dragClass',
	'dropClass',
	'removeOnDropOut',
	'dropPlaceholder',
	'onDragStart',
	'onDragEnd',
	'onDrop',
	'onDropReady',
	'getChildPayload',
	'shouldAnimateDrop',
	'shouldAcceptDrop',
	'onDragEnter',
	'onDragLeave',
	'getGhostParent',
]);

type ElementType = React.ElementType;

type ContainerProps<T extends ElementType = 'div'> = ContainerOptions & {
	/** Render as a different HTML element. Default: 'div' */
	as?: T;
	/** @deprecated Use `as` prop instead. Custom render function for the container root. */
	render?: (rootRef: React.RefObject<any>) => React.ReactElement;
	children?: React.ReactNode;
} & Omit<
		React.ComponentPropsWithoutRef<T>,
		keyof ContainerOptions | 'as' | 'render' | 'children'
	>;

function splitProps(
	props: Record<string, any>
): { dndOptions: Record<string, any>; htmlProps: Record<string, any> } {
	const dndOptions: Record<string, any> = {};
	const htmlProps: Record<string, any> = {};

	for (const key of Object.keys(props)) {
		if (CONTAINER_OPTION_KEYS.has(key)) {
			dndOptions[key] = props[key];
		} else {
			htmlProps[key] = props[key];
		}
	}

	return { dndOptions, htmlProps };
}

function ContainerInner<T extends ElementType = 'div'>(
	{
		as,
		render,
		children,
		behaviour = 'move',
		orientation = 'vertical',
		...rest
	}: ContainerProps<T>,
	ref: React.ForwardedRef<HTMLElement>
) {
	const innerRef = useRef<HTMLElement>(null);
	const smoothDnDRef = useRef<SmoothDnD | null>(null);
	const prevContainerRef = useRef<HTMLElement | null>(null);

	useImperativeHandle(ref, () => innerRef.current as HTMLElement);

	const allDndProps = { behaviour, orientation, ...rest };
	const propsRef = useRef(allDndProps);
	propsRef.current = allDndProps;

	const getContainerOptions = useCallback((): ContainerOptions => {
		const { dndOptions } = splitProps(propsRef.current);

		return Object.keys(dndOptions).reduce(
			(result: Record<string, any>, key: string) => {
				const prop = dndOptions[key];

				if (typeof prop === 'function') {
					result[key] = (...params: any[]) => {
						const { dndOptions: current } = splitProps(propsRef.current);
						return (current[key] as Function)(...params);
					};
				} else {
					result[key] = prop;
				}

				return result;
			},
			{}
		) as ContainerOptions;
	}, []);

	useEffect(() => {
		const element = innerRef.current;
		if (element) {
			prevContainerRef.current = element;
			smoothDnDRef.current = container(element, getContainerOptions());
		}

		return () => {
			if (smoothDnDRef.current) {
				smoothDnDRef.current.dispose();
				smoothDnDRef.current = null;
			}
		};
	}, [getContainerOptions]);

	useEffect(() => {
		const element = innerRef.current;
		if (!element || !smoothDnDRef.current) return;

		if (prevContainerRef.current && prevContainerRef.current !== element) {
			smoothDnDRef.current.dispose();
			smoothDnDRef.current = container(element, getContainerOptions());
			prevContainerRef.current = element;
			return;
		}

		smoothDnDRef.current.setOptions(getContainerOptions());
	});

	// Legacy render prop support
	if (render) {
		return render(innerRef as React.RefObject<any>);
	}

	const { htmlProps } = splitProps(rest);
	const Component = (as || 'div') as any;

	return (
		<Component {...htmlProps} ref={innerRef}>
			{children}
		</Component>
	);
}

const Container = forwardRef(ContainerInner) as <T extends ElementType = 'div'>(
	props: ContainerProps<T> & { ref?: React.Ref<HTMLElement> }
) => React.ReactElement | null;

export type { ContainerProps };
export default Container;
