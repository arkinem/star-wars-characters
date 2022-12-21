import { FC } from "react";
import styled from "styled-components";

import { Background } from "components/Background";
import { Logo } from "components/icons/Logo";
import { CharactersTable } from "components/CharactersTable";
import { theme } from "constants/theme";

const App: FC = () => {
	return (
		<Container>
			<ContentContainer>
				<Logo />
				<CharactersTable />
			</ContentContainer>
			<Background />
		</Container>
	);
};

export { App };

const Container = styled.div`
	min-height: 100vh;
	width: 100%;
	display: flex;
	background-color: ${theme.colors.background};
`;

const ContentContainer = styled.div`
	display: flex;
	align-items: center;
	position: relative;
	z-index: 1;
	flex: 1;
	flex-direction: column;
	font-family: Ubuntu;
	color: ${theme.colors.text};
`;
