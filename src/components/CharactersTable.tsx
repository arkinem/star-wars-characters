import { FC, useCallback, useEffect, useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import styled from "styled-components";

import { t } from "a11y/dictionary";
import { useCharacters } from "hooks/useCharacters";
import { CharactersTableSortMode } from "constants/table";
import { selectCharacters } from "selectors/characters";
import { theme } from "constants/theme";
import { CharactersTableHeader } from "./CharactersTableHeader";

const CharactersTable: FC = () => {
	const { fetchCharacters, isLoading, isError, characters } = useCharacters();
	const [sortMode, setSortMode] = useState<CharactersTableSortMode | undefined>();
	const sortedCharacters = selectCharacters(characters, sortMode);

	useEffect(() => {
		if (sortMode) {
			setSortMode(undefined);
		}

		fetchCharacters(20);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const renderLoadingIndicator = useCallback(() => {
		return (
			<SkeletonTheme baseColor="#171717" highlightColor="#303030">
				{Array.from(Array(20).keys()).map((_, index) => (
					<TableRow key={index}>
						<TableCell colSpan={4}>
							<Skeleton />
						</TableCell>
					</TableRow>
				))}
			</SkeletonTheme>
		);
	}, []);

	return (
		<Container>
			<Heading>{t("table.heading")}</Heading>
			<Table>
				<CharactersTableHeader
					sortMode={sortMode}
					setSortMode={setSortMode}
					isDataLoading={isLoading}
				/>
				<tbody>
					{isLoading ? (
						renderLoadingIndicator()
					) : isError ? (
						<tr>
							<td colSpan={4}>{t("table.error")}</td>
						</tr>
					) : sortedCharacters.length === 0 ? (
						<tr>
							<td colSpan={4}>{t("table.empty")}</td>
						</tr>
					) : sortedCharacters.length > 0 ? (
						sortedCharacters.map((character, index) => (
							<TableRow key={index}>
								<TableCell>{character.name}</TableCell>
								<TableCell>{character.birthYear}</TableCell>
								<TableCell>{character.homeworld?.name || ""}</TableCell>
								<TableCell>{character.films.length}</TableCell>
							</TableRow>
						))
					) : null}
				</tbody>
			</Table>
		</Container>
	);
};

const Container = styled.div`
	min-width: 280px;
	max-width: 700px;
	width: calc(100% - 80px);
	border: 3px solid ${theme.colors.primaryColor};
	background-color: ${theme.colors.background};
	border-radius: 10px;
	padding: 20px;
	margin: 0 20px;
	margin-bottom: 40px;
	position: relative;
`;

const Heading = styled.h1`
	font-weight: 700;
	font-size: 28px;
	margin-top: 0;
	text-align: center;
`;

const Table = styled.table`
	border-collapse: collapse;
	table-layout: fixed;
	width: 100%;
`;

const TableCell = styled.td`
	padding: 8px;
	text-align: center;
	vertical-align: middle;
`;

const TableRow = styled.tr`
	border: 1px solid ${theme.colors.table.border};
`;

export { CharactersTable };
