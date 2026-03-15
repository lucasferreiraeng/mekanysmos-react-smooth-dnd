import React, { useRef, useEffect, useCallback, CSSProperties } from 'react';
import { smoothDnD as container, ContainerOptions, SmoothDnD } from 'smooth-dnd';
import { dropHandlers } from 'smooth-dnd';

container.dropHandler = dropHandlers.reactDropHandler().handler;
container.wrapChild = false;

interface ContainerProps extends ContainerOptions {
	render?: (rootRef: React.RefObject<any>) => React.ReactElement;
	style?: CSSProperties;
	children?: React.ReactNode;
}

function Container({
	behaviour = 'move',
	orientation = 'vertical',
	...rest
}: ContainerProps) {
	const props = { behaviour, orientation, ...rest };
	const { render, children, style, ...containerOptions } = props;
	const containerRef = useRef<HTMLDivElement>(null);
	const smoothDnDRef = useRef<SmoothDnD | null>(null);
	const prevContainerRef = useRef<HTMLElement | null>(null);
	const propsRef = useRef(props);
	propsRef.current = props;

	const getContainerOptions = useCallback((): ContainerOptions => {
		return Object.keys(propsRef.current).reduce((result: Record<string, any>, key: string) => {
			const prop = (propsRef.current as Record<string, any>)[key];

			if (typeof prop === 'function') {
				result[key] = (...params: any[]) => {
					return ((propsRef.current as Record<string, any>)[key] as Function)(...params);
				};
			} else {
				result[key] = prop;
			}

			return result;
		}, {}) as ContainerOptions;
	}, []);

	useEffect(() => {
		const element = containerRef.current;
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
		const element = containerRef.current;
		if (!element || !smoothDnDRef.current) return;

		if (prevContainerRef.current && prevContainerRef.current !== element) {
			smoothDnDRef.current.dispose();
			smoothDnDRef.current = container(element, getContainerOptions());
			prevContainerRef.current = element;
			return;
		}

		smoothDnDRef.current.setOptions(getContainerOptions());
	});

	if (render) {
		return render(containerRef);
	}

	return (
		<div style={style} ref={containerRef}>
			{children}
		</div>
	);
}

export default Container;
