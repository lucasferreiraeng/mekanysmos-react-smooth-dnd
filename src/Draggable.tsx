import React from 'react';
import { constants } from 'smooth-dnd';
const { wrapperClass } = constants;

export interface DraggableProps {
	render?: () => React.ReactElement;
	className?: string;
	children?: React.ReactNode;
	[key: string]: any;
}

function Draggable(props: DraggableProps) {
	const { render, className, children, ...restProps } = props;

	if (render) {
		return React.cloneElement(render(), { className: wrapperClass } as any);
	}

	const clsName = `${className ? className + ' ' : ''}`;
	return (
		<div {...restProps} className={`${clsName}${wrapperClass}`}>
			{children}
		</div>
	);
}

export default Draggable;
