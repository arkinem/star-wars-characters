import { FC } from "react";

import { theme } from "constants/theme";

type Props = React.SVGProps<SVGSVGElement>;

const SortDscIcon: FC<Props> = (props) => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" {...props}>
			<path
				fill={theme.colors.text}
				d="M12 3.202L15.839 8H8.161L12 3.202zM12 0L4 10h16L12 0zm8 14H4l8 10 8-10z"
			></path>
		</svg>
	);
};

export { SortDscIcon };
