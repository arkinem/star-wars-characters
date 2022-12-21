import { FC } from "react";

import { theme } from "constants/theme";

type Props = React.SVGProps<SVGSVGElement>;

const SortAscIcon: FC<Props> = (props) => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" {...props}>
			<path
				fill={theme.colors.text}
				d="M12 0L4 10h16L12 0zm3.839 16L12 20.798 8.161 16h7.678zM20 14H4l8 10 8-10z"
			></path>
		</svg>
	);
};

export { SortAscIcon };
